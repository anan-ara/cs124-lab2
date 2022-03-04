import "./todo.css";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import PriorityPopup from "./PriorityPopup";
import Contents from "./Contents";
import Backdrop from "./Backdrop";
import { useState, useEffect, useRef} from "react";
import {
  initialData,
  initialLowPriorityIcon,
  initialMedPriorityIcon,
  initialHighPriorityIcon,
  lowPriorityOptions,
  medPriorityOptions,
  highPriorityOptions
} from ".";

function App() {
  const [data, setData] = useState(initialData);
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortPriority, setSortPriority] = useState(false);
  const [maxID, setMaxID] = useState(100);
  const [toScroll, setToScroll] = useState(false);

  // end of list used for autoscrolling
  const listEnd = useRef()

  // Priority popup
  const [priorityPopup, setPriorityPopup] = useState(false);
  function handlePriorityPopup() {
    setPriorityPopup(!priorityPopup);
  }

  // Called on every rerender
  useEffect(() => {
    if (toScroll) {
      listEnd.current.scrollIntoView({ behavior : "smooth", block: "end", inline: "nearest" });
      setToScroll(false)
    }
  }, [toScroll]);

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

  function handleShowCompleted() {
    setShowCompleted(!showCompleted);
  }

  function handleSortPriority() {
    setSortPriority(!sortPriority);
  }

  function addNewTodo(text) {
    if (text !== "") {
      setMaxID(maxID + 1);
      setData(
        data.concat([{ text: text, priority: 0, checked: false, id: maxID }])
      );
      setToScroll(true)
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
    setData(data.filter((task) => task.id !== id));
  }

  function handleDeleteCompletedTasks() {
    setData(data.filter((task) => task.checked === false));
  }

  function handleChangeText(id, newText) {
    setData(
      data.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  }

  return (
    <>
      <TopBar
        showCompleted={showCompleted}
        sortPriority={sortPriority}
        onShowCompleted={handleShowCompleted}
        onSortPriority={handleSortPriority}
        onDeleteCompleted={handleDeleteCompletedTasks}
        onTogglePriorityPopup={handlePriorityPopup}
      />
      <Contents
        data={data}
        listEnd={listEnd}
        sortPriority={sortPriority}
        showCompleted={showCompleted}
        onToggleChecked={handleToggleChecked}
        onChangePriority={handleChangePriority}
        onDeleteTask={handleDeleteTask}
        onChangeText={handleChangeText}
        lowPriorityIcon={lowPriorityIcon}
        medPriorityIcon={medPriorityIcon}
        highPriorityIcon={highPriorityIcon}
      />
      <BottomBar onTextInput={addNewTodo} />
      {priorityPopup ? (
        <>
          <Backdrop onClickBackdrop={handlePriorityPopup}/>
          <PriorityPopup
            lowPriorityIcon={lowPriorityIcon}
            medPriorityIcon={medPriorityIcon}
            highPriorityIcon={highPriorityIcon}
            lowPriorityOptions={lowPriorityOptions}
            medPriorityOptions={medPriorityOptions}
            highPriorityOptions={highPriorityOptions}
            onChangeLowPriorityIcon={setLowPriorityIcon}
            onChangeMedPriorityIcon={setMedPriorityIcon}
            onChangeHighPriorityIcon={setHighPriorityIcon}
          />
        </>
      ) : null}
    </>
  );
}

export default App;
