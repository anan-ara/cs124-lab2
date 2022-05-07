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
  const [inputSave, setInputSave] = useState("");

  function handleInputChange(inputValue) {
    setInputValue(inputValue);
  }

  function handleChange(value) {
    console.log("handling change");
    setValue(value);
  }

  function addValue(newValue) {
    setValue([...value, { label: newValue, value: newValue }]);
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
                addValue(inputValue);
              }
            } else if (e.key === "Tab" && e.shiftKey) {
              e.preventDefault();
              end.current.focus();
            } else if (e.key === "Escape") {
              e.preventDefault();
              props.onClosePopup();
            }
          }}
          onBlur={() => setInputSave(inputValue)}
          components={components}
          menuIsOpen={false}
          placeholder="Add emails here..."
        />
        <button
          className="share-button"
          onClick={() => {
            if (inputSave === "") {
              console.log("got here");
              props.onAddEditors(props.id, value);
              setValue([]);
            } else {
              addValue(inputSave);
            }
          }}
        >
          Share
        </button>
      </div>
      <div className="editors-list">
        {props.editors.length > 0 ? (
          <ul>
            {props.editors.map((editor, index) => (
              <EditorItem
                editor={editor}
                lastOne={props.editors.length - 1 === index}
                end={end}
                start={start}
                {...props}
              />
            ))}
          </ul>
        ) : (
          <div className="not-shared">
            The list is currently not shared with anyone. To share, enter their
            email in the field above.
          </div>
        )}
      </div>
    </div>
  );
}

export default SharingPopup;
