
import "./SubMenu.css"
import "./Dropdown.css";
function SubMenu(props) {
    return  <div className="dropdown">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list dropbtn" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
                <div className="dropdown-content sub-menu">
                    <div className="bottom-line">Rename</div>
                    <div className="delete bottom-line">Delete</div>
                    <div className="priority-adjust">
                        <div className={props.priority === 0 ? "activated" : ""}>
                            🔥
                        </div>
                        <div className={props.priority === 1 ? "activated" : ""}>
                            ⚠️
                        </div>
                        <div className={props.priority === 2 ? "activated" : ""}>
                            💤
                        </div>
                    </div>
                </div>
            </div>;
}



export default SubMenu