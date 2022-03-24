import "./MainMenu.css";
import "./Dropdown.css";
import "./TopBarMenu.css";
// import {useState} from "react";

function MainMenu(props) {

  return (
    <>
      <div className="top_bar_icon_div" onClick={props.onToggleDropdown}>
        <div className="dropdown">
          {props.dropDown ? (
            <div className="dropdown-content main-menu top-bar-menu">
              <button
                className="delete-completed bottom-line delete"
                onClick={props.onDeleteCompleted}
              >
                Delete Completed
              </button>
              <button onClick={props.onTogglePriorityPopup}>Change Priority Emoji</button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default MainMenu;
