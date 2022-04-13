import "./CreateListPopup.css";
import "./Popup.css";
import { useState, useEffect, useRef } from "react";

function CreateListPopup(props) {
  const [text, setText] = useState("");
  const start = useRef();
  const end = useRef();

  useEffect(() => {
    start.current.focus();
  });

  function onCreateList() {
    props.onAddList(text);
    setText("");
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
      <div>New List Name:</div>
      <input
        ref={start}
        type="text"
        placeholder="Add new item..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onCreateList();
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
          onClick={onCreateList}
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

export default CreateListPopup;
