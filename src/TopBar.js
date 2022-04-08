import "./TopBar.css";
import "./Button.css";
import MainMenuToggle from "./MainMenuToggle";
import MainMenu from "./MainMenu";
import BackButton from "./BackButton"
import Backdrop from "./Backdrop";
import { useState } from "react";
import SortSelector from "./SortSelector";

function TopBar(props) {
  // Main drop down
  const [dropDown, setDropDown] = useState(false);
  function handleDropDown() {
    setDropDown(!dropDown);
  }

  // Sort drop down
  const [sortDropDown, setSortDropDown] = useState(false);
  function handleSortDropDown() {
    setSortDropDown(!sortDropDown);
  }

  return (
    <>
      <div id="top_bar">
        <BackButton onBackButton={props.onShowHome}/>
        <div id="app_title">Todos</div>
        <MainMenuToggle onToggleDropdown={handleDropDown} />
        {/* Conditionally show the drop down and backdrop  */}
        {dropDown ? (
          <>
            <Backdrop onClickBackdrop={handleDropDown} />
            <MainMenu
              dropDown={dropDown}
              onToggleDropdown={handleDropDown}
              {...props}
              // onDeleteCompleted={props.onDeleteCompleted}
            />
          </>
        ) : null}
      </div>
    </>
  );
}

export default TopBar;
