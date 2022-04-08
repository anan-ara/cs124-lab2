import "./PriorityPopup.css";
import PriorityTab from "./PriorityTab.js";
import TabList from "./TabList.js";

function PriorityPopup(props) {
  return (
    <TabList
        lowPriorityIcon={props.lowPriorityIcon}
        medPriorityIcon={props.medPriorityIcon}
        highPriorityIcon={props.highPriorityIcon}
    >
      <PriorityTab
        key={"Low" }
        iconOptions={props.lowPriorityOptions}
        currentIcon={props.lowPriorityIcon}
        onChangeIcon={props.setLowPriorityIcon}
        priorityText={"Low" + props.lowPriorityIcon}
      />
      <PriorityTab
        key={"Med"}
        iconOptions={props.medPriorityOptions}
        currentIcon={props.medPriorityIcon}
        onChangeIcon={props.setMedPriorityIcon}
        priorityText={"Med" + props.medPriorityIcon}
      />
      <PriorityTab
        key={"High"}
        iconOptions={props.highPriorityOptions}
        currentIcon={props.highPriorityIcon}
        onChangeIcon={props.setHighPriorityIcon}
        priorityText={"High" + props.highPriorityIcon}
      />
    </TabList>
  );
}

export default PriorityPopup;
