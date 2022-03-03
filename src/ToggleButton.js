import "./ToggleButton.css";

function ToggleButton(props) {
  return (
    <button className="top_bar_icon_div" onClick={props.onToggle}>
      {props.toggleState ? props.data.activeIcon : props.data.inactiveIcon}
      {props.toggleState ? <label>{props.data.activeText}</label> : <label>{props.data.inactiveText}</label>}
    </button>
  );
}

export default ToggleButton;
