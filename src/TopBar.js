import "./TopBar.css";
import "./Button.css";
import MainMenuToggle from "./MainMenuToggle";
import ListMainMenu from "./ListMainMenu";
import HomeMainMenu from "./HomeMainMenu";
import BackButton from "./BackButton"
import Backdrop from "./Backdrop";
import { useState } from "react";
import SortSelector from "./SortSelector";
import SearchBar from "./SearchBar";

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
        {!props.homeScreen && <BackButton onBackButton={props.onShowHome}/>}
        <div id="top_bar_title">{props.title}</div>
        {/* Make search bar show up in top bar when not narrow width on home screen  */}
        {!props.isNarrow && props.homeScreen && <SearchBar
      filter={props.filter}
      setFilter={props.setFilter}
      />}
        {props.isWide && props.homeScreen && <SortSelector
            dropDown={props.sortDropDown}
            onSelectSortType={
              sortOption => {
              props.onChangeSortType(sortOption);
              props.onToggleDropdown();
              }
            }
            currentSortType={props.sortType}
            homeScreen={props.homeScreen}
          />}
        <MainMenuToggle onToggleDropdown={handleDropDown} />
        {dropDown ? (
          <>
            <Backdrop onClickBackdrop={handleDropDown} />
            {props.homeScreen ? 
            <HomeMainMenu
              dropDown={dropDown}
              onToggleDropdown={handleDropDown}
              {...props}
            />
            :
            <ListMainMenu
              dropDown={dropDown}
              onToggleDropdown={handleDropDown}
              {...props}
            />
            }
          </>
        ) : null}
      </div>
    </>
  );
}

export default TopBar;
