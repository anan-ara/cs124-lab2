import "./MainMenu.css";
import "./Dropdown.css";
import "./SortSelector.css";
import SortSelector from "./SortSelector";

function MainMenu(props) {
  return (
    <div className="dropdown dropdown-content main-menu top-bar-menu">
      {props.isNarrow && (
        <div className="bottom-line">
          <SortSelector
            dropDown={props.sortDropDown}
            onSelectSortType={
              sortOption => {
              props.onChangeSortType(sortOption);
              props.onToggleDropdown();
              }
            }
          />
        </div>
      )}
      <button
        className="delete-completed bottom-line delete"
        onClick={() => {
          props.onDeleteCompleted();
          props.onToggleDropdown();
        }}
      >
        Delete Completed
      </button>
      <button
        onClick={() => {
          props.onTogglePriorityPopup();
          props.onToggleDropdown();
        }}
      >
        Change Priority Emoji
      </button>
    </div>
  );
}

export default MainMenu;
