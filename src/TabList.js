import { Tab } from "./Tab";
import { useState } from "react";
import "./TabList.css";

function TabList(props) {
  const [activeTab, setActiveTab] = useState(props.children[0].key);
  return (
    <div className="priority_popup priority-content">
      <ol className="tab-list">
        {props.children.map((child) => (
          <Tab
            key={child.key}
            label={child.key}
            priorityText={child.priorityText}
            activeTab={activeTab}
            onClickTab={(key) => setActiveTab(key)}
        lowPriorityIcon={props.lowPriorityIcon}
        medPriorityIcon={props.medPriorityIcon}
        highPriorityIcon={props.highPriorityIcon}
          />
        ))}
      </ol>
      {props.children.map((child) => activeTab === child.key && child)}
    </div>
  );
}

export default TabList;
