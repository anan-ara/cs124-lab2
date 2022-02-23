import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Priority is 0 for zzz, 2 for flames
let initialData = [
  {text:"Call Mom", priority:0, checked:false},
  {text:"john grism book thing and lots of text for a really long list item", priority:2, checked:true},
  {text:"workout", priority:2, checked:false},
  {text:"take vitamins", priority:1, checked:true},
  {text:"Ask Prof Rhodes about css file precedence", priority:2, checked:true},
  {text:"Ask Prof Rhodes about global variable", priority:2, checked:true},
  {text:"Resize elements", priority:1, checked:true}

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