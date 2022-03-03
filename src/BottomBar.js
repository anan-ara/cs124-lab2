import "./BottomBar.css";
import { useState } from "react";

function BottomBar(props) {
  const [text, setText] = useState("");

  function clearText() {
    setText("");
  }

  return (
    <div id="bottom_bar">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-plus"
        viewBox="0 0 16 16"
        onClick={() => {
          props.onTextInput(text);
          clearText();
        }}
      >
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
      </svg>
      <input
        type="text"
        placeholder="Add new item..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            props.onTextInput(text);
            clearText();
          }
        }}
      />
    </div>
  );
}

export default BottomBar;
