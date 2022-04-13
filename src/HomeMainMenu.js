import "./MainMenu.css";
import "./Dropdown.css";
import "./SortSelector.css";
import SortSelector from "./SortSelector";
import { useEffect, useRef } from "react";

function HomeMainMenu(props) {
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
      {props.isWide ? (
        <button
          ref={start}
          onClick={() => {
            props.onTogglePriorityPopup();
            props.onToggleDropdown();
          }}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              // start.current.focus();
            }
          }}
        >
          Change Priority Emoji
        </button>
      ) : (
        <>
          <div className="bottom-line">
            <SortSelector
              dropDown={props.sortDropDown}
              onSelectSortType={(sortOption) => {
                props.onChangeSortType(sortOption);
                props.onToggleDropdown();
              }}
              currentSortType={props.sortType}
              homeScreen={props.homeScreen}
              start={start}
              end={end}
            />
          </div>
          <button
            ref={end}
            onClick={() => {
              props.onTogglePriorityPopup();
              props.onToggleDropdown();
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab" && !e.shiftKey) {
                e.preventDefault();
                start.current.focus();
              }
            }}
          >
            Change Priority Emoji
          </button>
        </>
      )}
    </div>
  );
}

export default HomeMainMenu;
