import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Priority is 0 for zzz, 2 for flames
let initialData = [
  {text:"ASK Prof Rhodes: Implement choose emoji (make choices)", priority:2, checked:false, id:7},
  {text:"User testing/writeup", priority:1, checked:false, id:12},
  {text:"enter on text field doesn't make text field lose focus", priority:1, checked:false, id:1},
  {text:"animation for after adding list item (scroll to bottom) and marking item as complete when in hide completed stage (slowly make item disappear)", priority:0, checked:false, id:1001},
  {text:"john grism book thing and lots of text for a really long list item", priority:0, checked:true, id:2},
];

let initialLowPriorityIcon = "💤";
let initialMedPriorityIcon = "⚠️";
let initialHighPriorityIcon = "🔥";

let lowPriorityOptions = ["🤖", "🤖", "🤖", "🤖", "🤖", "🤖", "🤖", "🤖", "🤖"];
let medPriorityOptions = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "🤣"];
let highPriorityOptions = ["🤬", "🤬", "🤬", "🤬", "🤬", "🤬", "🤬", "🤬", "🤬"];

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