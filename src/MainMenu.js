import "./MainMenu.css";
import "./Dropdown.css";

function MainMenu(props) {
  return (
    <>
      <div className="top_bar_icon_div">
        <div className="dropdown">
          {props.dropDown ? (
            <div className="dropdown-content main-menu">
              <button
                className="delete-completed bottom-line delete"
                onClick={() => {
                  props.onDeleteCompleted();
                  props.onToggleDropdown();
                }}
              >
                Delete Completed
              </button>
              <button>Change Priority Emoji</button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default MainMenu;
