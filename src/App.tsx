import React, { useEffect, useState } from 'react'
import './App.css'
import TodoInput from "./components/todo-input/todo-input"
import TodoList from "./components/todo-list/todo-list"

export type Task = {
  id: number
  task: string
  isCompleted: boolean
}

const initialTask = {
  editMode: false,
  id: 0,
  task: '',
  isCompleted: false
}

const App = () =>  {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState<string>('')
  const [
    editMode,
    setEditMode] = useState({mode: false, id: 0})
  const [editedTask, setEditedTask] = useState('')

  const handleTaskAdd = (e: any) => {
    e.preventDefault()
    if (newTask) {
      const id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1
      setTasks([...tasks, {id, task: newTask, isCompleted: false}])
      setNewTask('')
    }
  }

  const handleTaskComplete = (id: number) => {
    if (!editMode.mode) {
      setTasks(tasks.map(task => task.id === id ? {...task, isCompleted: !task.isCompleted} : task))
    } else {
      setEditMode({
        mode: false,
        id: -1,
      })
    }
  }

  const updateTask = (id: number) => {
    const index = tasks.findIndex(item => item.id === id)
    if (index !== -1) {
      const editedTasks = [...tasks]
      editedTasks[index] = {id: id, task: editedTask, isCompleted: false}
      setTasks(editedTasks)
      setEditMode({mode: false, id: -1})
    }
  }

  const handleTaskEdit = (id: number) => {
    updateTask(id)
  }

  const handleTaskDelete = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
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
        <TodoInput
          handleTaskAdd={handleTaskAdd}
          onChange={e => setNewTask(e.target.value)}
          newTask={newTask}
        />
        <TodoList
          tasks={tasks}
          handleTaskDelete={handleTaskDelete}
          handleTaskComplete={handleTaskComplete}
          handleTaskEdit={handleTaskEdit}
          setEditMode={setEditMode}
          editMode={editMode}
          setEditedTask={setEditedTask}
        />
      </div>
    </div>
  )
}

export default App
