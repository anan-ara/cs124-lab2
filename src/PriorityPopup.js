import "./PriorityPopup.css";
import PriorityTab from "./PriorityTab.js";
import TabList from "./TabList.js";

function PriorityPopup(props) {

  const lowPriorityOptions = ["💤", "🤖", "🥶", "😴", "🔵", "🟦", "❄️", "💧", "💎"];
  const medPriorityOptions = ["⚠️", "😃", "☀️", "🌙", "🟡", "🟨", "⚡️", "✨", "⭐️"];
  const highPriorityOptions = ["🔥", "👹", "💢", "❗️", "🔴", "🟥", "🆘", "🧨", "🤬"];

  return (
    <TabList
        lowPriorityIcon={props.lowPriorityIcon}
        medPriorityIcon={props.medPriorityIcon}
        highPriorityIcon={props.highPriorityIcon}
    >
      <PriorityTab
        key={"Low" }
        iconOptions={lowPriorityOptions}
        currentIcon={props.lowPriorityIcon}
        onChangeIcon={props.setLowPriorityIcon}
        priorityText={"Low" + props.lowPriorityIcon}
      />
      <PriorityTab
        key={"Med"}
        iconOptions={medPriorityOptions}
        currentIcon={props.medPriorityIcon}
        onChangeIcon={props.setMedPriorityIcon}
        priorityText={"Med" + props.medPriorityIcon}
      />
      <PriorityTab
        key={"High"}
        iconOptions={highPriorityOptions}
        currentIcon={props.highPriorityIcon}
        onChangeIcon={props.setHighPriorityIcon}
        priorityText={"High" + props.highPriorityIcon}
      />
    </TabList>
  );
}

export default PriorityPopup;
