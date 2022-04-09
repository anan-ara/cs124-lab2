import "./todo.css";
import Home from "./Home";
import ListView from "./ListView";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc, deleteDoc, doc } from "firebase/firestore";
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

// const collectionName = //"anan-cynthia/defaultList/items";
// const collectionName = "anan-cynthia";
// const collectionRef = collection(db, collectionName);

function App() {
  // Screen Width
  const isNarrow = useMediaQuery({ maxWidth: "500px" });

  // const [showCompleted, setShowCompleted] = useState(true);
  // const [sortType, setSortType] = useState("created");
  // const [toScroll, setToScroll] = useState(false);
  const [homeScreen, setHomeScreen] = useState(false); // TODO change back

  const [currentList, setCurrentList] = useState("defaultList");

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

  // const [priorityPopup, setPriorityPopup] = useState(false);
  // function handlePriorityPopup() {
  //   setPriorityPopup(!priorityPopup);
  // }

  function handleDelete(id, collectionRef) {
    deleteDoc(doc(collectionRef, id));
  }

  function handleChangeText(id, newText, collectionRef) {
    updateDoc(doc(collectionRef, id), { text: newText });
  }

  function handleShowHome() {
    setHomeScreen(true);
    console.log("going back home");
  }

  return homeScreen ? (
    <Home
      currentList={currentList}
      db={db}
      isNarrow={isNarrow}
      onShowHome={handleShowHome}
      handleDeleteList={handleDelete}
      handleChangeText={handleChangeText}
      lowPriorityIcon={lowPriorityIcon}
      medPriorityIcon={medPriorityIcon}
      highPriorityIcon={highPriorityIcon}
      setLowPriorityIcon={setLowPriorityIcon}
      setMedPriorityIcon={setMedPriorityIcon}
      setHighPriorityIcon={setHighPriorityIcon}
      lowPriorityOptions={lowPriorityOptions}
      medPriorityOptions={medPriorityOptions}
      highPriorityOptions={highPriorityOptions}
      homeScreen={true}
    />
  ) : (
    <ListView
      currentList={currentList}
      db={db}
      isNarrow={isNarrow}
      onShowHome={handleShowHome}
      handleDeleteTask={handleDelete}
      handleChangeText={handleChangeText}
      lowPriorityIcon={lowPriorityIcon}
      medPriorityIcon={medPriorityIcon}
      highPriorityIcon={highPriorityIcon}
      homeScreen={false}
      // setLowPriorityIcon={setLowPriorityIcon}
      // setMedPriorityIcon={setMedPriorityIcon}
      // setHighPriorityIcon={setHighPriorityIcon}
    />
  );
}

export default App;
