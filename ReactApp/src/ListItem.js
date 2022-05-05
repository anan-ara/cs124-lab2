import "./ListItem.css";
import "./Item.css";
import SubMenu from "./SubMenu";
import Backdrop from "./Backdrop";
import DeleteListPopup from "./DeleteListPopup";
import SubMenuToggle from "./SubMenuToggle";
import { useEffect, useState, useRef } from "react";
import EditTextPopup from "./EditTextPopup";

function ListItem(props) {
  const [dropDown, setDropDown] = useState(false);
  const [editable, setEditable] = useState(false);
  const [editListTextPopup, setEditListTextPopup] = useState(false);

  // Local text field before it is saved in database
  // const [text, setText] = useState(props.text);

  // Delete List Confirmation
  const [deleteListPopup, setDeleteListPopup] = useState(false);
  function handleDeleteListPopup() {
    setDeleteListPopup(!deleteListPopup);
  }

  function handleEditListTextPopup() {
    setEditListTextPopup(!editListTextPopup);
  }

  // reference to textArea
  const textArea = useRef();

  // reference to subMenuToggle button
  const subMenuToggle = useRef();

  function handleDropDown() {
    props.onToggleScroll();
    setDropDown(!dropDown);
  }

  // function handleStartRename() {
  //   setEditable(true);
  //   textArea.current.selectionStart = textArea.current.value.length;
  //   textArea.current.selectionEnd = textArea.current.value.length;
  //   textArea.current.focus();
  // }

  // function handleFinishRename() {
  //   if (text === "") {
  //     props.onDeleteList(props.id);
  //   } else {
  //     // setEditable(false);
  //     props.onChangeText(props.id, text);
  //   }
  // }


  function getToggleLocation() {
    const rect = subMenuToggle.current.getBoundingClientRect();
    return rect.top;
  }

  // Called on every rerender
  useEffect(() => {
    // This squishes down the textarea box
    textArea.current.style.height = "5px";
    // This calculates the length of the scrollbar and sets that as the height of the textarea
    textArea.current.style.height = textArea.current.scrollHeight - 3 + "px";
  });

  return (
    <li className="item">
      <textarea
        value={props.text}
        className="item-text-area"
        ref={textArea}
        htmlFor={props.id}
        //onChange={(e) => setText(e.target.value)}
        // onKeyDown={(e) => {
        //   if (e.key === "Enter") {
        //     editable ? handleFinishRename() : props.onSelectList(props.id);
        //   }
        // }}
        //onBlur={handleFinishRename}
        readOnly={!editable}
        onClick={() => {
          if (!editable) {
            props.onSelectList(props.id);
          }
        }}
        aria-label={"List " + props.text}
      />
      {props.isNarrow || (
        <div className="complete-count"
        aria-label={"Completion counter for " + props.text}>
          {props.complete + " / " + props.total + " completed"}
        </div>
      )}
      <SubMenuToggle
        onToggle={handleDropDown}
        buttonLocation={subMenuToggle}
        accessibleName={"List ".concat(props.text)}
      />
      {dropDown && (
        <>
          <Backdrop onClickBackdrop={handleDropDown} />
          <SubMenu
            onHandleDropDown={handleDropDown}
            onRename={handleEditListTextPopup}
            top={getToggleLocation()}
            bottomBarLocation={props.getBottomBarLocation()}
            onDelete={handleDeleteListPopup}
            accessibleName={"List ".concat(props.text)}
            {...props}
          />
        </>
      )}
      {deleteListPopup && (
        <>
          <Backdrop onClickBackdrop={handleDeleteListPopup} />
          <DeleteListPopup onClosePopup={handleDeleteListPopup} {...props} />
        </>
      )}
      {editListTextPopup && (
        <>
          <Backdrop onClickBackdrop={handleEditListTextPopup} />
          <EditTextPopup
            // onAddList={addNewList}
            onClosePopup={handleEditListTextPopup}
            // onChangeText={props.}
            {...props}
          />
        </>
      )}
    </li>
  );
}

export default ListItem;
