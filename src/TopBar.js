import "./TopBar.css";
import priorityToggle from "./PriorityToggle";
import completedToggle from "./CompletedToggle";
import MainMenu from "./MainMenu";
import ToggleButton from "./ToggleButton";

function TopBar(props) {
  return (
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
      <MainMenu 
        dropDown={props.dropDown}
        onShowDropDown={props.onShowDropDown}
        onHideDropDown={props.onHideDropDown}
      />
    </div>
  );
}

export default TopBar;
