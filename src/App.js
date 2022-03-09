import "./todo.css";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import PriorityPopup from "./PriorityPopup";
import Contents from "./Contents";
import Backdrop from "./Backdrop";
import { useState, useEffect, useRef } from "react";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import { initializeApp } from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  getFirestore,
  query,
  collection,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import {
  initialLowPriorityIcon,
  initialMedPriorityIcon,
  initialHighPriorityIcon,
  lowPriorityOptions,
  medPriorityOptions,
  highPriorityOptions,
} from ".";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3wO0gGMy0PN8SEZckT0xb6cYeB0zvV1M",
  authDomain: "cs124-lab3-e9930.firebaseapp.com",
  projectId: "cs124-lab3-e9930",
  storageBucket: "cs124-lab3-e9930.appspot.com",
  messagingSenderId: "200008037720",
  appId: "1:200008037720:web:52bc13f47bfa43cdd4212d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const collectionName = "tasks";
const collectionRef = collection(db, collectionName);

function App() {
  // const [data, setData] = useState(initialData);
  // Get data
  const q = query(collectionRef);
  const [data, loading, error] = useCollectionData(q);
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortPriority, setSortPriority] = useState(false);
  const [toScroll, setToScroll] = useState(false);

  // end of list used for autoscrolling
  const listEnd = useRef();

  // Priority popup
  const [priorityPopup, setPriorityPopup] = useState(false);
  function handlePriorityPopup() {
    setPriorityPopup(!priorityPopup);
  }

  // Called on every rerender
  useEffect(() => {
    if (toScroll) {
      listEnd.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
      setToScroll(false);
    }
  }, [toScroll]);

  // Priority icons
  const [lowPriorityIcon, setLowPriorityIcon] = useState(
    initialLowPriorityIcon
  );
  const [medPriorityIcon, setMedPriorityIcon] = useState(
    initialMedPriorityIcon
  );
  const [highPriorityIcon, setHighPriorityIcon] = useState(
    initialHighPriorityIcon
  );

  function handleShowCompleted() {
    setShowCompleted(!showCompleted);
  }

  function handleSortPriority() {
    setSortPriority(!sortPriority);
  }

  function addNewTodo(text) {
    const id = generateUniqueID();
    if (text !== "") {
      setDoc(doc(collectionRef, id), {
        text: text,
        priority: 0,
        checked: false,
        id: id,
      });
      setToScroll(true);
    }
  }

  function handleToggleChecked(id) {
    // setData(
    //   data.map((task) =>
    //     task.id === id ? { ...task, checked: !task.checked } : task
    //   )
    // );
  }

  function handleChangePriority(id, priority) {
    // setData(
    //   data.map((task) =>
    //     task.id === id ? { ...task, priority: priority } : task
    //   )
    // );
  }

  function handleDeleteTask(id) {
    // setData(data.filter((task) => task.id !== id));
  }

  function handleDeleteCompletedTasks() {
    // setData(data.filter((task) => task.checked === false));
  }

  function handleChangeText(id, newText) {
    // setData(
    //   data.map((task) => (task.id === id ? { ...task, text: newText } : task))
    // );
  }

  return (
    <>
      <TopBar
        showCompleted={showCompleted}
        sortPriority={sortPriority}
        onShowCompleted={handleShowCompleted}
        onSortPriority={handleSortPriority}
        onDeleteCompleted={handleDeleteCompletedTasks}
        onTogglePriorityPopup={handlePriorityPopup}
      />
      {loading ? (
        <div>Loading</div>
      ) : (
        <Contents
          data={data}
          listEnd={listEnd}
          sortPriority={sortPriority}
          showCompleted={showCompleted}
          onToggleChecked={handleToggleChecked}
          onChangePriority={handleChangePriority}
          onDeleteTask={handleDeleteTask}
          onChangeText={handleChangeText}
          lowPriorityIcon={lowPriorityIcon}
          medPriorityIcon={medPriorityIcon}
          highPriorityIcon={highPriorityIcon}
        />
      )}
      <BottomBar onTextInput={addNewTodo} />
      {priorityPopup ? (
        <>
          <Backdrop onClickBackdrop={handlePriorityPopup} />
          <PriorityPopup
            lowPriorityIcon={lowPriorityIcon}
            medPriorityIcon={medPriorityIcon}
            highPriorityIcon={highPriorityIcon}
            lowPriorityOptions={lowPriorityOptions}
            medPriorityOptions={medPriorityOptions}
            highPriorityOptions={highPriorityOptions}
            onChangeLowPriorityIcon={setLowPriorityIcon}
            onChangeMedPriorityIcon={setMedPriorityIcon}
            onChangeHighPriorityIcon={setHighPriorityIcon}
          />
        </>
      ) : null}
    </>
  );
}

export default App;
