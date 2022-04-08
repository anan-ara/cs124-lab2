import "./SortSelector.css";
import "./Dropdown.css";
// import "./TopBarMenu.css";

function SortSelector(props) {
  const SORT_TYPE_TEXT_DICT = {"created":"Creation", "priority":"Priority", "text":"Name"};

  return (
    <div id="sort-div">
      <label htmlFor="sort-types" className="sorting_text">Sorting by:</label>
      <select
        name="sort-types"
        id="sort-types"
        onChange={(e) => props.onSelectSortType(e.currentTarget.value)}
      >
        {Object.keys(SORT_TYPE_TEXT_DICT).map((sortType) => (
          <option value={sortType}>{SORT_TYPE_TEXT_DICT[sortType]}</option>
        ))}
      </select>
    </div>
  );
}

export default SortSelector;
