import "./SubMenu.css";
import "./Dropdown.css";

function SubMenu(props) {
  
  function selectPriority(priority) {
    props.onChangePriority(props.id, priority);
    props.onHandleDropDown();
  }

  return (
    <div className="dropdown">
        <div className="dropdown-content sub-menu">
      <div className="bottom-line">Rename</div>
      <div
        className="delete bottom-line"
        onClick={() => props.onDeleteTask(props.id)}
      >
        Delete
      </div>
      <div className="priority-adjust">
        <div
          className={props.priority === 0 ? "activated" : ""}
          onClick={() => selectPriority(0)}
        >
          💤
        </div>
        <div
          className={props.priority === 1 ? "activated" : ""}
          onClick={() => selectPriority(1)}
        >
          ⚠️
        </div>
        <div
          className={props.priority === 2 ? "activated" : ""}
          onClick={() => selectPriority(2)}
        >
          🔥
        </div>
      </div>
    </div>
    </div>
  );
}

export default SubMenu;
