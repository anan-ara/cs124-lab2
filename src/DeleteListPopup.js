import "./DeleteListPopup.css";
import "./Popup.css";

function DeleteListPopup(props) {

  return (
    <div className="popup delete-list-popup">
      <div>Are you sure you want to delete list {props.text}?</div>
      <div className="cancel-ok">
        <button
          // className={(props.showCompleted ? "activated " : "") + "radio-button"}
          onClick={props.onClosePopup}
        >
          Cancel
        </button>
        <button
          // className={(props.showCompleted ? "activated " : "") + "radio-button"}
          onClick={() => {
            props.onDeleteList(props.id);
            props.onClosePopup();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default DeleteListPopup;
