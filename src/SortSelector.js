import "./SortSelector.css";
import "./Dropdown.css";

function SortSelector(props) {
  const SORT_TYPE_TEXT_DICT = {
    created: "Creation",
    priority: "Priority",
    text: "Name",
  };

  return (
    <div id="sort-div">
      <label htmlFor="sort-types" className="sorting_text">
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
            // selected={sortType === props.currentSortType ? "selected" : ""}
          >
            {SORT_TYPE_TEXT_DICT[sortType]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortSelector;
