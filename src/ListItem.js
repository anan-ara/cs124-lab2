import "./ListItem.css";
import SubMenu from "./SubMenu";
import Backdrop from "./Backdrop";
import SubMenuToggle from "./SubMenuToggle";
import { useState } from "react";

function ListItem(props) {
  const [dropDown, setDropDown] = useState(false);

  function handleDropDown() {
    setDropDown(!dropDown);
  }

  return (
    <li className={props.checked ? "done" : ""}>
      <input
        type="checkbox"
        id={props.id}
        name={props.id}
        checked={props.checked}
        onChange={() => props.onToggleChecked(props.id)}
      />
      <label htmlFor={props.id}>{props.text}</label>
      <span className="dot">{priorityToIcon[props.priority]}</span>
      <SubMenuToggle onToggle={handleDropDown} />
      {dropDown ? (
        <>
          <Backdrop onClickBackdrop={handleDropDown} />
          <SubMenu
            priority={props.priority}
            onChangePriority={props.onChangePriority}
            onDeleteTask={props.onDeleteTask}
            onHandleDropDown={handleDropDown}
            id={props.id}
          />
        </>
      ) : null}
    </li>
  );
}

const priorityToIcon = {
  0: "💤",
  1: "⚠️",
  2: "🔥",
};

export default ListItem;
