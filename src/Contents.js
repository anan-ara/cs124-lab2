import {initialData} from "./index.js";
import "./Contents.css"
import ListItem from "./ListItem"

function Contents(props) {
  console.log("in Contents, props.data is" + props.data);
  let listData = props.data;
  if (props.sortPriority) {
    // Do a deep copy of listData, then sort it by priority. 
    // a is first if it has a higher priority than a.
    listData = [...listData].sort((a, b) => (a.priority > b.priority) ? -1 : 1);
  }
  return (
    <div id="contents">
        <ul>
          {
            listData
            .map(e => <ListItem text={e.text} priority={e.priority} checked={e.checked} key={e.id}/>)
          }
        </ul>
    </div>
  );
}

export default Contents;