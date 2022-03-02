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
          onToggleDropdown={props.onToggleDropdown}
        />
      </div>
      {/* Conditionally show the drop down and backdrop  */}
      {props.dropDown ? (
        <Backdrop onClickBackdrop={props.onToggleDropdown} />
      ) : null}
      {props.dropDown ? (
        <MainMenu
          dropDown={props.dropDown}
          onToggleDropdown={props.onToggleDropdown}
          onDeleteCompleted={props.onDeleteCompleted}
        />
      ) : null}
    </>
  );
}

export default TopBar;
