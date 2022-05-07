// import { useEffect, useState, useRef } from "react";

function HiddenListItem(props) {

  return (
    <li key={props.hiddenListId}>
      {props.hiddenListText}
      <button onClick={() => props.onRemoveHiddenListId(props.hiddenListId)}>Show</button>
    </li>
  );
}

export default HiddenListItem;
