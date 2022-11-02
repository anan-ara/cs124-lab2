import "./ListContents.css";
import "./Contents.css";
import TaskItem from "./TaskItem";
import { useState } from "react";

function ListContents(props) {
  const [scroll, setScroll] = useState(true);

  function handleToggleScroll() {
    setScroll(!scroll);
  }


  return (
    <div id="list-contents" className={("contents").concat(scroll ? " scroll" : "").concat(props.isNarrow ? " small-width" : "")}>
      {props.loading ? (
        <div className={"empty"}>Loading...</div>
      ) : (
        <>
          {props.data.length === 0 && (
          <div className={"empty"}>
            {props.unfilteredData.length === 0 ?
            (props.showCompleted ? "You currently have no tasks." : "You currently have no incomplete tasks." )
            :
            (props.showCompleted ? "No complete tasks match your search." : "No incomplete tasks match your search." )
            }
          </div>
          )}
          <ul>
            {props.data.map((e) => (
              <TaskItem
                text={e.text}
                priority={e.priority}
                checked={e.checked}
                key={e.id}
                id={e.id}
                onToggleScroll={handleToggleScroll}
                {...props}
              />
            ))}
          </ul>
        </>
      )}
      <div ref={props.listEnd}></div>
    </div>
  );
}

export default ListContents;
