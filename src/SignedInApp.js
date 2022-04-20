import "./todo.css";
import Home from "./Home";
import ListView from "./ListView";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, updateDoc, doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";

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

function SignedInApp() {
  // Screen Width
  const isNarrow = useMediaQuery({ maxWidth: "615px" });
  const isMedium = useMediaQuery({ minWidth: "615px", maxWidth: "900px" });
  const isWide = useMediaQuery({ minWidth: "900px" });

  const [homeScreen, setHomeScreen] = useState(true);

  const [currentList, setCurrentList] = useState("defaultList");

  // Priority icons
  function setLowPriorityIcon(newIcon) {
    updateDoc(doc(metadataRef, "default"), { lowPriorityIcon: newIcon });
  }
  function setMedPriorityIcon(newIcon) {
    updateDoc(doc(metadataRef, "default"), { midPriorityIcon: newIcon });
  }
  function setHighPriorityIcon(newIcon) {
    updateDoc(doc(metadataRef, "default"), { highPriorityIcon: newIcon });
  }

  const metadataRef = collection(db, "users");
  const [metadata, metadataLoading, metadataError] = useDocumentData(
    doc(metadataRef, "default")
  );

  if (metadataError) {
    console.log(metadataError);
  }

  let lowPriorityIcon = "💤";
  let medPriorityIcon = "⚠️";
  let highPriorityIcon = "🔥";
  if (!metadataLoading) {
    lowPriorityIcon = metadata.lowPriorityIcon;
    medPriorityIcon = metadata.midPriorityIcon;
    highPriorityIcon = metadata.highPriorityIcon;
  }

  // So that we can translate from priority number to the icon.
  let priorityToAria = {
    0: "Low Priority",
    1: "Medium Priority",
    2: "High Priority",
  };

  function handleChangeText(id, newText, collectionRef) {
    updateDoc(doc(collectionRef, id), { text: newText });
  }

  function handleShowHome() {
    setHomeScreen(true);
  }

  function handleSelectList(listId) {
    setCurrentList(listId);
    setHomeScreen(false);
  }

  return homeScreen ? (
    <Home
      currentList={currentList}
      db={db}
      isNarrow={isNarrow}
      isMedium={isMedium}
      isWide={isWide}
      onShowHome={handleShowHome}
      handleChangeText={handleChangeText}
      appMetadata={metadata}
      appMetadataLoading={metadataLoading}
      setLowPriorityIcon={setLowPriorityIcon}
      setMedPriorityIcon={setMedPriorityIcon}
      setHighPriorityIcon={setHighPriorityIcon}
      lowPriorityIcon={lowPriorityIcon}
      medPriorityIcon={medPriorityIcon}
      highPriorityIcon={highPriorityIcon}
      priorityToAria={priorityToAria}
      homeScreen={true}
      onSelectList={handleSelectList}
    />
  ) : (
    <ListView
      currentList={currentList}
      db={db}
      isNarrow={isNarrow}
      isMedium={isMedium}
      isWide={isWide}
      onShowHome={handleShowHome}
      handleChangeText={handleChangeText}
      lowPriorityIcon={lowPriorityIcon}
      medPriorityIcon={medPriorityIcon}
      highPriorityIcon={highPriorityIcon}
      homeScreen={false}
      priorityToAria={priorityToAria}
    />
  );
}

export default SignedInApp;
