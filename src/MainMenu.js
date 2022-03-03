import "./MainMenu.css";
import "./Dropdown.css";
// import {useState} from "react";

function MainMenu(props) {
  // const [priorityPopup, setPriorityPopup] = useState(false);
  
  // // Toggle the priority popup
  // function handlePriorityPopup() {
  //   setPriorityPopup(!priorityPopup);
  // }

  return (
    <>
      <div className="top_bar_icon_div" onClick={props.onToggleDropdown}>
        <div className="dropdown">
          {props.dropDown ? (
            <div className="dropdown-content main-menu">
              <div
                className="delete-completed bottom-line delete"
                onClick={props.onDeleteCompleted}
              >
                Delete Completed
              </div>
              <div onClick={props.onTogglePriorityPopup}>Change Priority Emoji</div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default MainMenu;
