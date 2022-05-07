import "./EditorItem.css"
import "./HiddenListItem.css"
function HiddenListItem(props) {

  return (
    <li className="editor" key={props.hiddenListId}>
      <div className="list-text">{props.hiddenListText}</div>
      <button className="remove-user" onClick={() => props.onRemoveHiddenListId(props.hiddenListId)}>Show</button>
    </li>
  );
}

export default HiddenListItem;
