import "./TopBar.css";
import priorityToggle from "./PriorityToggle";
import completedToggle from "./CompletedToggle";
import MainMenuToggle from "./MainMenuToggle";
import MainMenu from "./MainMenu";
import ToggleButton from "./ToggleButton";
import Backdrop from "./Backdrop";

function TopBar(props) {
  return (
    <>
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
      <MainMenuToggle
      dropDown={props.dropDown}
        onShowDropDown={props.onShowDropDown}
        onHideDropDown={props.onHideDropDown}
      />
    </div>
    {/* Conditionally show the drop down and backdrop  */}
    {props.dropDown ? <Backdrop onClickBackdrop={props.onHideDropDown}/> : null} 
    {props.dropDown ? <MainMenu 
      dropDown={props.dropDown}
      onShowDropDown={props.onShowDropDown}
      onHideDropDown={props.onHideDropDown}
    />: null}
    </>
    
  );
}

export default TopBar;
