import "./SortSelector.css";

function SortSelector(props) {
  let SORT_TYPE_TEXT_DICT = {}
  if (props.homeScreen) {
    SORT_TYPE_TEXT_DICT = {
      created: "Creation",
      text: "Name",
    };
  } else {
    SORT_TYPE_TEXT_DICT = {
      created: "Creation",
      priority: "Priority",
      text: "Name",
    };
  }

  return (
    <div id="sort-div">
      <label htmlFor="sort-types" className="selector-label-text">
        Sorting by:
      </label>
      <select
        name="sort-types"
        id="sort-types"
        onChange={(e) => props.onSelectSortType(e.currentTarget.value)}
        value={props.currentSortType}
      >
        {Object.keys(SORT_TYPE_TEXT_DICT).map((sortType) => (
          <option
            key={sortType}
            value={sortType}
          >
            {SORT_TYPE_TEXT_DICT[sortType]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortSelector;
