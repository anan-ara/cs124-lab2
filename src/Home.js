import "./todo.css";
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";
// import BottomBar from "./BottomBar";
import PriorityPopup from "./PriorityPopup";
import CreateListPopup from "./CreateListPopup";
import HomeContents from "./HomeContents";
import HomeBottomBar from "./HomeBottomBar";
import Backdrop from "./Backdrop";
import { useState, useEffect, useRef, useId } from "react";
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
  where,
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
import LIST_COLLECTION from "./firestore-config";

function Home(props) {
  // const LIST_COLLECTION = "cs124-users/default/lists";
  const collectionRef = collection(props.db, LIST_COLLECTION);
  const usersRef = collection(props.db, "users");

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
  console.log("Home view rerendering");

  // Get data from database.
  if (!props.usersLoading && !props.usersError) {
    console.log("props.usersData.sort is " + props.usersData.sort);
    sortType = props.usersData.sort;
  }

  let orderByParam = orderBy(sortType);
  orderByParam = orderBy("created"); // TODO NOW: change back only like this bc of firebase indices not being made yet!!
  // let queryParam = query(collectionRef, orderByParam, where("owner", "==", props.user.email));
  let myQueryParam = query(collectionRef, orderByParam, where("owner", "==", props.user.email));

  // TODO: use this for shared things
  let editorQueryParam = query(collectionRef, orderByParam, where("editors", "array-contains", props.user.email));

  const [ownerData, ownerLoading, ownerError] = useCollectionData(myQueryParam);
  const [editorData, editorLoading, editorError] = useCollectionData(editorQueryParam);

  // Search bar functionality
  let ownerFilteredData = ownerData;
  let editorFilteredData = editorData;
  if (!ownerLoading && !editorLoading) {
    ownerFilteredData = ownerData.filter((item) => item.text.toLowerCase().includes(filter.toLowerCase()));
    editorFilteredData = editorData.filter((item) => item.text.toLowerCase().includes(filter.toLowerCase()));
  }

  // Needed so that we know when the submenu menu needs to pop up instead of down.
  const bottomBar = useRef();

  function getBottomBarLocation() {
    const rect = bottomBar.current.getBoundingClientRect();
    return rect.top;
  }

  if (ownerError) {
    console.log(ownerError);
  }

  if (editorError) {
    console.log(editorError);
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
        owner: props.user.email, 
        viewers: [], 
        editors: [],
        admins: []
      }); //.then(() => setToScroll(true));
    }
  }

  function handleSortType(newSortType) {
    updateDoc(doc(usersRef, props.user.uid), { sort: newSortType });
  }

  //   These handlers need the collectionRef too
  function handleDeleteList(id) {
    deleteDoc(doc(collectionRef, id));

    const subCollectionRef = collection(
      props.db,
      LIST_COLLECTION,
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
  }

  function handleAddEditors(id, newEditors) {
    const currentEditors = ownerData.filter((list) => list.id === id)[0]["editors"];
    const newEditorsList = newEditors.map(object => object["value"]);
    const allEditors = currentEditors.concat(newEditorsList);
    const deduplicateAllEditors = allEditors.filter((item, pos) => allEditors.indexOf(item) === pos);
    updateDoc(doc(collectionRef, id), { editors: deduplicateAllEditors });
  }

  function handleRemoveEditor(id, removeEditor) {
    const currentEditors = ownerData.filter((list) => list.id === id)[0]["editors"];
    const removedEditors = currentEditors.filter((editor) => editor !== removeEditor)
    updateDoc(doc(collectionRef, id), { editors: removedEditors });
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
        ownerData={ownerFilteredData}
        ownerUnfilteredData={ownerData}
        editorData={editorFilteredData}
        editorUnfilteredData={editorData}
        loading={props.appMetadataLoading || ownerLoading || editorLoading}
        listEnd={listEnd}
        onDeleteList={handleDeleteList}
        onChangeText={handleChangeText}
        onSelectList={props.onSelectList}
        homeScreen={props.homeScreen}
        isNarrow={props.isNarrow}
        getBottomBarLocation={getBottomBarLocation}
        onAddEditors={handleAddEditors}
        onRemoveEditor={handleRemoveEditor}
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
            {...props}
          />
        </>
      )}
    </div>
  );
}
export default Home;
