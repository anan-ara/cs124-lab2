import "./SharingPopup.css";
import "./Popup.css";
import { useState, useEffect, useRef } from "react";
import CreatableSelect from "react-select/creatable";
import EditorItem from "./EditorItem";

function SharingPopup(props) {
  const start = useRef();
  const end = useRef();

  const components = {
    DropdownIndicator: null,
  };

  const [inputValue, setInputValue] = useState("");
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

  useEffect(() => {
    start.current.focus();
  });

  return (
    <div
      className="popup sharing-popup"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          props.onClosePopup();
        }
      }}
    >
      <div className="sharing-title">List Sharing</div>
      <div className="share-bar">
        <CreatableSelect
          className="multi-select"
          ref={start}
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
      </div>
      <ul>
        {props.editors.map((editor) => (
          <EditorItem editor={editor} {...props} />
        ))}
      </ul>
    </div>
  );
}

export default SharingPopup;
