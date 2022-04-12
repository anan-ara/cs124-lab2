import "./Popup.css";
import "./DeleteCompletedPopup.css";
import { useState } from "react";

function DeleteCompletedPopup(props) {
  // const [text, setText] = useState("");

  let extraWarningText = ""
  if (props.filter !== "") {
    extraWarningText = " The search bar is not empty. Some completed tasks may not currently be shown."
  } else if (!props.showCompleted) {
    extraWarningText = " Only incomplete tasks are currently being shown."
  }


  return (
    <div className="popup delete-completed-popup">
      <div>Are you sure you want to delete all completed tasks?
        {extraWarningText}
        </div>
      <div className="cancel-ok">
        <button
          // className={(props.showCompleted ? "activated " : "") + "radio-button"}
          onClick={props.onClosePopup}
        >
          Cancel
        </button>
        <button
          // className={(!props.showCompleted ? "activated " : "") + "radio-button"}
          onClick={() => {
            props.onDelete();
            props.onClosePopup();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default DeleteCompletedPopup;
