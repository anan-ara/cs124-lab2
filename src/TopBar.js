import "./TopBar.css";
import priorityToggle from "./PriorityToggle";
import completedToggle from "./CompletedToggle";
import MainMenuToggle from "./MainMenuToggle";
import MainMenu from "./MainMenu";
import ToggleButton from "./ToggleButton";
import Backdrop from "./Backdrop";
import {useState} from "react";

function TopBar(props) {

  const [dropDown, setDropDown] = useState(false);
  function handleDropDown() {
    setDropDown(!dropDown);
  }

  return (
    <>
      <div id="top_bar">
        <ToggleButton
          data={priorityToggle}
          onToggle={props.onSortPriority}
          toggleState={props.sortPriority}
        ></ToggleButton>
        <ToggleButton
          data={completedToggle}
          onToggle={props.onShowCompleted}
          toggleState={props.showCompleted}
        ></ToggleButton>
        <MainMenuToggle
          dropDown={dropDown}
          onToggleDropdown={handleDropDown}
        />
      </div>
      {/* Conditionally show the drop down and backdrop  */}
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
