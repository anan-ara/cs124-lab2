import "./ListItem.css";
import SubMenu from "./SubMenu";
import Backdrop from "./Backdrop";
import SubMenuToggle from "./SubMenuToggle";
import { useEffect, useState, useRef } from "react";

function ListItem(props) {
  const [dropDown, setDropDown] = useState(false);
  const [editable, setEditable] = useState(false);

  // Local text field before it is saved in database
  const [text, setText] = useState(props.text);

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

  function handleStartRename() {
    setEditable(true);
    textArea.current.selectionStart = textArea.current.value.length;
    textArea.current.selectionEnd = textArea.current.value.length;
    textArea.current.focus();
  }

  function handleFinishRename() {
    setEditable(false);
    props.onChangeText(props.id, text);
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleFinishRename();
          }
        }}
        onBlur={handleFinishRename}
        readOnly={!editable}
        onClick={() => {
          if (!editable) {
            props.onToggleChecked(props.id);
          }
        }}
      />
      <span className="dot">{priorityToIcon[props.priority]}</span>
      <SubMenuToggle onToggle={handleDropDown} buttonLocation={subMenuToggle} />
      {dropDown ? (
        <>
          <Backdrop onClickBackdrop={handleDropDown} />
          <SubMenu
            onHandleDropDown={handleDropDown}
            onRename={handleStartRename}
            top={getToggleLocation()}
            {...props}
          />
        </>
      ) : null}
    </li>
  );
}

export default ListItem;
