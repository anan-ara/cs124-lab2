import "./todo.css";
import TopBar from "./TopBar";
import CompletionBar from "./CompletionBar";
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
  where, 
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

// Ours
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

const collectionName = "anan-cynthia";
const collectionRef = collection(db, collectionName);

function App() {

  // Sorting by text
  const textQuery = query(collectionRef, orderBy("text"));
  const textTuple = useCollectionData(textQuery);

  // Sorting by created
  const createdQuery = query(collectionRef, orderBy("created"));
  const createdTuple = useCollectionData(createdQuery);

  const priorityQuery = query(collectionRef, orderBy("priority", "desc"));
  const priorityTuple = useCollectionData(priorityQuery);

  // Use for deleting all completed items
  const isCheckedQuery = query(collectionRef, where("checked", "==", true));
  const [checkedData, checkedLoading, checkedError] = useCollectionData(isCheckedQuery);

  // Compound index queries for when we hide completed items
  // Sorting by text
  const textIncompleteQuery = query(collectionRef, orderBy("text"), where("checked", "==", false));
  const textIncompleteTuple = useCollectionData(textIncompleteQuery);

  // Sorting by created
  const createdIncompleteQuery = query(collectionRef, orderBy("created"), where("checked", "==", false));
  const createdIncompleteTuple = useCollectionData(createdIncompleteQuery);

  const priorityIncompleteQuery = query(collectionRef, orderBy("priority", "desc"), where("checked", "==", false));
  const priorityIncompleteTuple = useCollectionData(priorityIncompleteQuery);

  const SORT_TYPE_DICT = {
    "created": { "all": createdTuple, "incomplete": createdIncompleteTuple },
    "priority": { "all": priorityTuple, "incomplete": priorityIncompleteTuple },
    "text": { "all": textTuple, "incomplete": textIncompleteTuple },
  };

  const [showCompleted, setShowCompleted] = useState(true);
  const [sortType, setSortType] = useState("created");
  const [toScroll, setToScroll] = useState(false);

  let [data, loading, error] = SORT_TYPE_DICT[sortType][showCompleted ? "all" : "incomplete"];

  if (error) {
    console.log(error);
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
    setShowCompleted(true);
  }

  function handleHideCompleted() {
    setShowCompleted(false);
  }


  function handleSortType(newSortType) {
    setSortType(newSortType)
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
      });
      setToScroll(true);
    }
  }

  function handleToggleChecked(id) {
    // TODO: Ask Prof. Rhodes if it would be faster to use getDoc()
    const isChecked = data.filter((task) => task.id === id)[0]["checked"];
    updateDoc(doc(collectionRef, id), { checked: !isChecked });
  }

  function handleChangePriority(id, priority) {
    updateDoc(doc(collectionRef, id), { priority: priority });
    
  }

  function handleDeleteTask(id) {
    deleteDoc(doc(collectionRef, id));
  }

  function handleDeleteCompletedTasks() {
    // TODO: ask about the filter vs indexes?
    let completedTasks = [];
    if (!checkedLoading && !checkedError) {
      completedTasks = checkedData;
    } else {
      completedTasks = data.filter((task) => task.checked === true);
    }
    completedTasks.forEach((task) => deleteDoc(doc(collectionRef, task.id)));
  }

  function handleChangeText(id, newText) {
    updateDoc(doc(collectionRef, id), { text: newText });
  }

  return (
    <>
      <TopBar
        showCompleted={showCompleted}
        sortType={sortType}
        onShowCompleted={handleShowCompleted}
        onChangeSortType={handleSortType}
        onDeleteCompleted={handleDeleteCompletedTasks}
        onTogglePriorityPopup={handlePriorityPopup}
      />
      <CompletionBar
        showCompleted={showCompleted}
        onShowCompleted={handleShowCompleted}
        onHideCompleted={handleHideCompleted}
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
          lowPriorityIcon={lowPriorityIcon}
          medPriorityIcon={medPriorityIcon}
          highPriorityIcon={highPriorityIcon}
        />
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
