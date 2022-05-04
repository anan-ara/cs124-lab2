import { useEffect, useState, useRef } from "react";

function EditorItem(props) {
  return (
    <li className="editor">
      {props.editor}
    </li>
  );
}

export default EditorItem;
