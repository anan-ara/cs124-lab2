import "./TaskItem.css";
import "./Item.css";
import SubMenu from "./SubMenu";
import Backdrop from "./Backdrop";
import SubMenuToggle from "./SubMenuToggle";
import { useEffect, useState, useRef } from "react";
import EditTextPopup from "./EditTextPopup";

function TaskItem(props) {
  const [dropDown, setDropDown] = useState(false);
  const [editable, setEditable] = useState(false);
  const [editTaskTextPopup, setEditTaskTextPopup] = useState(false);

  // Local text field before it is saved in database
  // const [text, setText] = useState(props.text);

  // reference to textArea
  const textArea = useRef();

  // So that we can translate from priority number to the icon.
  let priorityToIcon = {
    0: props.lowPriorityIcon,
    1: props.medPriorityIcon,
    2: props.highPriorityIcon,
  };

  // reference to subMenuToggle button
  const subMenuToggle = useRef();

  function handleDropDown() {
    props.onToggleScroll();
    setDropDown(!dropDown);
  }

  function handleEditTaskTextPopup() {
    setEditTaskTextPopup(!editTaskTextPopup);
  }

  // function handleStartRename() {
  //   setEditable(true);
  //   textArea.current.selectionStart = textArea.current.value.length;
  //   textArea.current.selectionEnd = textArea.current.value.length;
  //   textArea.current.focus();
  // }

  // function handleFinishRename() {
  //   if (text === "") {
  //     props.onDeleteTask(props.id);
  //   } else {
  //     setEditable(false);
  //     props.onChangeText(props.id, text);
  //   }
  // }


  function handleRename(newText) {
    //  add actual entering function here
    if (newText === "") {
      props.onDeleteTask(props.id);
    } else {
      // setEditable(false);
      props.onChangeText(props.id, newText);
    }
    handleEditTaskTextPopup();
  }

  function onDeleteTask() {
    props.onDeleteTask(props.id);
  }

  function getToggleLocation() {
    const rect = subMenuToggle.current.getBoundingClientRect();
    return rect.top;
  }

  // Called on every rerender
  useEffect(() => {
    // This squishes down the textarea box
    textArea.current.style.height = "5px";
    // This calculates the length of the scrollbar and sets that as the height of the textarea
    textArea.current.style.height = textArea.current.scrollHeight - 3 + "px";
  });

  return (
    <li className={"item".concat(props.checked ? " done" : "")}>
      <input
        type="checkbox"
        id={props.id}
        name={props.id}
        checked={props.checked}
        onChange={() => props.onToggleChecked(props.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            props.onToggleChecked(props.id);
          }
        }}
        aria-label={props.text}
      />
      <textarea
        className="item-text-area"
        value={props.text}
        ref={textArea}
        htmlFor={props.id}
        // onChange={(e) => setText(e.target.value)}
        // onKeyDown={(e) => {
        //   if (e.key === "Enter") {
        //     editable ? handleFinishRename() : props.onToggleChecked(props.id);
        //   }
        // }}
        // onBlur={handleFinishRename}
        // TODO: just say false here
        readOnly={!editable}
        onClick={() => {
          if (!editable) {
            props.onToggleChecked(props.id);
          }
        }}
        aria-label={"Task " + props.text}
      />
      <label className="dot" onClick={handleDropDown} aria-label={props.priorityToAria[props.priority] + " icon"}>
        {priorityToIcon[props.priority]}
      </label>
      <SubMenuToggle
        onToggle={handleDropDown}
        buttonLocation={subMenuToggle}
        accessibleName={"task ".concat(props.text)}
      />
      {dropDown && (
        <>
          <Backdrop onClickBackdrop={handleDropDown} />
          <SubMenu
            onHandleDropDown={handleDropDown}
            onRename={handleEditTaskTextPopup}
            top={getToggleLocation()}
            onDelete={onDeleteTask}
            bottomBarLocation={props.getBottomBarLocation()}
            accessibleName={"Task ".concat(props.text)}
            {...props}
          />
        </>
      )}
      {editTaskTextPopup && (
        <>
          <Backdrop onClickBackdrop={handleEditTaskTextPopup} />
          <EditTextPopup
            onClosePopup={handleEditTaskTextPopup}
            onRename={handleRename}
            text={props.text}
          />
        </>
      )}
    </li>
  );
}

export default TaskItem;
