import "./PriorityTab.css";
function PriorityTab(props) {
  // TODO: don't hardcode end of array
  return (
    <div className="priority_grid">
      {props.iconOptions.map((emoji, index) =>
        index === 8 ? (
          <button
            ref={props.end}
            className={emoji === props.currentIcon ? "activated" : ""}
            onClick={() => props.onChangeIcon(emoji)}
            key={emoji}
            onKeyDown={(e) => {
              if (e.key === "Tab" && !e.shiftKey) {
                e.preventDefault();
                props.start.current.focus();
              }
            }}
          >
            {emoji}
          </button>
        ) : (
          <button
            className={emoji === props.currentIcon ? "activated" : ""}
            onClick={() => props.onChangeIcon(emoji)}
            key={emoji}
          >
            {emoji}
          </button>
        )
      )}
    </div>
  );
}

export default PriorityTab;
