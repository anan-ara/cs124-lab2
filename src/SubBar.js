// import "./MainMenu.css";
import "./Dropdown.css";
import "./SubBar.css";
import SortSelector from "./SortSelector";
// import {useState} from "react";

function SubBar(props) {
  return (
    <div id="completion-bar" className="bottom-line">
      <button
        className={(props.showCompleted ? "activated " : "") + "radio-button"}
        onClick={props.onShowCompleted}
      >
        Show All Tasks
      </button>
      <button
        className={(!props.showCompleted ? "activated " : "") + "radio-button"}
        onClick={props.onHideCompleted}
      >
        Show Only Incomplete Tasks
      </button>
      {props.isNarrow || 
      <SortSelector
        onSelectSortType={props.onChangeSortType}
      />
      }
    </div>
  );
}

export default SubBar;
