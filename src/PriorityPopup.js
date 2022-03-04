import "./PriorityPopup.css";
import PriorityTab from "./PriorityTab.js";

function PriorityPopup(props) {
  return (
    <div id="priority_popup">
      <PriorityTab
        iconOptions={props.lowPriorityOptions}
        currentIcon={props.lowPriorityIcon}
        onChangeIcon={props.onChangeLowPriorityIcon}
        priorityText={"Low"}
      />
    </div>
  );
}

export default PriorityPopup;

{
  /* <div className="dropdown">
  {props.dropDown ? (
    <div className="dropdown-content main-menu">
      <button
        className="delete-completed bottom-line delete"
        onClick={props.onDeleteCompleted}
      >
        Delete Completed
      </button>
      <button onClick={props.onTogglePriorityPopup}>
        Change Priority Emoji
      </button>
    </div>
  ) : null}
</div>; */
}
