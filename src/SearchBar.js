import "./SearchBar.css";

function SearchBar(props) {
    return <input
        id="search_bar"
        type="text"
        placeholder="Search..."
        onChange={e => props.setFilter(e.target.value)}
      />
}

export default SearchBar;