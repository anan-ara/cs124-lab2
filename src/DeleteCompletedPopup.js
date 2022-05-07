import "./Popup.css";
import "./DeleteCompletedPopup.css";
import { useEffect, useRef } from "react";

function DeleteCompletedPopup(props) {
  const start = useRef();
  const end = useRef();

  useEffect(() => {
    start.current.focus();
  });s

  let extraWarningText = "";
  if (props.filter !== "") {
    extraWarningText =
      " The search bar is not empty. Some completed tasks may not currently be shown.";
  } else if (!props.showCompleted) {
    extraWarningText = " Only incomplete tasks are currently being shown.";
  }

  return (
    <div
      className="popup delete-completed-popup"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          props.onClosePopup();
        }
      }}
    >
      <div>
        Are you sure you want to delete all completed tasks?
        {extraWarningText}
      </div>
      <div className="cancel-ok">
        <button
          // className={(props.showCompleted ? "activated " : "") + "radio-button"}
          onClick={props.onClosePopup}
          ref={start}
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
          // className={(!props.showCompleted ? "activated " : "") + "radio-button"}
          onClick={() => {
            props.onDelete();
            props.onClosePopup();
          }}
          ref={end}
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

export default DeleteCompletedPopup;
