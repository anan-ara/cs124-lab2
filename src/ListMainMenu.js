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
            className="delete-completed bottom-line"
            onClick={() => {
              props.onShare();
              props.onToggleDropdown();
            }}
            aria-label={"Share list"}
          >
            {props.sharingLevel === "owner" ? "Share List" : "View Sharing"}
          </button>
          <button
            className="delete-completed bottom-line delete"
            onClick={() => {
              props.onDeleteCompleted();
              props.onToggleDropdown();
            }}
          >
            Delete Completed
          </button>
        </>
      ) : (
        <>
          <button
            ref={start}
            className="delete-completed bottom-line"
            onClick={() => {
              props.onShare();
              props.onToggleDropdown();
            }}
            aria-label={"Share list"}
            onKeyDown={(e) => {
              if (e.key === "Tab" && e.shiftKey) {
                e.preventDefault();
                end.current.focus();
              }
            }}
          >
            {props.sharingLevel === "owner" ? "Share List" : "View Sharing"}
          </button>
          <button
            className="delete-completed delete bottom-line"
            onClick={() => {
              props.onDeleteCompleted();
              props.onToggleDropdown();
            }}
          >
            Delete Completed
          </button>
        </>
      )}
      <button
        ref={end}
        onClick={() => {
          props.onToggleDropdown();
          props.onSignOut();
        }}
        onKeyDown={(e) => {
          if (e.key === "Tab" && !e.shiftKey) {
            e.preventDefault();
            start.current.focus();
          }
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

export default ListMainMenu;
