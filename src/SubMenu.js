import "./SubMenu.css";
import "./Dropdown.css";
import { useEffect, useState, useRef } from "react";

function SubMenu(props) {
  const start = useRef();
  const end = useRef();

  useEffect(() => {
    start.current.focus();
  });

  return (
    <div
      // TODO: unhard code 125 -- right now 125 is pixels of sub menu height
      className={
        props.top + 125 > props.bottomBarLocation
          ? "dropdown poptop"
          : "dropdown"
      }
      onClick={props.onHandleDropDown}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          props.onHandleDropDown();
        }
      }}
    >
      <div
        className={"dropdown-content sub-menu".concat(
          props.homeScreen ? " home" : ""
        )}
      >
        <button
          className="bottom-line"
          onClick={props.onRename}
          ref={start}
          onKeyDown={(e) => {
            if (e.key === "Tab" && e.shiftKey) {
              e.preventDefault();
              end.current.focus();
            }
          }}
        >
          Rename
        </button>
        {props.homeScreen ? (
          <button
            ref={end}
            className={props.homeScreen ? "delete" : "delete bottom-line"}
            onClick={() => props.onDelete(props.id)}
            onKeyDown={(e) => {
              if (e.key === "Tab" && !e.shiftKey) {
                e.preventDefault();
                start.current.focus();
              }
            }}
          >
            Delete
          </button>
        ) : (
          <>
            <button
              className={props.homeScreen ? "delete" : "delete bottom-line"}
              onClick={() => props.onDelete(props.id)}
            >
              Delete
            </button>
            <div className="priority-adjust">
              <button
                className={props.priority === 0 ? "activated" : ""}
                onClick={() => props.onChangePriority(props.id, 0)}
              >
                {props.lowPriorityIcon}
              </button>
              <button
                className={props.priority === 1 ? "activated" : ""}
                onClick={() => props.onChangePriority(props.id, 1)}
              >
                {props.medPriorityIcon}
              </button>
              <button
                ref={end}
                className={props.priority === 2 ? "activated" : ""}
                onClick={() => props.onChangePriority(props.id, 2)}
                onKeyDown={(e) => {
                  if (e.key === "Tab" && !e.shiftKey) {
                    e.preventDefault();
                    start.current.focus();
                  }
                }}
              >
                {props.highPriorityIcon}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SubMenu;
