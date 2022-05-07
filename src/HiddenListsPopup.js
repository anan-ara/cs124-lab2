import "./DeleteListPopup.css";
import "./Popup.css";
import {  useRef } from "react";
import HiddenListItem from "./HiddenListItem";
// import CreatableSelect from "react-select/creatable";
// import EditorItem from "./EditorItem"

function HiddenListsPopup(props) {
  const start = useRef();
  const end = useRef();

  let hiddenListsData = [];
  if (props.editorData && props.usersData) {
    hiddenListsData = props.editorData.filter((item) => props.usersData.hiddenLists.includes(item.id));
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
      <ul>
        {hiddenListsData.map((listData) => <HiddenListItem hiddenListText={listData.text} hiddenListId={listData.id} onRemoveHiddenListId={props.onRemoveHiddenListId}/>)}
        {hiddenListsData.length == 0 && <span>You have no hidden lists.</span>}
      </ul>
    </div>
    // TODO: maybe add OK, cancel buttons?
  );
}

export default HiddenListsPopup;
