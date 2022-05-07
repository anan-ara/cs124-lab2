import "./DeleteListPopup.css";
import "./Popup.css";
import {  useRef } from "react";
// import CreatableSelect from "react-select/creatable";
// import EditorItem from "./EditorItem"

function HiddenListsPopup(props) {
  const start = useRef();
  const end = useRef();

  // const components = {
  //   DropdownIndicator: null,
  // };

  // const [inputValue, setInputValue] = useState("falskdj");
  // const [value, setValue] = useState([]);

  // function handleInputChange(inputValue) {
  //   setInputValue(inputValue);
  // }

  // function handleChange(value) {
  //   console.log("handling change");
  //   setValue(value);
  // }

  // function addValue() {
  //   setValue([...value, { label: inputValue, value: inputValue }]);
  //   setInputValue("");
  // }

  // console.log(props.editors)


  let hiddenListsData = [];
  console.log("in HiddenListsPopup, editorData is", props.editorData, "usersData is", props.usersData)
  if (props.editorData && props.usersData) {
    hiddenListsData = props.editorData.filter((item) => props.usersData.hiddenLists.includes(item.id));
  }

  return (
    <div
      className="popup delete-list-popup"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          props.onToggleHiddenListsPopup();
        }
      }}
    >
      <div className="delete-explanation">Hidden Lists</div>
      {/* <CreatableSelect
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
      /> */}
      {/* <button
        onClick={() => {
          props.onAddEditors(props.id, value);
          setValue([]);
        }}
      >
        Share
      </button> */}
      <ul>
        <li>Hidden List!!!</li>
        {hiddenListsData.map((listData) => listData.text)}
      </ul>
    </div>
    // TODO: maybe add OK, cancel buttons?
  );
}

export default HiddenListsPopup;
