import "./Selector.css";

function CompletedSelector(props) {

  const COMPLETED_TYPES = ["All", "Incomplete"]

  return (
    <div>
      <label htmlFor="completed-types" className="selector-label-text">
        Show:
      </label>
      <select
        name="completed-types"
        id="completed-types"
        onChange={props.onToggleCompleted}
        value={props.currentCompletedType}
      >
        {COMPLETED_TYPES.map((completedType) => (
          <option
            key={completedType}
            value={completedType}
          >
            {completedType}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CompletedSelector;
