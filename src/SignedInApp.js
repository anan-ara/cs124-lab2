import "./todo.css";
import Home from "./Home";
import ListView from "./ListView";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { collection, updateDoc, doc, query, where, setDoc} from "firebase/firestore";
import {  useCollectionData } from "react-firebase-hooks/firestore";


function SignedInApp(props) {



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
  const [usersDataArray, usersLoading, usersError] = useCollectionData(query(usersCollection, where("uid", "==", props.user.uid)));

  let usersData;
  if (usersDataArray && usersDataArray.length > 0) {
    usersData = usersDataArray[0];
  }


  let lowPriorityIcon = "💤";
  let medPriorityIcon = "⚠️";
  let highPriorityIcon = "🔥";

  // useDocumentData does not update when the document is set (when the document does not yet exist)
  // Is this a problem on the firestore side or is it documented behavior?
  // We switched to useCollectionData instead for this reason
  if (usersDataArray && usersDataArray.length === 0) {
    setDoc(doc(usersCollection, props.user.uid), {
            uid: props.user.uid,
            highPriorityIcon: highPriorityIcon,
            lowPriorityIcon: lowPriorityIcon,
            medPriorityIcon: medPriorityIcon,
            sort: "created",
            email: props.user.email,
            hiddenLists: []
          }).catch(error => console.error(error));
    return <div>Loading...</div>;
  }


  if (usersData) {
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

  function handleSelectList(listId) {
    setCurrentList(listId);
    setHomeScreen(false);
  }

  return  homeScreen ?
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
    /> : 
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
    />;
}

export default SignedInApp;
