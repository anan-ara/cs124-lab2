import "./TopBar.css";
import PriorityToggle from "./PriorityToggle";
import CompletedToggle from "./CompletedToggle";
import MainMenuToggle from "./MainMenuToggle";
import MainMenu from "./MainMenu";

function TopBar(props) {
  return (
    <>
    <div id="top_bar">
      <PriorityToggle
        sortPriority={props.sortPriority}
        onSortPriority={props.onSortPriority}
      />
      <CompletedToggle
        showCompleted={props.showCompleted}
        onShowCompleted={props.onShowCompleted}
      />
      <MainMenuToggle
      dropDown={props.dropDown}
        onShowDropDown={props.onShowDropDown}
        onHideDropDown={props.onHideDropDown}
      />
    </div>
    {props.dropDown ? <MainMenu 
      dropDown={props.dropDown}
      onShowDropDown={props.onShowDropDown}
      onHideDropDown={props.onHideDropDown}
    />: null}
    </>
    
  );
}

export default TopBar;
