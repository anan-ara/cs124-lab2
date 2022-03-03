import "./SubMenu.css";
import "./Dropdown.css";

function SubMenu(props) {
  return (
    <div className="dropdown" onClick={props.onHandleDropDown}>
      <div className="dropdown-content sub-menu">
        <div className="bottom-line" onClick={props.onRename}>
          Rename
        </div>
        <div
          className="delete bottom-line"
          onClick={() => props.onDeleteTask(props.id)}
        >
          Delete
        </div>
        <div className="priority-adjust">
          <div
            className={props.priority === 0 ? "activated" : ""}
            onClick={() => props.onChangePriority(props.id, 0)}
          >
            💤
          </div>
          <div
            className={props.priority === 1 ? "activated" : ""}
            onClick={() => props.onChangePriority(props.id, 1)}
          >
            ⚠️
          </div>
          <div
            className={props.priority === 2 ? "activated" : ""}
            onClick={() => props.onChangePriority(props.id, 2)}
          >
            🔥
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubMenu;
