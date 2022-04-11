import "./Contents.css";
import ListItem from "./ListItem";
import { useState } from "react";

function HomeContents(props) {
  const [scroll, setScroll] = useState(true);

  function handleToggleScroll() {
    setScroll(!scroll);
  }

  // let listData = props.data;
  // if (props.sortPriority) {
  //   // Do a deep copy of listData, then sort it by priority.
  //   // a is first if it has a higher priority than a.
  //   // https://stackoverflow.com/questions/9592740/how-can-you-sort-an-array-without-mutating-the-original-array
  //   listData = [...listData].sort((a, b) => (a.priority > b.priority ? -1 : 1));
  // }
  // Show/hide completed toggle functionality
  // if (!props.showCompleted) {
  //   listData = listData.filter((item) => !item.checked);
  // }

  return (
    <div id="contents" className={scroll ? "scroll" : ""}>
      {props.loading ? (
        <div className={"empty"}>Loading...</div>
      ) : (
        <>
          {props.data.length === 0 && (
          <div className={"empty"}>
             You currently have no lists
          </div>
          )}
          <ul>
            {props.data.map((e) => (
              <ListItem
                text={e.text}
                priority={e.priority}
                // priorityToIcon={props.priorityToIcon}
                checked={e.checked}
                total={e.total}
                complete={e.complete}
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

export default HomeContents;
