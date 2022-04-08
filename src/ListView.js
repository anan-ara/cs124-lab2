import "./todo.css";
import TopBar from "./TopBar";
import SubBar from "./SubBar";
import BottomBar from "./BottomBar";
import PriorityPopup from "./PriorityPopup";
import Contents from "./Contents";
import Backdrop from "./Backdrop";
import { useState, useEffect, useRef } from "react";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import { useCollectionData } from "react-firebase-hooks/firestore";
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
// import {
//   initialLowPriorityIcon,
//   initialMedPriorityIcon,
//   initialHighPriorityIcon,
//   lowPriorityOptions,
//   medPriorityOptions,
//   highPriorityOptions,
// } from ".";

function ListView(props) {
  const collectionRef = collection(
    props.db,
    "anan-cynthia",
    props.currentList,
    "items"
  );

  const [sortType, setSortType] = useState("created");
  const [toScroll, setToScroll] = useState(false);

  const [showCompleted, setShowCompleted] = useState(true);

  // Use for deleting all completed items
  const isCheckedQuery = query(collectionRef, where("checked", "==", true));
  const [checkedData, checkedLoading, checkedError] =
    useCollectionData(isCheckedQuery);

  // Get data from database.
  let orderByParam = orderBy(sortType);
  if (sortType == "priority") {
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
  let [data, loading, error] = useCollectionData(queryParam);

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
    completedTasks.forEach((task) => deleteDoc(doc(collectionRef, task.id)));
  }

  function handleToggleChecked(id) {
    const isChecked = data.filter((task) => task.id === id)[0]["checked"];
    updateDoc(doc(collectionRef, id), { checked: !isChecked });
  }

  function handleChangePriority(id, priority) {
    updateDoc(doc(collectionRef, id), { priority: priority });
  }

  function addNewTodo(text) {
    const id = generateUniqueID();
    if (text !== "") {
      setDoc(doc(collectionRef, id), {
        text: text,
        priority: 0,
        checked: false,
        id: id,
        created: serverTimestamp(),
      }).then(() => setToScroll(true));
    }
  }

  // // Priority icons
  // const [lowPriorityIcon, setLowPriorityIcon] = useState(
  //   initialLowPriorityIcon
  // );
  // const [medPriorityIcon, setMedPriorityIcon] = useState(
  //   initialMedPriorityIcon
  // );
  // const [highPriorityIcon, setHighPriorityIcon] = useState(
  //   initialHighPriorityIcon
  // );
  //    TODO: move to db

  function handleShowCompleted() {
    setShowCompleted(true);
  }

  function handleHideCompleted() {
    setShowCompleted(false);
  }

  function handleSortType(newSortType) {
    setSortType(newSortType);
  }

  //   These handlers need the collectionRef too
  function handleDeleteTask(id) {
    props.handleDeleteTask(id, collectionRef);
  }

  function handleChangeText(id, newText) {
    props.handleChangeText(id, newText, collectionRef);
  }

  // end of list used for autoscrolling
  const listEnd = useRef();

  // Priority popup
  const [priorityPopup, setPriorityPopup] = useState(false);
  function handlePriorityPopup() {
    setPriorityPopup(!priorityPopup);
  }

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
        onShowCompleted={handleShowCompleted}
        onChangeSortType={handleSortType}
        onDeleteCompleted={handleDeleteCompletedTasks}
        onTogglePriorityPopup={handlePriorityPopup}
        isNarrow={props.isNarrow}
        onShowHome={props.onShowHome}
        homeScreen={false}
        title={"Placeholder list name"}
      />
      <SubBar
        showCompleted={showCompleted}
        onShowCompleted={handleShowCompleted}
        onHideCompleted={handleHideCompleted}
        onChangeSortType={handleSortType}
        isNarrow={props.isNarrow}
      />
      <Contents
        data={data}
        loading={loading}
        listEnd={listEnd}
        sortPriority={sortType}
        showCompleted={showCompleted}
        onToggleChecked={handleToggleChecked}
        onChangePriority={handleChangePriority}
        onDeleteTask={handleDeleteTask}
        onChangeText={handleChangeText}
        {...props}
        // lowPriorityIcon={lowPriorityIcon}
        // medPriorityIcon={medPriorityIcon}
        // highPriorityIcon={highPriorityIcon}
      />
      <BottomBar onTextInput={addNewTodo} />
      {/* {priorityPopup ? (
        <>
          <Backdrop onClickBackdrop={handlePriorityPopup} />
          <PriorityPopup
            // lowPriorityIcon={lowPriorityIcon}
            // medPriorityIcon={medPriorityIcon}
            // highPriorityIcon={highPriorityIcon}
            lowPriorityOptions={lowPriorityOptions}
            medPriorityOptions={medPriorityOptions}
            highPriorityOptions={highPriorityOptions}
            // onChangeLowPriorityIcon={setLowPriorityIcon}
            // onChangeMedPriorityIcon={setMedPriorityIcon}
            // onChangeHighPriorityIcon={setHighPriorityIcon}
            {...props}
          />
        </>
      ) : null} */}
    </>
  );
}
export default ListView;
