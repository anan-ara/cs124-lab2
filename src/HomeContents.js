import "./HomeContents.css";
import "./Contents.css";
import ListItem from "./ListItem";
import { useState } from "react";

function HomeContents(props) {
  const [scroll, setScroll] = useState(true);

  function handleToggleScroll() {
    setScroll(!scroll);
  }

  return (
    <div id="home-contents" className={("contents").concat(scroll ? " scroll" : "").concat(props.isNarrow ? " small-width" : "")}>
      {props.loading ? (
        <div className={"empty"}>Loading...</div>
      ) : (
        <>
          {props.ownerData.length === 0 && props.editorData.length === 0 && (
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
                viewers={e.viewers}
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
                checked={e.checked}
                total={e.total}
                complete={e.complete}
                editors={e.editors}
                viewers={e.viewers}
                key={e.id}
                id={e.id}
                owner={e.owner}
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
