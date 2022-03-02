import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Priority is 0 for zzz, 2 for flames
let initialData = [
  {text:"menu actions", priority:1, checked:true, id:6},
  {text:"Implement choose emoji", priority:2, checked:false, id:6},
  {text:"remove white space on bottom", priority:1, checked:false, id:9},
  {text:"Change cursor shape depending on hover location", priority:2, checked:false, id:10},
  {text:"Figure out a good metric to use for defining distances", priority:2, checked:false, id:11},
  {text:"john grism book thing and lots of text for a really long list item", priority:0, checked:true, id:2},
];

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

export {initialData};