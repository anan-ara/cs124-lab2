import "./PriorityTab.css";
function PriorityTab(props) {
  return (
    <div className="priority_tab">
      <div>{props.priorityText}</div>
      <div className="priority_grid">
        {props.iconOptions.map((emoji) => (
          <button
            className={emoji === props.currentIcon ? "activated" : ""}
            // onClick={()=> console.log("hi")}
            onClick={() => props.onChangeIcon(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PriorityTab;
