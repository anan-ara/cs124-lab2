import './todo.css';
import TopBar from './TopBar';
import BottomBar from './BottomBar'
import Contents from './Contents'
import { useState } from 'react';
import { initialData } from '.';


function App() {
  let [todos, setTodos] = useState(initialData);

  function addNewTodo(name) {
    // TODO: change to not be date.now
    setTodos(todos.concat([{text:name, priority:0, checked:false, id:Date.now()}]));
  }
 
  return (
    <>
    <TopBar />
    <Contents data={todos}/>
    <BottomBar onTextInput={addNewTodo}/>
    </>
  );
}

export default App;
