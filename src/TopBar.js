import "./TopBar.css";
import "./Button.css";
import MainMenuToggle from "./MainMenuToggle";
import ListMainMenu from "./ListMainMenu";
import HomeMainMenu from "./HomeMainMenu";
import BackButton from "./BackButton";
import Backdrop from "./Backdrop";
import { useState } from "react";
// import SortSelector from "./SortSelector";

function TopBar(props) {
  // Main drop down
  const [dropDown, setDropDown] = useState(false);
  function handleDropDown() {
    setDropDown(!dropDown);
  }

  // Sort drop down
  const [sortDropDown, setSortDropDown] = useState(false);
  // function handleSortDropDown() {
  //   setSortDropDown(!sortDropDown);
  // }

  return (
    <>
      <div id="top_bar">
        {!props.homeScreen && <BackButton onBackButton={props.onShowHome} />}
        <div id="app_title">{props.title}</div>
        <MainMenuToggle onToggleDropdown={handleDropDown} />
        {dropDown && (
          <>
            <Backdrop onClickBackdrop={handleDropDown} />
            {props.homeScreen ? (
              <HomeMainMenu
                dropDown={dropDown}
                onToggleDropdown={handleDropDown}
                {...props}
              />
            ) : (
              <ListMainMenu
                dropDown={dropDown}
                onToggleDropdown={handleDropDown}
                {...props}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default TopBar;
