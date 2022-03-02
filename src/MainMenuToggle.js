function MainMenuToggle(props) {
    return (
      <button className="top_bar_icon_div" onClick={props.onToggleDropdown}>
          <svg
          xmlns="http://www.w3.org/2000/svg"
          className="bi bi-list dropbtn"
          id="top-menu-icon"
          viewBox="0 0 16 16"
        >
          <path
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
        <label>Menu</label>
      </button>
    );
  }
  
  export default MainMenuToggle;
  