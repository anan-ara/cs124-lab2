import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Priority is 0 for zzz, 2 for flames
let initialData = [
  {text:"Type in \"Add new item...\" to add a new item to the task list!", priority:0, checked:false, id:10},
  {text:"Click the checkbox to mark a task as complete or incomplete", priority:0, checked:false, id:11},
  {text:"Click the three dots to see further options, such as priority assignment", priority:1, checked:true, id:12},
  {text:"Use the toggles at the top to change your view", priority:2, checked:false, id:13},
];

let initialLowPriorityIcon = "💤";
let initialMedPriorityIcon = "⚠️";
let initialHighPriorityIcon = "🔥";

let lowPriorityOptions = ["💤", "🤖", "🥶", "💙", "🔵", "🟦", "❄️", "💧", "💎"];
let medPriorityOptions = ["⚠️", "😃", "☀️", "💛", "🟡", "🟨", "⚡️", "✨", "⭐️"];
let highPriorityOptions = ["🔥", "👹", "💢", "❤️", "🔴", "🟥", "🆘", "🧨", "🤬"];

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export {initialData, initialLowPriorityIcon, initialMedPriorityIcon, initialHighPriorityIcon, lowPriorityOptions, medPriorityOptions, highPriorityOptions};