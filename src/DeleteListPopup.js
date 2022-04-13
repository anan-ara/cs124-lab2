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
    <div className="popup delete-list-popup">
      <div>Are you sure you want to delete list {props.text}?</div>
      <div className="cancel-ok">
        <button
          // className={(props.showCompleted ? "activated " : "") + "radio-button"}
          onClick={props.onClosePopup}
        >
          Cancel
        </button>
        <button
          // className={(props.showCompleted ? "activated " : "") + "radio-button"}
          onClick={() => {
            props.onDeleteList(props.id);
            props.onClosePopup();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default DeleteListPopup;
