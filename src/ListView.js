import "./todo.css";
import TopBar from "./TopBar";
import SubBar from "./SubBar";
import BottomBar from "./BottomBar";
import SearchBar from "./SearchBar";
// import PriorityPopup from "./PriorityPopup";
import DeleteCompletedPopup from "./DeleteCompletedPopup";
import ListContents from "./ListContents";
import Backdrop from "./Backdrop";
import { useState, useEffect, useRef } from "react";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import {
  useCollectionData,
  useDocumentData,
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
} from "firebase/firestore";
import TOP_LEVEL_COLLECTION from "./firestore-config.js";

function ListView(props) {
  const collectionRef = collection(
    props.db,
    TOP_LEVEL_COLLECTION,
    props.currentList,
    "items"
  );

  //   const [sortType, setSortType] = useState("created");
  const [toScroll, setToScroll] = useState(false);

  const [showCompleted, setShowCompleted] = useState(true);

  const [deleteCompletedPopup, setDeleteCompletedPopup] = useState(false);
  function handleDeleteCompletedPopup() {
    setDeleteCompletedPopup(!deleteCompletedPopup);
  }

  // Use for deleting all completed items
  const isCheckedQuery = query(collectionRef, where("checked", "==", true));
  const [checkedData, checkedLoading, checkedError] =
    useCollectionData(isCheckedQuery);

  const metadataRef = collection(props.db, TOP_LEVEL_COLLECTION);
  const [metadata, metadataLoading, metadataError] = useDocumentData(
    doc(metadataRef, props.currentList)
  );

  const bottomBar = useRef();
  function getBottomBarLocation() {
    const rect = bottomBar.current.getBoundingClientRect();
    return rect.top;
  }

  const [filter, setFilter] = useState("");

  if (metadataError) {
    console.log(metadataError);
    // TODO: actual error message?
  }

  let sortType = "created";
  let title = "Loading...";
  // Get data from database.
  if (!metadataLoading) {
    sortType = metadata.sort;
    title = metadata.text;
  }

  let orderByParam = orderBy(sortType);
  if (sortType === "priority") {
    orderByParam = orderBy("priority", "desc");
  }
  let queryParam = query(collectionRef, orderByParam);
  if (!showCompleted) {
    queryParam = query(
      collectionRef,
      orderByParam,
      where("checked", "==", false)
    );
  }
  const [data, loading, error] = useCollectionData(queryParam);

  let filteredData = data;
  if (!loading) {
    filteredData = data.filter((item) => item.text.toLowerCase().includes(filter.toLowerCase()));
  }

  if (error) {
    console.log(error);
  }

  function handleDeleteCompletedTasks() {
    let completedTasks = [];
    // TODO: ask about whether or not we should have this thru database or not
    if (!checkedLoading && !checkedError) {
      completedTasks = checkedData;
    } else {
      completedTasks = data.filter((task) => task.checked === true);
    }
    let deleteCounter = 0;
    completedTasks.forEach((task) => {
      deleteDoc(doc(collectionRef, task.id));
      deleteCounter = deleteCounter + 1;
    });
    updateDoc(doc(metadataRef, props.currentList), {
      total: metadata.total - deleteCounter,
      complete: metadata.complete - deleteCounter,
    });
  }

  function handleToggleChecked(id) {
    const isChecked = data.filter((task) => task.id === id)[0]["checked"];
    updateDoc(doc(collectionRef, id), { checked: !isChecked });
    updateDoc(doc(metadataRef, props.currentList), {
      complete: isChecked ? metadata.complete - 1 : metadata.complete + 1,
    });
  }

  function handleChangePriority(id, priority) {
    updateDoc(doc(collectionRef, id), { priority: priority });
  }

  function addNewTodo(text) {
    const id = generateUniqueID();
    if (text !== "") {
      updateDoc(doc(metadataRef, props.currentList), {
        total: metadata.total + 1,
      });
      setDoc(doc(collectionRef, id), {
        text: text,
        priority: 0,
        checked: false,
        id: id,
        created: serverTimestamp(),
      }).then(() => setToScroll(true));
    }
  }

  function handleToggleCompleted() {
    setShowCompleted(!showCompleted);
  }

  // function handleShowCompleted() {
  //   setShowCompleted(true);
  // }

  // function handleHideCompleted() {
  //   setShowCompleted(false);
  // }

  function handleSortType(newSortType) {
    updateDoc(doc(metadataRef, props.currentList), { sort: newSortType });
  }

  //   These handlers need the collectionRef too
  function handleDeleteTask(id) {
    const isChecked = data.filter((task) => task.id === id)[0]["checked"];
    updateDoc(doc(metadataRef, props.currentList), {
      total: metadata.total - 1,
      complete: isChecked ? metadata.complete - 1 : metadata.complete,
    });
    deleteDoc(doc(collectionRef, id));
  }

  function handleChangeText(id, newText) {
    props.handleChangeText(id, newText, collectionRef);
  }

  // end of list used for autoscrolling
  const listEnd = useRef();

  // // Priority popup
  // const [priorityPopup, setPriorityPopup] = useState(false);
  // function handlePriorityPopup() {
  //   setPriorityPopup(!priorityPopup);
  // }

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
    <>
      <TopBar
        showCompleted={showCompleted}
        sortType={sortType}
        // onShowCompleted={handleShowCompleted}
        onChangeSortType={handleSortType}
        onDeleteCompleted={handleDeleteCompletedPopup}
        // onTogglePriorityPopup={handlePriorityPopup}
        isNarrow={props.isNarrow}
        onShowHome={props.onShowHome}
        homeScreen={false}
        title={title}
        filter={filter}
      setFilter={setFilter}
      />
      <SubBar
        showCompleted={showCompleted}
        onToggleCompleted={handleToggleCompleted}
        onChangeSortType={handleSortType}
        isNarrow={props.isNarrow}
        isWide={props.isWide}
        filter={filter}
        setFilter={setFilter}
      />

      {props.isNarrow && <div id="search_bar_div"><SearchBar
      filter={filter}
      setFilter={setFilter}
      /></div>}

      <ListContents
        data={filteredData}
        unfilteredData={data}
        loading={metadataLoading || loading}
        listEnd={listEnd}
        sortPriority={sortType}
        showCompleted={showCompleted}
        onToggleChecked={handleToggleChecked}
        onChangePriority={handleChangePriority}
        onDeleteTask={handleDeleteTask}
        onChangeText={handleChangeText}
        getBottomBarLocation={getBottomBarLocation}
        filter={filter}
        {...props}
        // lowPriorityIcon={lowPriorityIcon}
        // medPriorityIcon={medPriorityIcon}
        // highPriorityIcon={highPriorityIcon}
      />
      <BottomBar onTextInput={addNewTodo} bottomBarRef={bottomBar} />
      {deleteCompletedPopup && (
        <>
          <Backdrop onClickBackdrop={handleDeleteCompletedPopup} />
          <DeleteCompletedPopup
            onDelete={handleDeleteCompletedTasks}
            onClosePopup={handleDeleteCompletedPopup}
            showCompleted={showCompleted}
            filter={filter}
          />
        </>
      )}
    </>
  );
}
export default ListView;
