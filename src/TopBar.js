import "./TopBar.css"
import PriorityToggle from "./PriorityToggle";
import CompletedToggle from "./CompletedToggle";
import MainMenu from "./MainMenu";

function TopBar() {
  return (
    <div id="top_bar"> 
        <PriorityToggle/>
        <CompletedToggle/>
        <MainMenu/>
    </div>
  );
}

export default TopBar;