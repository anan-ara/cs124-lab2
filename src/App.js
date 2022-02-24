import "./todo.css";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import Contents from "./Contents";
import { useState } from "react";
import { initialData } from ".";

function App() {
  const [data, setData] = useState(initialData);
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

  function addNewTodo(name) {
    // TODO: change to not be date.now
    setData(
      data.concat([{ text: name, priority: 0, checked: false, id: Date.now() }])
    );
  }

  function handleToggleChecked(id) {
    setData(
      data.map((task) => 
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
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
      <Contents
        data={data}
        sortPriority={sortPriority}
        showCompleted={showCompleted}
        onToggleChecked={handleToggleChecked}
      />
      <BottomBar onTextInput={addNewTodo} />
    </>
  );
}

export default App;
