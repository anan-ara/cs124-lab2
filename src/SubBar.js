// import "./MainMenu.css";
import "./Dropdown.css";
import "./SubBar.css";
import SortSelector from "./SortSelector";
import SearchBar from "./SearchBar";
import CompletedSelector from "./CompletedSelector";
// import {useState} from "react";

function SubBar(props) {
  return (
    // Need class name isNarrow so that we can change the flex box spacing depending on which elements are in SubBar
    <div id="completion-bar" className={("bottom-line").concat(props.isNarrow ? " is-narrow" : "")}>
      {/* Show the search bar if wide. */}
      {!props.isNarrow && <SearchBar
      filter={props.filter}
      setFilter={props.setFilter}
      />}

      {props.isNarrow ? <><button
        className={(props.showCompleted ? "activated " : "") + "radio-button"}
        onClick={props.onToggleCompleted}
      >
        Show All
      </button>
      <button
        className={(!props.showCompleted ? "activated " : "") + "radio-button"}
        onClick={props.onToggleCompleted}
      >
        Show Only Incomplete
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
