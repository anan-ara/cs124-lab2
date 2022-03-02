import "./ListItem.css";
import SubMenu from "./SubMenu";

function ListItem(props) {
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
      <SubMenu
        priority={props.priority}
        onChangePriority={props.onChangePriority}
        onDeleteTask={props.onDeleteTask}
        id={props.id}
      />
    </li>
  );
}

const priorityToIcon = {
  0: "💤",
  1: "⚠️",
  2: "🔥",
};

export default ListItem;
