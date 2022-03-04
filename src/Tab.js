import './Tab.css';

export function Tab(props) {
    const classNames = ["tab-list-item"];
    const labelToIcon = {
        "Low": props.lowPriorityIcon,
        "Med": props.medPriorityIcon,
        "High": props.highPriorityIcon,
    }
    if (props.activeTab === props.label) {
        classNames.push("tab-list-active");
    }
    return <li className={classNames.join(" ")}
               onClick={() => props.onClickTab(props.label)}>
        {props.label + " " + labelToIcon[props.label]}
    </li>
}
