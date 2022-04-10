import "./MainMenu.css";
import "./Dropdown.css";
import "./SortSelector.css";
import SortSelector from "./SortSelector";

function ListMainMenu(props) {
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
            currentSortType={props.sortType}
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
    </div>
  );
}

export default ListMainMenu;
