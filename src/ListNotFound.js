import "./Verification.css";

function ListNotFound(props) {
  return (
    <>
      <div id="list-not-found" className="notice-popup popup">
        {props.shared ? "You no longer have access to this list." : "This list has been deleted in another session."}
        <button className="notice-button"
          onClick={props.onShowHome}
        >
          Return to Home
        </button>
      </div>
    </>
  );
}

export default ListNotFound;
