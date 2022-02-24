import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Priority is 0 for zzz, 2 for flames
let initialData = [
  {text:"Call Mom", priority:0, checked:false, id:1},
  {text:"john grism book thing and lots of text for a really long list item", priority:2, checked:true, id:2},
  {text:"make checkboxes work", priority:2, checked:false},
  {text:" make popups close when click elsewhere", priority:0, checked:true},
  {text:" plus button work and clear text bottom bar", priority:1, checked:true},
  {text:"sorting + filter mechanism", priority:2, checked:true},
  {text:"menu actions", priority:1, checked:true}
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