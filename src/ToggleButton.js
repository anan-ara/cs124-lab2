import "./ToggleButton.css";

function ToggleButton(props) {
  return (
    <div className="top_bar_icon_div" onClick={props.onToggle}>
      {props.toggleState ? props.data.inactiveIcon : props.data.activeIcon}
      {props.toggleState ? <label>{props.data.inactiveText}</label> : <label>{props.data.activeText}</label>}
    </div>
  );
}

export default ToggleButton;
