import { useEffect, useState, useRef } from "react";

function EditorItem(props) {
  return (
    <li className="editor">
      {props.editor}
      <button onClick={() => props.onRemoveEditor(props.id, props.editor)}>Unshare</button>
    </li>
  );
}

export default EditorItem;
