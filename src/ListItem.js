import "./ListItem.css";
import SubMenu from "./SubMenu";

function ListItem(props) {
  return (
    <li className={props.checked ? "done" : ""}>
      <input
        type="checkbox"
        id="item1"
        name="item1"
        checked={props.checked}
        onChange={() => props.onToggleChecked(props.id)}
      />
      <label htmlFor="item1">{props.text}</label>
      <span className="dot">{priorityToIcon[props.priority]}</span>
      <SubMenu priority={props.priority} />
    </li>
  );
}

const priorityToIcon = {
  0: "💤",
  1: "⚠️",
  2: "🔥",
};

export default ListItem;
