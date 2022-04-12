import "./HomeBottomBar.css";
import { useState, useRef } from "react";

function HomeBottomBar(props) {
  return (
    <div id="home-bottom-bar" ref={props.ref}>
      <button
        // className={(props.showCompleted ? "activated " : "") + "radio-button"}
        onClick={props.handleAddList}
      >
        Create New List
      </button>{" "}
    </div>
  );
}

export default HomeBottomBar;
