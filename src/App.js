import "./todo.css";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import Contents from "./Contents";
import { useState } from "react";

function App() {
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortPriority, setSortPriority] = useState(false);

  function handleShowCompleted() {
    setShowCompleted(!showCompleted);
  }

  function handleSortPriority() {
    setSortPriority(!sortPriority);
  }

  return (
    <>
      <TopBar
        showCompleted={showCompleted}
        sortPriority={sortPriority}
        onShowCompleted={handleShowCompleted}
        onSortPriority={handleSortPriority}
      />
      <Contents />
      <BottomBar />
    </>
  );
}

export default App;
