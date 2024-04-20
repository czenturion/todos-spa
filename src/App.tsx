import React, { useState } from 'react'
import './App.css'
import TodoInput from "./components/todo-input/todo-input"

const App = () =>  {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  return (
    <div className="App">
      <div className="background"></div>
      <div className="card">
        <TodoInput/>
      </div>
    </div>
  )
}

export default App
