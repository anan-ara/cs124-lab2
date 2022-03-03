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
  const [maxID, setMaxID] = useState(100);

  function handleShowCompleted() {
    setShowCompleted(!showCompleted);
  }

  function handleSortPriority() {
    setSortPriority(!sortPriority);
  }

  // function handleShowDropDown() {
  //   setDropDown(true);
  // }

  // function handleHideDropDown() {
  //   setDropDown(false);
  // }

  function handleDropDown() {
    setDropDown(!dropDown);
  }

  function addNewTodo(text) {
    if (text !== "") {
      setMaxID(maxID + 1)
      setData(
        data.concat([{ text: text, priority: 0, checked: false, id: maxID }])
    );
    }
  }


  function handleToggleChecked(id) {
    setData(
      data.map((task) => 
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  }

  function handleChangePriority(id, priority) {
    setData(
      data.map((task) => 
        task.id === id ? { ...task, priority: priority } : task
      )
    );
  }

  function handleDeleteTask(id) {
    setData(
      data.filter(task => 
        task.id !== id
      )
    );
  }

  function handleDeleteCompletedTasks() {
    setData(
      data.filter(task => 
        task.checked === false
      )
    );
  }

  function handleChangeText(id, newText) {
    setData(
      data.map(task => 
        task.id === id ? { ...task, text: newText } : task
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
        onToggleDropdown={handleDropDown}
        onDeleteCompleted={handleDeleteCompletedTasks}
      />
      <Contents
        data={data}
        sortPriority={sortPriority}
        showCompleted={showCompleted}
        onToggleChecked={handleToggleChecked}
        onChangePriority={handleChangePriority}
        onDeleteTask={handleDeleteTask}
        onChangeText={handleChangeText}
      />
      <BottomBar onTextInput={addNewTodo} />
    </>
  );
}

export default App;
