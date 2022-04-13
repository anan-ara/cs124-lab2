import { Tab } from "./Tab";
import { useState } from "react";
import "./TabList.css";
import "./Popup.css";

function TabList(props) {
  const [activeTab, setActiveTab] = useState(props.children[0].key);
  return (
    <div
      className="priority_popup popup"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          props.onTogglePriorityPopup();
        }
      }}
    >
      <div className="tab-list">
        {props.children.map((child, index) => (
          <Tab
            start={props.start}
            end={props.start}
            index={index}
            key={child.key}
            label={child.key}
            priorityText={child.priorityText}
            activeTab={activeTab}
            onClickTab={(key) => setActiveTab(key)}
            lowPriorityIcon={props.lowPriorityIcon}
            medPriorityIcon={props.medPriorityIcon}
            highPriorityIcon={props.highPriorityIcon}
            priorityToAria={props.priorityToAria}
          />
        ))}
      </div>
      {props.children.map((child, index) => activeTab === child.key && child)}
    </div>
  );
}

export default TabList;
