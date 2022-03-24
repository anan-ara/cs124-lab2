import "./TopBar.css";
// import priorityToggle from "./PriorityToggle";
import completedToggle from "./CompletedToggle";
import MainMenuToggle from "./MainMenuToggle";
import MainMenu from "./MainMenu";
import ToggleButton from "./ToggleButton";
import Backdrop from "./Backdrop";
import { useState } from "react";
import SortSelector from "./SortSelector";
// import SortMenuToggle from "./SortMenuToggle";

function TopBar(props) {
  // Main drop down
  const [dropDown, setDropDown] = useState(false);
  function handleDropDown() {
    setDropDown(!dropDown);
  }

  // Sort drop down
  const [sortDropDown, setSortDropDown] = useState(false);
  function handleSortDropDown() {
    setSortDropDown(!sortDropDown);
  }

  return (
    <>
      <div id="top_bar">
        <div id="app-title">
          Todos
        </div>
        <SortSelector
            dropDown={sortDropDown}
            onChangeSortType={props.onChangeSortType}
            currentSortType={props.sortType}
            onToggleDropdown={handleSortDropDown}
          />
        {/* <div id="sort_by_div">
          <span className="sorting_text">Sorting by: </span>
          <SortMenuToggle
            sortType={props.sortType}
            onToggleDropdown={handleSortDropDown}
          />
        </div> */}
        <MainMenuToggle onToggleDropdown={handleDropDown} />
      </div>
      {/* Conditionally show the drop down and backdrop  */}
      {/* {sortDropDown ? (
        <>
          <Backdrop onClickBackdrop={handleSortDropDown} />
          <SortSelector
            dropDown={sortDropDown}
            onChangeSortType={props.onChangeSortType}
            currentSortType={props.sortType}
            onToggleDropdown={handleSortDropDown}
          />
        </>
      ) : null} */}
      {dropDown ? (
        <>
          <Backdrop onClickBackdrop={handleDropDown} />
          <MainMenu
            dropDown={dropDown}
            onToggleDropdown={handleDropDown}
            {...props}
            // onDeleteCompleted={props.onDeleteCompleted}
          />
        </>
      ) : null}
    </>
  );
}

export default TopBar;
