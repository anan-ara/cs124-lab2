import "./MainMenu.css";
import "./Dropdown.css";
import "./SortSelector.css";
import SortSelector from "./SortSelector";

function HomeMainMenu(props) {
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
            homeScreen={props.homeScreen}
          />
        </div>
      )}
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

export default HomeMainMenu;
