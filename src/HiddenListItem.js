// import { useEffect, useState, useRef } from "react";

function HiddenListItem(props) {
  return (
    <li>
      {props.hiddenListText}
      <button onClick={() => console.log("Showing list " + props.hiddenListId)}>Show</button>
    </li>
  );
}

export default HiddenListItem;
