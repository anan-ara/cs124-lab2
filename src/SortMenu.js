import "./SortMenu.css";
import "./Dropdown.css";
import "./TopBarMenu.css";

function SortMenu(props) {
  // TODO: pass this down from app instead of just putting it here (maybe??)
  const SORT_TYPES = ["created", "priority", "text"];

  return (
    <>
      <div className="top_bar_icon_div" onClick={props.onToggleDropdown}>
        <div className="dropdown">
          {props.dropDown ? (
            <div className="dropdown-content top-bar-menu sort-menu">
              {/* // Only show the options for the sort types other than the current sort type. */}
              {SORT_TYPES.map(
                (sortType) =>
                  props.currentSortType !== sortType && (
                    <button
                      className="bottom-line"
                      onClick={(e) =>
                        props.onChangeSortType(e.currentTarget.textContent)
                      }
                    >
                      {sortType}
                    </button>
                  )
              )}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default SortMenu;
