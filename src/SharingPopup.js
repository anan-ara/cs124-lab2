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
  const [emailNotValid, setEmailNotValid] = useState("valid");

  function handleChange(value) {
    setValue(value);
  }

  // Regular expression from https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
  function validateEmail(email) {
    // return email.match(
    //   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // );
    return email.match(/\S+@\S+\.\S+/);
  }

  function addValue(newValue) {
    if (newValue === props.owner) {
      setEmailNotValid("adding owner");
    } else if (validateEmail(newValue)) {
      setEmailNotValid("valid");
      setValue([...value, { label: newValue, value: newValue }]);
    } else {
      setEmailNotValid("not valid");
    }
    setInputValue("");
  }

  useEffect(() => {
    if (props.sharingLevel === "owner") {
      start.current.focus();
    }
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
      <div className="extra-text">This list belongs to {props.owner}</div>
      {emailNotValid === "not valid" && (
        <div className="extra-text">Please enter a valid email address</div>
      )}
      {emailNotValid === "adding owner" && (
        <div className="extra-text">
          You cannot share the list with the owner of list
        </div>
      )}
      {props.sharingLevel === "owner" && (
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
                  setEmailNotValid(false);
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
                props.onAddEditors(props.id, value);
                setEmailNotValid(false);
                setValue([]);
              } else {
                addValue(inputSave);
              }
            }}
          >
            Share
          </button>
        </div>
      )}
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
