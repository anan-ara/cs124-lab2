import "./DeleteListPopup.css";
import "./Popup.css";
import { useState, useEffect, useRef } from "react";
import CreatableSelect from "react-select/creatable";

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

  // useEffect(() => {
  //   start.current.focus();
  // });

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
        onInputChange={inputValue => setInputValue(inputValue)}
        components={components}
        menuIsOpen={false}
      />
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
