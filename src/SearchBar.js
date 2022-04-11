import "./SearchBar.css";

function SearchBar(props) {
    // TODO: Placeholder text doesn't show up because we always have a value field. Figure out how to get around this maybe?
    return <input
        id="search_bar"
        type="text"
        placeholder="Search..."
        // value={props.filter}
        onChange={e => props.setFilter(e.target.value)}
      />;
}

export default SearchBar;