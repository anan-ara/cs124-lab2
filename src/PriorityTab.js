import "./PriorityTab.css";
function PriorityTab(props) {
  return (
    <div className="priority_grid">
      {props.iconOptions.map((emoji) => (
        <button
          className={emoji === props.currentIcon ? "activated" : ""}
          onClick={() => props.onChangeIcon(emoji)}
          key={emoji}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}

export default PriorityTab;
