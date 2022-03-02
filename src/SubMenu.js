import "./SubMenu.css";
import "./Dropdown.css";
import SubMenuDropDown from "./SubMenuDropDown";
import { useState } from "react";


function SubMenu(props) {
  const [dropDown, setDropDown] = useState(false);

  function handleShowDropDown() {
    setDropDown(true);
  }

  function handleHideDropDown() {
    setDropDown(false);
  }

  return (
    <div className="dropdown">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-list dropbtn"
        viewBox="0 0 16 16"
        onClick={handleShowDropDown}
      >
        <path
          fillRule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>
      {dropDown ? (
        <SubMenuDropDown
          onChangePriority={props.onChangePriority}
          onHideDropDown={handleHideDropDown}
          onDeleteTask={props.onDeleteTask}
          id={props.id}
        />
      ) : null}
    </div>
  );
}

export default SubMenu;
