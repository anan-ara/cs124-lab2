import "./HiddenListsPopup.css"
import "./Popup.css";
import "./SharingPopup.css"
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
    className="popup hidden-list-popup sharing-popup"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          props.onToggleHiddenListsPopup();
        }
      }}
    >
      <div className="hidden-list-title sharing-title">Hidden Lists</div>
      <div className="hidden-lists-list editors-list">
        {/* If there are no hidden lists, say so, else show the hidden lists. */}
        {hiddenListsData.length == 0 ? (
          <div className="no-hidden not-shared">You have no hidden lists.</div>
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
    </div>
  );
}

export default HiddenListsPopup;
