import "./todo.css";
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";
import PriorityPopup from "./PriorityPopup";
import CreateListPopup from "./CreateListPopup";
import HomeContents from "./HomeContents";
import HomeBottomBar from "./HomeBottomBar";
import Backdrop from "./Backdrop";
import { useState, useEffect, useRef } from "react";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import {
  useCollectionData,
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

import LIST_COLLECTION from "./firestore-config";
import HiddenListsPopup from "./HiddenListsPopup";

function Home(props) {
  const collectionRef = collection(props.db, LIST_COLLECTION);
  const usersRef = collection(props.db, "users");

  const [toScroll, setToScroll] = useState(false);

  const [filter, setFilter] = useState("");

  // Priority popup
  const [priorityPopup, setPriorityPopup] = useState(false);
  function handlePriorityPopup() {
    setPriorityPopup(!priorityPopup);
  }

  // Hidden lists popup
  const [hiddenListsPopup, setHiddenListsPopup] = useState(false);
  function handleHiddenListsPopup() {
    setHiddenListsPopup(!hiddenListsPopup);
  }

  // Create List Confirmation
  const [createListPopup, setCreateListPopup] = useState(false);
  function handleCreateListPopup() {
    setCreateListPopup(!createListPopup);
  }

  let sortType = "created";

  // Get data from database.
  if (!props.usersLoading && !props.usersError) {
    sortType = props.usersData.sort;
  }

  let orderByParam = orderBy(sortType);
  orderByParam = orderBy("created"); 
  let myQueryParam = query(
    collectionRef,
    orderByParam,
    where("owner", "==", props.user.email)
  );

  let editorQueryParam = query(
    collectionRef,
    orderByParam,
    where("editors", "array-contains", props.user.email)
  );

  const [ownerData, ownerLoading, ownerError] = useCollectionData(myQueryParam);
  const [editorData, editorLoading, editorError] =
    useCollectionData(editorQueryParam);

  // Search bar functionality
  let ownerFilteredData = ownerData;
  let editorFilteredData = editorData;
  if (!ownerLoading && !editorLoading) {
    ownerFilteredData = ownerData.filter((item) =>
      item.text.toLowerCase().includes(filter.toLowerCase())
    );
    editorFilteredData = editorData.filter((item) =>
      item.text.toLowerCase().includes(filter.toLowerCase())
    );
  }

  // Needed so that we know when the submenu menu needs to pop up instead of down.
  const bottomBar = useRef();

  function getBottomBarLocation() {
    const rect = bottomBar.current.getBoundingClientRect();
    return rect.top;
  }

  if (ownerError) {
    console.error(ownerError);
  }

  if (editorError) {
    console.error(editorError);
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
        admins: [],
      }); //.then(() => setToScroll(true));
    }
  }

  function handleSortType(newSortType) {
    updateDoc(doc(usersRef, props.user.uid), { sort: newSortType });
  }

  function addHiddenListId(listId) {
    updateDoc(doc(usersRef, props.user.uid), {
      hiddenLists: props.usersData.hiddenLists.concat([listId]),
    });
    // currentEditors.concat(newEditorsList);
  }

  function removeHiddenListId(listId) {
    updateDoc(doc(usersRef, props.user.uid), {
      hiddenLists: props.usersData.hiddenLists.filter((id) => id !== listId),
    });
    // currentEditors.concat(newEditorsList);
  }

  //   These handlers need the collectionRef too
  function handleDeleteList(id) {
    deleteDoc(doc(collectionRef, id));

    const subCollectionRef = collection(props.db, LIST_COLLECTION, id, "items");
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
    const owner = ownerData.filter((list) => list.id === id)[0]["owner"];
    const newEditorsList = newEditors.map(object => object["value"]);
    const allEditors = currentEditors.concat(newEditorsList);
    const deduplicateAllEditors = allEditors.filter((item, pos) => (allEditors.indexOf(item) === pos) && item !== owner);
    updateDoc(doc(collectionRef, id), { editors: deduplicateAllEditors });
  }

  function handleRemoveEditor(id, removeEditor) {
    const currentEditors = ownerData.filter((list) => list.id === id)[0][
      "editors"
    ];
    const removedEditors = currentEditors.filter(
      (editor) => editor !== removeEditor
    );
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
        onToggleHiddenListsPopup={handleHiddenListsPopup}
        filter={filter}
        setFilter={setFilter}
        {...props}
      />
      {priorityPopup && (
        <>
          <Backdrop onClickBackdrop={handlePriorityPopup} />
          <PriorityPopup
            onTogglePriorityPopup={handlePriorityPopup}
            {...props}
          />
        </>
      )}

      {hiddenListsPopup && (
        <>
          <Backdrop onClickBackdrop={handleHiddenListsPopup} />
          <HiddenListsPopup
            onToggleHiddenListsPopup={handleHiddenListsPopup}
            editorData={editorData}
            onRemoveHiddenListId={removeHiddenListId}
            {...props}
          />
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
        onAddHiddenListId={addHiddenListId}
        {...props}
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
