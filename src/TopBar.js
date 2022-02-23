import "./TopBar.css";
import PriorityToggle from "./PriorityToggle";
import CompletedToggle from "./CompletedToggle";
import MainMenu from "./MainMenu";

function TopBar(props) {
  return (
    <div id="top_bar">
      <PriorityToggle
        sortPriority={props.sortPriority}
        onSortPriority={props.onSortPriority}
      />
      <CompletedToggle
        showCompleted={props.showCompleted}
        onShowCompleted={props.onShowCompleted}
      />
      <MainMenu />
    </div>
  );
}

export default TopBar;
