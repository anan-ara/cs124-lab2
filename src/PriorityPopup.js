import "./PriorityPopup.css";
import PriorityTab from "./PriorityTab.js";
import TabList from "./TabList.js";
import { useEffect, useState, useRef } from "react";

function PriorityPopup(props) {
  const start = useRef();
  const end = useRef();

  useEffect(() => {
    start.current.focus();
  });

  const lowPriorityOptions = ["💤", "🤖", "🥶", "😴", "🔵", "🟦", "❄️", "💧", "💎"];
  const medPriorityOptions = ["⚠️", "😃", "☀️", "🌙", "🟡", "🟨", "⚡️", "✨", "⭐️"];
  const highPriorityOptions = ["🔥", "👹", "💢", "❗️", "🔴", "🟥", "🆘", "🧨", "🤬"];

  return (
    <TabList
        start={start}
        end={end}
        lowPriorityIcon={props.lowPriorityIcon}
        medPriorityIcon={props.medPriorityIcon}
        highPriorityIcon={props.highPriorityIcon}
        onTogglePriorityPopup={props.onTogglePriorityPopup}
        priorityToAria={props.priorityToAria}
        >
      <PriorityTab
        start={start}
        end={end}
        key={"Low" }
        iconOptions={lowPriorityOptions}
        currentIcon={props.lowPriorityIcon}
        onChangeIcon={props.setLowPriorityIcon}
        priorityText={"Low" + props.lowPriorityIcon}
      aria-label={props.priorityToAria[0] + " tab"}
      />
      <PriorityTab
        start={start}
        end={end}
        key={"Med"}
        iconOptions={medPriorityOptions}
        currentIcon={props.medPriorityIcon}
        onChangeIcon={props.setMedPriorityIcon}
        priorityText={"Med" + props.medPriorityIcon}
        aria-label={props.priorityToAria[1] + " tab"}

      />
      <PriorityTab
        start={start}
        end={end}
        key={"High"}
        iconOptions={highPriorityOptions}
        currentIcon={props.highPriorityIcon}
        onChangeIcon={props.setHighPriorityIcon}
        priorityText={"High" + props.highPriorityIcon}
        aria-label={props.priorityToAria[2] + " tab"}

      />
    </TabList>
  );
}

export default PriorityPopup;
