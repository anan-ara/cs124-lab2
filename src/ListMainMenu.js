import "./MainMenu.css";
import "./Dropdown.css";
import "./SortSelector.css";
import SortSelector from "./SortSelector";
import { useEffect, useRef } from "react";

function ListMainMenu(props) {
  const start = useRef();
  const end = useRef();

  useEffect(() => {
    start.current.focus();
  });

  return (
    <div
      className="dropdown dropdown-content main-menu top-bar-menu"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          props.onToggleDropdown();
        }
      }}
    >
      {props.isNarrow ? (
        <>
          <div className="bottom-line">
            <SortSelector
              dropDown={props.sortDropDown}
              onSelectSortType={(sortOption) => {
                props.onChangeSortType(sortOption);
                props.onToggleDropdown();
              }}
              currentSortType={props.sortType}
              start={start}
              end={end}
            />
          </div>
          <button
            ref={end}
            className="delete-completed delete"
            onClick={() => {
              props.onDeleteCompleted();
              props.onToggleDropdown();
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab" && !e.shiftKey) {
                e.preventDefault();
                start.current.focus();
              }
            }}
          >
            Delete Completed
          </button>
        </>
      ) : (
        <button
          ref={start}
          className="delete-completed delete"
          onClick={() => {
            props.onDeleteCompleted();
            props.onToggleDropdown();
          }}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              // start.current.focus();
            }
          }}
        >
          Delete Completed
        </button>
      )}
    </div>
  );
}

export default ListMainMenu;
