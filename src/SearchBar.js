import "./SearchBar.css";

function SearchBar(props) {
    return <input
        type="text"
        placeholder="Search..."
        value={props.filter}
        onChange={e => props.setFilter(e.target.value)}
      />;
}

export default SearchBar;