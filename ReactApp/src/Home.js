import "./todo.css";
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";
// import BottomBar from "./BottomBar";
import PriorityPopup from "./PriorityPopup";
import CreateListPopup from "./CreateListPopup";
import HomeContents from "./HomeContents";
import HomeBottomBar from "./HomeBottomBar";
import Backdrop from "./Backdrop";
import { useState, useEffect, useRef } from "react";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import {
  useCollectionData,
  // useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  query,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  // where,
  serverTimestamp,
  collection,
  getDocs,
  // QuerySnapshot,
} from "firebase/firestore";
// import {
//   initialLowPriorityIcon,
//   initialMedPriorityIcon,
//   initialHighPriorityIcon,
//   lowPriorityOptions,
//   medPriorityOptions,
//   highPriorityOptions,
// } from ".";
import {TOP_LEVEL_COLLECTION, USERS_COLLECTION} from "./firestore-config";
import EditTextPopup from "./EditTextPopup";

function Home(props) {
  // const TOP_LEVEL_COLLECTION = "cs124-users/default/lists";
  const collectionRef = collection(props.db, TOP_LEVEL_COLLECTION);
  const metadataRef = collection(props.db, USERS_COLLECTION);

  const [toScroll, setToScroll] = useState(false);

  const [filter, setFilter] = useState("");

  // Priority popup
  const [priorityPopup, setPriorityPopup] = useState(false);
  function handlePriorityPopup() {
    setPriorityPopup(!priorityPopup);
  }

  // Create List Confirmation
  const [createListPopup, setCreateListPopup] = useState(false);
  function handleCreateListPopup() {
    setCreateListPopup(!createListPopup);
  }

  let sortType = "created";

  // Get data from database.
  if (props.appMetadata) {
    sortType = props.appMetadata.sort;
  }

  let orderByParam = orderBy(sortType);
  if (sortType === "priority") {
    orderByParam = orderBy("created");
  }
  let queryParam = query(collectionRef, orderByParam);
  const [data, loading, error] = useCollectionData(queryParam);

  let filteredData = data;
  if (data) {
    filteredData = data.filter((item) => item.text.toLowerCase().includes(filter.toLowerCase()));
  }

  // Needed so that we know when the submenu menu needs to pop up instead of down.
  const bottomBar = useRef();

  function getBottomBarLocation() {
    const rect = bottomBar.current.getBoundingClientRect();
    return rect.top;
  }

  if (error) {
    console.log(error);
  }

  function addNewList(text) {
    const id = generateUniqueID();
    if (text !== "") {
      setDoc(doc(collectionRef, id), {
        text: text,
        id: id,
        created: serverTimestamp(),
        sort: "created",
        complete: 0,
        total: 0,
      }); //.then(() => setToScroll(true));
    }
  }

  function handleSortType(newSortType) {
    console.log("handling sort type");
    updateDoc(doc(metadataRef, "default"), { sort: newSortType });
  }

  //   These handlers need the collectionRef too
  function handleDeleteList(id) {
    deleteDoc(doc(collectionRef, id));

    const subCollectionRef = collection(
      props.db,
      TOP_LEVEL_COLLECTION,
      id,
      "items"
    );
    const q = query(subCollectionRef);
    getDocs(q).then((querySnapshot) =>
      querySnapshot.forEach((listDoc) => {
        deleteDoc(doc(subCollectionRef, listDoc.data().id));
      })
    );
  }

  function handleChangeText(id, newText) {
    props.handleChangeText(id, newText, collectionRef);
    console.log("handleChangeText called, " + newText);
  }

  // end of list used for autoscrolling
  const listEnd = useRef();

  // Called on every rerender where toScroll changes.
  useEffect(() => {
    // Scrolls to recently added item if an item was just added
    if (toScroll) {
      listEnd.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
      setToScroll(false);
    }
  }, [toScroll]);

  return (
    <div id="home-screen">
      <TopBar
        sortType={sortType}
        onChangeSortType={handleSortType}
        // isNarrow={props.isNarrow}
        homeScreen={true}
        title={"My Lists"}
        onTogglePriorityPopup={handlePriorityPopup}
        filter={filter}
        setFilter={setFilter}
        {...props}
      />
      {priorityPopup && (
        <>
          <Backdrop onClickBackdrop={handlePriorityPopup} />
          <PriorityPopup onTogglePriorityPopup={handlePriorityPopup} {...props} />
        </>
      )}

      {props.isNarrow && (
        <div id="search_bar_div">
          <SearchBar filter={filter} setFilter={setFilter} />
        </div>
      )}

      <HomeContents
        data={filteredData}
        unfilteredData={data}
        loading={props.appMetadataLoading || loading}
        listEnd={listEnd}
        onDeleteList={handleDeleteList}
        onChangeText={handleChangeText}
        onSelectList={props.onSelectList}
        homeScreen={props.homeScreen}
        isNarrow={props.isNarrow}
        getBottomBarLocation={getBottomBarLocation}
      />
      <HomeBottomBar
        handleAddList={handleCreateListPopup}
        bottomBarRef={bottomBar}
      />
      {/* <button
        // className={(props.showCompleted ? "activated " : "") + "radio-button"}
        onClick={handleCreateListPopup}
        ref={bottomBar}
      >
        Create New List
      </button> */}
      {createListPopup && (
        <>
          <Backdrop onClickBackdrop={handleCreateListPopup} />
          <CreateListPopup
            onAddList={addNewList}
            onClosePopup={handleCreateListPopup}
          />
        </>
      )}
      {/* {editTextPopup && (
        <>
          <Backdrop onClickBackdrop={handleEditTextPopup} />
          <EditTextPopup
            // onAddList={addNewList}

            onClosePopup={handleEditTextPopup}
          />
        </>
      )} */}
    </div>
  );
}
export default Home;
