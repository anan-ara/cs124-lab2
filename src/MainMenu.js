
function MainMenu() {
    return (
          <div className="top_bar_icon_div">
           <div className="dropdown">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list dropbtn" id="top-menu-icon" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
              <div className="dropdown-content main-menu">
                  <div className="delete-completed bottom-line delete">Delete Completed</div>
                  <div>Change Priority Emoji</div>
              </div>
            </div>
            <label>Menu</label>
          </div>
    );
  }
  
  export default MainMenu;