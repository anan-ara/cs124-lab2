import "./todo.css";
import Home from "./Home";
import ListView from "./ListView";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, updateDoc, doc, query, where } from "firebase/firestore";
import { useDocumentData, useCollectionData } from "react-firebase-hooks/firestore";
import Verification from "./Verification";

// // Ours
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyA3wO0gGMy0PN8SEZckT0xb6cYeB0zvV1M",
//   authDomain: "cs124-lab3-e9930.firebaseapp.com",
//   projectId: "cs124-lab3-e9930",
//   storageBucket: "cs124-lab3-e9930.appspot.com",
//   messagingSenderId: "200008037720",
//   appId: "1:200008037720:web:52bc13f47bfa43cdd4212d",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

function SignedInApp(props) {

  console.log("showing signed in app");
  // Screen Width
  const isNarrow = useMediaQuery({ maxWidth: "615px" });
  const isMedium = useMediaQuery({ minWidth: "615px", maxWidth: "900px" });
  const isWide = useMediaQuery({ minWidth: "900px" });

  const [homeScreen, setHomeScreen] = useState(true);

  const [currentList, setCurrentList] = useState("defaultList");

  // Priority icons
  function setLowPriorityIcon(newIcon) {
    updateDoc(doc(usersCollection, props.user.uid), { lowPriorityIcon: newIcon });
  }
  function setMedPriorityIcon(newIcon) {
    updateDoc(doc(usersCollection, props.user.uid), { medPriorityIcon: newIcon });
  }
  function setHighPriorityIcon(newIcon) {
    updateDoc(doc(usersCollection, props.user.uid), { highPriorityIcon: newIcon });
  }

  const usersCollection = collection(props.db, "users");
  // const [usersData, usersLoading, usersError] = //useCollectionData(query(usersCollection, where("uid", "==", props.user.uid)));
    // query(usersCollection, where("uid", "==", props.user.uid));

  const [usersData, usersLoading, usersError] = useDocumentData(
    doc(usersCollection, props.user.uid)
  );

  // TODO: right now this is throwing an error when we are on verification screen because we try to access the user and can't because it's still being verified. 
  if (usersError) {
    console.error(usersError);
  }

  console.log("props.user.uid is " + props.user.uid);

  let lowPriorityIcon = "💤";
  let medPriorityIcon = "⚠️";
  let highPriorityIcon = "🔥";
  if (usersData) {//!usersLoading && !usersError) {
    lowPriorityIcon = usersData.lowPriorityIcon;
    medPriorityIcon = usersData.medPriorityIcon;
    highPriorityIcon = usersData.highPriorityIcon;
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

  console.log("email verified is "  + props.user.emailVerified);

  function handleSelectList(listId) {
    setCurrentList(listId);
    setHomeScreen(false);
  }

  console.log("signed in app is being rerendered");

  return props.user.emailVerified
   ?
  (homeScreen ? (
    <Home
      currentList={currentList}
      db={props.db}
      isNarrow={isNarrow}
      isMedium={isMedium}
      isWide={isWide}
      onShowHome={handleShowHome}
      handleChangeText={handleChangeText}
      usersData={usersData}
      usersLoading={usersLoading}
      usersError={usersError}
      setLowPriorityIcon={setLowPriorityIcon}
      setMedPriorityIcon={setMedPriorityIcon}
      setHighPriorityIcon={setHighPriorityIcon}
      lowPriorityIcon={lowPriorityIcon}
      medPriorityIcon={medPriorityIcon}
      highPriorityIcon={highPriorityIcon}
      priorityToAria={priorityToAria}
      homeScreen={true}
      onSelectList={handleSelectList}
      {...props}
    />
  ) : 
    <ListView
      currentList={currentList}
      db={props.db}
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
      {...props}
    />
    
  ): <Verification {...props}/>;
}

export default SignedInApp;
