import "./HomeContents.css";
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
    <div id="home-contents" className={("contents").concat(scroll ? " scroll" : "").concat(props.isNarrow ? " small-width" : "")}>
      {props.loading ? (
        <div className={"empty"}>Loading...</div>
      ) : (
        <>
        {/* TODO: make this code more robust for multiple permission levels */}
          {props.ownerData.length === 0 && (
            <div className={"empty"}>
              {props.ownerUnfilteredData.length === 0
                ? "You currently have no lists."
                : "No lists match your search."}
            </div>
          )}
          <ul>
            {props.ownerData.map((e) => (
              <ListItem
                text={e.text}
                priority={e.priority}
                // priorityToIcon={props.priorityToIcon}
                checked={e.checked}
                total={e.total}
                complete={e.complete}
                editors={e.editors}
                key={e.id}
                id={e.id}
                owner={e.owner}
                onToggleScroll={handleToggleScroll}
                sharingLevel={"owner"}
                {...props}
              />
            ))}
            {props.editorData.map((e) => (
              ((props.usersData && !props.usersData.hiddenLists.includes(e.id)) &&  <ListItem
                text={e.text}
                priority={e.priority}
                // priorityToIcon={props.priorityToIcon}
                checked={e.checked}
                total={e.total}
                complete={e.complete}
                key={e.id}
                id={e.id}
                onToggleScroll={handleToggleScroll}
                sharingLevel={"editor"}
                {...props}
              />)
            ))}
          </ul>
        </>
      )}
      <div ref={props.listEnd}></div>
    </div>
  );
}

export default HomeContents;
