import "./CreateListPopup.css";
import { useState } from "react";

function DeleteListPopup(props) {

  return (
    <div className="priority_popup priority-content">
      <div>Are you sure you want to delete list {props.text}?</div>
      <div>
        <button
          onClick={props.onClosePopup}
        >
          Cancel
        </button>
        <button
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
