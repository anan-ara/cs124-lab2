import "./SubMenu.css";
import "./Dropdown.css";

function SubMenu(props) {
  return (
    <div
      // TODO: unhard code 125 -- right now 125 is pixels of sub menu height
      className={props.top + 125 > props.bottomBarLocation ? "dropdown poptop" : "dropdown"}
      onClick={props.onHandleDropDown}
    >
      <div className="dropdown-content sub-menu">
        <button className="bottom-line" onClick={props.onRename}>
          Rename
        </button>
        <button
          className={props.homeScreen ? "delete" : "delete bottom-line"}
          onClick={() => props.onDelete(props.id)}
        >
          Delete
        </button>
        {props.homeScreen || (
          <div className="priority-adjust">
            <button
              className={props.priority === 0 ? "activated" : ""}
              onClick={() => props.onChangePriority(props.id, 0)}
            >
              {props.lowPriorityIcon}
            </button>
            <button
              className={props.priority === 1 ? "activated" : ""}
              onClick={() => props.onChangePriority(props.id, 1)}
            >
              {props.medPriorityIcon}
            </button>
            <button
              className={props.priority === 2 ? "activated" : ""}
              onClick={() => props.onChangePriority(props.id, 2)}
            >
              {props.highPriorityIcon}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubMenu;
