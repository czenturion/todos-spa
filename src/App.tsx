import React, { useEffect, useState } from 'react'
import './App.css'
import TodoInput from "./components/todo-input/todo-input"
import TodoList from "./components/todo-list/todo-list"

export type Task = {
  id: number
  task: string
  isCompleted: boolean
}

const App = () =>  {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState<string>('')

  const handleTaskAdd = (e: any) => {
    e.preventDefault()
    if (newTask) {
      const id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1
      setTasks([...tasks, {id, task: newTask, isCompleted: false}])
      setNewTask('')
    }
  }

  const handleTaskDelete = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleTaskComplete = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? {...task, isCompleted: !task.isCompleted} : task))
  }

  useEffect(() => {
    const oldTasks = localStorage.getItem('tasks')
    if (oldTasks) {
      setTasks(JSON.parse(oldTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <div className="App">
      <div className="background"></div>
      <div className="card">
        <TodoInput handleTaskAdd={handleTaskAdd} onChange={e => setNewTask(e.target.value)} newTask={newTask}/>
        <TodoList tasks={tasks} handleTaskDelete={handleTaskDelete} handleTaskComplete={handleTaskComplete}/>
      </div>
    </div>
  )
}

export default App
