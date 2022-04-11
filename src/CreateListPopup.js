import "./CreateListPopup.css";
import { useState } from "react";

function CreateListPopup(props) {
  const [text, setText] = useState("");

  function onCreateList() {
    props.onAddList(text);
    setText("");
    props.onClosePopup();
  }

  return (
    <div className="create-list-popup">
      <div>New List Name:</div>
      <input
        type="text"
        placeholder="Add new item..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onCreateList();
          }
        }}
      />
      <div>
        <button
          // className={(props.showCompleted ? "activated " : "") + "radio-button"}
          onClick={props.onClosePopup}
        >
          Cancel
        </button>
        <button
          // className={(!props.showCompleted ? "activated " : "") + "radio-button"}
          onClick={onCreateList}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default CreateListPopup;
