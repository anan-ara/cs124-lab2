import "./PriorityPopup.css";
import PriorityTab from "./PriorityTab.js";
import TabList from "./TabList";

function PriorityPopup(props) {

  return (

    <TabList id="priority_popup">
      <PriorityTab
      key={0}
        iconOptions={props.lowPriorityOptions}
        currentIcon={props.lowPriorityIcon}
        onChangeIcon={props.onChangeLowPriorityIcon}
        priorityText={"Low" + props.lowPriorityIcon}
      />
      <PriorityTab
      key={1}
        iconOptions={props.medPriorityOptions}
        currentIcon={props.medPriorityIcon}
        onChangeIcon={props.onChangeMedPriorityIcon}
        priorityText={"Med" + props.medPriorityIcon}
      />
      <PriorityTab
      key={2}
        iconOptions={props.highPriorityOptions}
        currentIcon={props.highPriorityIcon}
        onChangeIcon={props.onChangeHighPriorityIcon}
        priorityText={"High" + props.highPriorityIcon}
      />
    </TabList>
  );
}

export default PriorityPopup;