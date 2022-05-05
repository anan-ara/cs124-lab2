import "./CreateListPopup.css"; // same styling for now, should prob change later
import "./Popup.css";
import { useState, useEffect, useRef } from "react";

function EditTextPopup(props) {
  const [text, setText] = useState(props.text); // TODO: put initial text here
  const start = useRef();
  const end = useRef();

  useEffect(() => {
    start.current.focus();
  });

  // function handleFinishRename() {
  //   if (text === "") {
  //     props.onDeleteList(props.id);
  //   } else {
  //     // setEditable(false);
  //     props.onChangeText(props.id, text);
  //   }
  // }

  function onEnterText() {
    // props.onAddList(text);
    //  add actual entering function here
    if (text === "") {
      props.onDeleteList(props.id);
    } else {
      // setEditable(false);
      props.onChangeText(props.id, text);
    }
    console.log("text entered, text is" + text);
    // setText("");
    props.onClosePopup();
  }

  return (
    <div
      className="create-list-popup popup"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          props.onClosePopup();
        }
      }}
    >
      <div>Rename to:</div>
      <input
        ref={start}
        type="text"
        // placeholder="Add new item..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnterText();
          } else if (e.key === "Tab" && e.shiftKey) {
            e.preventDefault();
            end.current.focus();
          }
        }}
      />
      <div className="cancel-ok">
        <button onClick={props.onClosePopup}>Cancel</button>
        <button
          ref={end}
          onClick={onEnterText}
          onKeyDown={(e) => {
            if (e.key === "Tab" && !e.shiftKey) {
              e.preventDefault();
              start.current.focus();
            }
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default EditTextPopup;
