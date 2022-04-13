import "./DeleteListPopup.css";
import "./Popup.css";
import { useEffect, useState, useRef } from "react";

function DeleteListPopup(props) {
  const start = useRef();
  const end = useRef();

  useEffect(() => {
    start.current.focus();
  });

  return (
    <div
      className="popup delete-list-popup"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          props.onClosePopup();
        }
      }}
    >
      <div className="delete-explanation">Are you sure you want to delete list</div>
      <div className="delete-list-name">{props.text}?</div>
      <div className="cancel-ok">
        <button
          ref={start}
          onClick={props.onClosePopup}
          onKeyDown={(e) => {
            if (e.key === "Tab" && e.shiftKey) {
              e.preventDefault();
              end.current.focus();
            }
          }}
        >
          Cancel
        </button>
        <button
          ref={end}
          onClick={() => {
            props.onDeleteList(props.id);
            props.onClosePopup();
          }}
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

export default DeleteListPopup;
