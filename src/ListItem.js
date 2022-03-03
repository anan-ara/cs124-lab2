import "./ListItem.css";
import SubMenu from "./SubMenu";
import Backdrop from "./Backdrop";
import SubMenuToggle from "./SubMenuToggle";
import { useEffect, useState, useRef } from "react";

function ListItem(props) {
  const [dropDown, setDropDown] = useState(false);

  // Local text field before it is saved in database
  const [text, setText] = useState(props.text);

  // reference to textArea
  const textArea = useRef();

  // reference to subMenuToggle button
  const subMenuToggle = useRef();

  function handleDropDown() {
    props.onToggleScroll();
    setDropDown(!dropDown);
  }

  function handleStartRename() {
    // textArea.current.prop("readonly", false)
    // textArea.current.readonly = false;
    textArea.current.focus()
  }

  function handleFinishRename() {
    // textArea.current.readonly = true;
    // textArea.current.prop("readonly", true)
    props.onChangeText(props.id, text)
  }

  function getToggleLocation() {
    const rect = subMenuToggle.current.getBoundingClientRect();
    return rect.top
  }

  // Called on every rerender
  useEffect(() => {
    // This squishes down the textarea box
    textArea.current.style.height = "5px";
    // This calculates the length of the scrollbar and sets that as the height of the textarea
    textArea.current.style.height = textArea.current.scrollHeight + "px";
  });

  return (
    <li className={props.checked ? "done" : ""}>
      <input
        type="checkbox"
        id={props.id}
        name={props.id}
        checked={props.checked}
        onChange={() => props.onToggleChecked(props.id)}
      />
      <textarea
        value={text}
        ref={textArea}
        htmlFor={props.id}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleFinishRename}
      />
      <span className="dot">{priorityToIcon[props.priority]}</span>
      <SubMenuToggle onToggle={handleDropDown} buttonLocation={subMenuToggle} />
      {dropDown ? (
        <>
          <Backdrop onClickBackdrop={handleDropDown} />
          <SubMenu
            priority={props.priority}
            onChangePriority={props.onChangePriority}
            onDeleteTask={props.onDeleteTask}
            onHandleDropDown={handleDropDown}
            onRename={handleStartRename}
            top={getToggleLocation()}
            id={props.id}
          />
        </>
      ) : null}
    </li>
  );
}

const priorityToIcon = {
  0: "💤",
  1: "⚠️",
  2: "🔥",
};

export default ListItem;
