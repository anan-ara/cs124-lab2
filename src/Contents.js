import "./Contents.css";
import ListItem from "./ListItem";
import { useState } from "react";

function Contents(props) {
  const [scroll, setScroll] = useState(true)

  function handleToggleScroll() {
    setScroll(!scroll)
  }

  let listData = props.data;
  if (props.sortPriority) {
    // Do a deep copy of listData, then sort it by priority.
    // a is first if it has a higher priority than a.
    // https://stackoverflow.com/questions/9592740/how-can-you-sort-an-array-without-mutating-the-original-array
    listData = [...listData].sort((a, b) => (a.priority > b.priority ? -1 : 1));
  }
  // Show/hide completed toggle functionality
  if (!props.showCompleted) {
    listData = listData.filter((item) => !item.checked);
  }

  return (
    <div id="contents" className={scroll ? "scroll" : ""}>
      <ul>
        {listData.map(e => (
          <ListItem
            text={e.text}
            priority={e.priority}
            // priorityToIcon={props.priorityToIcon}
            checked={e.checked}
            key={e.id}
            id={e.id}
            onToggleScroll={handleToggleScroll}
            {...props}
          />
        ))}
      </ul>
      <div ref={props.listEnd}></div>
    </div>
  );
}

export default Contents;
