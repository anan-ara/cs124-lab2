import "./DeleteListPopup.css";
import "./Popup.css";
import { useRef } from "react";
import HiddenListItem from "./HiddenListItem";

function HiddenListsPopup(props) {
  const start = useRef();
  const end = useRef();

  let hiddenListsData = [];
  if (props.editorData && props.usersData) {
    hiddenListsData = props.editorData.filter((item) =>
      props.usersData.hiddenLists.includes(item.id)
    );
  }

  return (
    <div
      className="popup delete-list-popup"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          props.onToggleHiddenListsPopup();
        }
      }}
    >
      <div className="delete-explanation">Hidden Lists</div>
      {/* If there are no hidden lists, say so, else show the hidden lists. */}
      {hiddenListsData.length == 0 ? (
        <span>You have no hidden lists.</span>
      ) : (
        <ul>
          {hiddenListsData.map((listData) => (
            <HiddenListItem
              hiddenListText={listData.text}
              hiddenListId={listData.id}
              onRemoveHiddenListId={props.onRemoveHiddenListId}
            />
          ))}
        </ul>
      )}
    </div>
    // TODO: maybe add OK, cancel buttons?
  );
}

export default HiddenListsPopup;
