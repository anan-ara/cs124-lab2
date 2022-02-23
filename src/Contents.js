import {initialData} from "./index.js";
import "./Contents.css"
import ListItem from "./ListItem"

function Contents(props) {
  console.log("in Contents, props.data is" + props.data);
  return (
    <div id="contents">
        <ul>
          {
            props.data
            .map(e => <ListItem text={e.text} priority={e.priority} checked={e.checked} key={e.id}/>)
          }
        </ul>
    </div>
  );
}

export default Contents;