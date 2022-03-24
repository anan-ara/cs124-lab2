import "./MainMenu.css";
import "./Dropdown.css";
import "./CompletionBar.css";
// import {useState} from "react";

function CompletionBar(props) {

  return (
      <div id="completion-bar">
    <button className={(props.showCompleted ? "activated " : "") + "radio-button" } onClick={props.onShowCompleted}> 
    Show All Tasks
    </button>
    <button className={(!props.showCompleted ? "activated " : "") + "radio-button" } onClick={props.onHideCompleted}> 
    Show Only Incomplete Tasks
    </button>

      </div>
  );
}

export default CompletionBar;
