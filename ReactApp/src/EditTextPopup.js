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
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            props.onRename(text);
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
          onClick={() => props.onRename(text)}
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
