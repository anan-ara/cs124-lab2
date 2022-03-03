import "./MainMenu.css";
import "./Dropdown.css";

function MainMenu(props) {
  return (
    <>
      <div className="top_bar_icon_div" onClick={props.onToggleDropdown}>
        <div className="dropdown">
          {props.dropDown ? (
            <div className="dropdown-content main-menu">
              <div
                className="delete-completed bottom-line delete"
                onClick={props.onDeleteCompleted}
              >
                Delete Completed
              </div>
              <div>Change Priority Emoji</div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default MainMenu;
