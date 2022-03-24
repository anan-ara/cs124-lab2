import "./MainMenu.css";
import "./Dropdown.css";
import "./TopBarMenu.css";
// import {useState} from "react";

function MainMenu(props) {
  return (
    <>
      {props.dropDown ? (
        <div
          className="dropdown dropdown-content main-menu top-bar-menu"
          onClick={props.onToggleDropdown}
        >
          <button
            className="delete-completed bottom-line delete"
            onClick={props.onDeleteCompleted}
          >
            Delete Completed
          </button>
          <button onClick={props.onTogglePriorityPopup}>
            Change Priority Emoji
          </button>
        </div>
      ) : null}
    </>
  );
}

export default MainMenu;
