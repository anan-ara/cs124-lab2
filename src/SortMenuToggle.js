import "./SortMenuToggle.css";

function SortMenuToggle(props) {
    return (
      <button id="sort_menu_toggle" className="top_bar_icon_div sorting_text" onClick={props.onToggleDropdown}>
          {props.sortType +  " ⌄"}
          {/* TODO pick from other possible down arrows (or can use an icon: ) ▼ ⌄ ˯  ˅ */}
      </button>
    );
  } 
  
  export default SortMenuToggle;
  