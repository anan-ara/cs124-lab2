import {initialData} from "./index.js";
import "./Contents.css"
import ListItem from "./ListItem"

function Contents() {
  return (
    <div id="contents">
        <ul>
          {
            // TODO: add key
            initialData
            .map(e => <ListItem text={e.text} priority={e.priority} checked={e.checked}/>)
          }
        </ul>
    </div>
  );
}

export default Contents;