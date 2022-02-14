import {initialData} from "./index.js";
import "./Contents.css"
import ListItem from "./ListItem"

function Contents() {
  return (
    <div id="contents">
        <ul>
          {
            // TODO: add key
            [
              {text:"Call Mom", priority:0, checked:false},
              {text:"john grism book thing and lots of text for a really long list item", priority:2, checked:true},
              {text:"workout", priority:2, checked:false},
              {text:"take vitamins", priority:1, checked:true},
              {text:"Ask Prof Rhodes about css file precedence", priority:2, checked:true},
              {text:"Ask Prof Rhodes about global variable", priority:2, checked:true},
              {text:"Resize elements", priority:1, checked:true}
            
            ]
            .map(e => <ListItem text={e.text} priority={e.priority} checked={e.checked}/>)
          }
        </ul>
    </div>
  );
}

export default Contents;