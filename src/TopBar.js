import "./TopBar.css";
import priorityToggle from "./PriorityToggle";
import completedToggle from "./CompletedToggle";
import MainMenuToggle from "./MainMenuToggle";
import MainMenu from "./MainMenu";
import ToggleButton from "./ToggleButton";
import Backdrop from "./Backdrop";
import {useState} from "react";
import SortMenu from "./SortMenu";
import SortMenuToggle from "./SortMenuToggle";

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
        {/* <ToggleButton
          data={priorityToggle}
          onToggle={props.onChangeSortType}
          toggleState={props.sortType === "priority"}
        ></ToggleButton> */}
        {/* Shows the sort type */}
        Sorting by: 
        <SortMenuToggle
          sortType={props.sortType}
          onToggleDropdown={handleSortDropDown}
        />
        <ToggleButton
          data={completedToggle}
          onToggle={props.onShowCompleted}
          toggleState={props.showCompleted}
        />
        <MainMenuToggle
          // dropDown={dropDown}
          onToggleDropdown={handleDropDown}
        />
      </div>
      {/* Conditionally show the drop down and backdrop  */}
      {sortDropDown ? (
        <>
          <Backdrop onClickBackdrop={handleSortDropDown} />
          <SortMenu dropDown={sortDropDown} onChangeSortType={props.onChangeSortType} onToggleDropdown={handleSortDropDown}/>

        </>
      ) : null}
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
