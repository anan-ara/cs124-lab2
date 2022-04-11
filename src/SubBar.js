// import "./MainMenu.css";
import "./Dropdown.css";
import "./SubBar.css";
import SortSelector from "./SortSelector";
import SearchBar from "./SearchBar";
import CompletedSelector from "./CompletedSelector";
// import {useState} from "react";

function SubBar(props) {
  return (
    <div id="completion-bar" className="bottom-line">
      {/* Show the search bar if wide. */}
      {!props.isNarrow && <SearchBar
      filter={props.filter}
      setFilter={props.setFilter}
      />}

      {props.isNarrow ? <><button
        className={(props.showCompleted ? "activated " : "") + "radio-button"}
        onClick={props.onToggleCompleted}
      >
        Show All Tasks
      </button>
      <button
        className={(!props.showCompleted ? "activated " : "") + "radio-button"}
        onClick={props.onToggleCompleted}
      >
        Show Only Incomplete Tasks
      </button> </>: <CompletedSelector {...props}/>}

      {/* Show the sorting if not narrow */}
      {props.isNarrow || 
      <SortSelector
        onSelectSortType={props.onChangeSortType}
      />
      }
    </div>
  );
}

export default SubBar;
