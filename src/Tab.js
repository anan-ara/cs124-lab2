import "./Tab.css";

export function Tab(props) {
  const classNames = ["tab-list-item"];
  const labelToIcon = {
    Low: props.lowPriorityIcon,
    Med: props.medPriorityIcon,
    High: props.highPriorityIcon,
  };
  if (props.activeTab === props.label) {
    classNames.push("tab-list-active");
  }
  return props.index === 0 ? (
    <button
      className={classNames.join(" ")}
      ref={props.start}
      onClick={() => props.onClickTab(props.label)}
      onKeyDown={(e) => {
        if (e.key === "Tab" && e.shiftKey) {
          e.preventDefault();
        //   props.end.current.focus();
        }
      }}
      aria-label={"Choose " + props.priorityToAria[props.index] + " icon tab"}
    >
      {props.label + " " + labelToIcon[props.label]}
    </button>
  ) : (
    <button
      className={classNames.join(" ")}
      onClick={() => props.onClickTab(props.label)}
      aria-label={"Choose " + props.priorityToAria[props.index] + " icon tab"}
    >
      {props.label + " " + labelToIcon[props.label]}
    </button>
  );
}
