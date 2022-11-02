import "./HomeBottomBar.css";

function HomeBottomBar(props) {
  return (
    <div id="home-bottom-bar" ref={props.bottomBarRef}>
      <button
        onClick={props.handleAddList}
      >
        Create New List
      </button>{" "}
    </div>
  );
}

export default HomeBottomBar;
