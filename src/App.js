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
        onDeleteCompleted={handleDeleteCompletedTasks}
      />
      <Contents
        data={data}
        sortPriority={sortPriority}
        showCompleted={showCompleted}
        onToggleChecked={handleToggleChecked}
        onChangePriority={handleChangePriority}
        onDeleteTask={handleDeleteTask}
      />
      <BottomBar onTextInput={addNewTodo} />
    </>
  );
}

export default App;
