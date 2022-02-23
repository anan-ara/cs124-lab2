import "./todo.css";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import Contents from "./Contents";
import { useState } from "react";

function App() {
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortPriority, setSortPriority] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  function handleShowCompleted() {
    setShowCompleted(!showCompleted);
  }

  function handleSortPriority() {
    setSortPriority(!sortPriority);
  }

  function handleShowDropDown() {
    setDropDown(true);
  }

  function handleHideDropDown() {
    setDropDown(false);
  }

  return (
    <>
      <TopBar
        showCompleted={showCompleted}
        sortPriority={sortPriority}
        dropDown={dropDown}
        onShowCompleted={handleShowCompleted}
        onSortPriority={handleSortPriority}
        onShowDropDown={handleShowDropDown}
        onHideDropDown={handleHideDropDown}
      />
      <Contents />
      <BottomBar />
    </>
  );
}

export default App;
