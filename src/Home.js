import "./todo.css";
import TopBar from "./TopBar";
import SubBar from "./SubBar";
import BottomBar from "./BottomBar";
import PriorityPopup from "./PriorityPopup";
import HomeContents from "./HomeContents";
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
import {
  initialLowPriorityIcon,
  initialMedPriorityIcon,
  initialHighPriorityIcon,
  lowPriorityOptions,
  medPriorityOptions,
  highPriorityOptions,
} from ".";

function Home(props) {
  const collectionRef = collection(
    props.db,
    "anan-cynthia"
  );

  const [sortType, setSortType] = useState("created");
  const [toScroll, setToScroll] = useState(false);

  // Priority popup
  const [priorityPopup, setPriorityPopup] = useState(false);
  function handlePriorityPopup() {
    setPriorityPopup(!priorityPopup);
  }

  // Get data from database.
  let orderByParam = orderBy(sortType);
//   if (sortType == "priority") {
//     orderByParam = orderBy("priority", "desc");
//   }
  let queryParam = query(collectionRef, orderByParam);
//   if (!showCompleted) {
//     queryParam = query(
//       collectionRef,
//       orderByParam,
//       where("checked", "==", false)
//     );
//   }
  let [data, loading, error] = useCollectionData(queryParam);
  console.log(data)

  if (error) {
    console.log(error);
  }

  function addNewList(text) {
    const id = generateUniqueID();
    if (text !== "") {
      setDoc(doc(collectionRef, id), {
        text: text,
        id: id,
        created: serverTimestamp(),
        sort: "created"
      })//.then(() => setToScroll(true));
    }
  }

  function handleSortType(newSortType) {
    setSortType(newSortType);
  }

  //   These handlers need the collectionRef too
  function handleDeleteList(id) {
      console.log("not done yet. We need to delete the subcollection data, ask for confirmation, etc.")
    // props.handleDeleteList(id, collectionRef);
    // TODO: Delete the subcollection and delete metadata for associated list
  }

  function handleChangeText(id, newText) {
    props.handleChangeText(id, newText, collectionRef);
  }

  // end of list used for autoscrolling
  const listEnd = useRef();

  // Called on every rerender where toScroll changes.
//   useEffect(() => {
//     // Scrolls to recently added item if an item was just added
//     if (toScroll) {
//       listEnd.current.scrollIntoView({
//         behavior: "smooth",
//         block: "end",
//         inline: "nearest",
//       });
//       setToScroll(false);
//     }
//   }, [toScroll]);

  return (
    <div id="home-screen">
      <TopBar
        sortType={sortType}
        onChangeSortType={handleSortType}
        isNarrow={props.isNarrow}
        homeScreen={true}
        title={"My Lists"}
        onTogglePriorityPopup={handlePriorityPopup}
      />
      <HomeContents
        data={data}
        loading={loading}
        listEnd={listEnd}
        onDeleteList={handleDeleteList}
        onChangeText={handleChangeText}
        onSelectList={props.onSelectList}
        homeScreen={props.homeScreen}
      />
      <BottomBar onTextInput={addNewList}/>
      {priorityPopup ? (
        <>
          <Backdrop onClickBackdrop={handlePriorityPopup} />
          <PriorityPopup
            // lowPriorityIcon={lowPriorityIcon}
            // medPriorityIcon={medPriorityIcon}
            // highPriorityIcon={highPriorityIcon}
            // lowPriorityOptions={lowPriorityOptions}
            // medPriorityOptions={medPriorityOptions}
            // highPriorityOptions={highPriorityOptions}
            // onChangeLowPriorityIcon={setLowPriorityIcon}
            // onChangeMedPriorityIcon={setMedPriorityIcon}
            // onChangeHighPriorityIcon={setHighPriorityIcon}
            {...props}
          />
        </>
      ) : null}
      
      
    </div>
  );
}
export default Home;
