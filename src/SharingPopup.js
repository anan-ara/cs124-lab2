import "./DeleteListPopup.css";
import "./Popup.css";
import { useState, useEffect, useRef } from "react";
import CreatableSelect from "react-select/creatable";
import EditorItem from "./EditorItem"

function SharingPopup(props) {
  const start = useRef();
  const end = useRef();

  const components = {
    DropdownIndicator: null,
  };

  const [inputValue, setInputValue] = useState("falskdj");
  const [value, setValue] = useState([]);

  function handleInputChange(inputValue) {
    setInputValue(inputValue);
  }

  function handleChange(value) {
    console.log("handling change");
    setValue(value);
  }

  function addValue() {
    setValue([...value, { label: inputValue, value: inputValue }]);
    setInputValue("");
  }

  // console.log(props.editors)

  return (
    <div
      className="popup delete-list-popup"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          props.onClosePopup();
        }
      }}
    >
      <div className="delete-explanation">SHARINGGG</div>
      <CreatableSelect
        isClearable
        isMulti
        inputValue={inputValue}
        onInputChange={(inputValue) => setInputValue(inputValue)}
        value={value}
        onChange={(value) => handleChange(value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (inputValue === "") {
              props.onAddEditors(props.id, value);
              setValue([]);
            } else {
              addValue();
            }
          }
        }}
        components={components}
        menuIsOpen={false}
        placeholder="Add emails here..."
      />
      <button
        onClick={() => {
          props.onAddEditors(props.id, value);
          setValue([]);
        }}
      >
        Share
      </button>
      <ul>
        {props.editors.map((editor) => (
          <EditorItem editor={editor} {...props} />
        ))}
      </ul>
      {/* <div className="delete-list-name">{props.text}?</div>
      <div className="cancel-ok">
        <button
          ref={start}
          onClick={props.onClosePopup}
          onKeyDown={(e) => {
            if (e.key === "Tab" && e.shiftKey) {
              e.preventDefault();
              end.current.focus();
            }
          }}
        >
          Cancel
        </button>
        <button
          ref={end}
          onClick={() => {
            props.onDeleteList(props.id);
            props.onClosePopup();
          }}
          onKeyDown={(e) => {
            if (e.key === "Tab" && !e.shiftKey) {
              e.preventDefault();
              start.current.focus();
            }
          }}
        >
          OK
        </button>
      </div> */}
    </div>
  );
}

export default SharingPopup;
