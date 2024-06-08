import React, { useEffect, useState } from 'react'
import '@/App.css'
import TodoInput from '@/components/todo-input/TodoInput'
import TodoList from '@/components/todo-list/TodoList'
import { editModeObjCreator } from '@/shared/helpers/objectCreator'
import { EditObjType, TaskType } from '@/shared/types/types'

const App = () =>  {
  const [
    tasks,
    setTasks
  ] = useState<TaskType[]>([])
  const [
    task,
    setTask
  ] = useState<string>('')
  const [
    editMode,
    setEditMode
  ] = useState<EditObjType>(editModeObjCreator())

  const handleTaskAdd = (e: any) => {
    e.preventDefault()
    if (task) {
      const id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1
      setTasks([...tasks, {id, task, isCompleted: false}])
      setTask('')
    }
  }

  const handleTaskCompleteOrUpdate = (id: number) => {
    if (!editMode.mode) {
      setTasks(tasks.map(task => task.id === id ? {...task, isCompleted: !task.isCompleted} : task))
    } else {
      const index = tasks.findIndex(item => item.id === id)
      const editedTasks = [...tasks]
      editedTasks[index] = {id: id, task: editMode.task, isCompleted: false}
      setTasks(editedTasks)
      setEditMode(editModeObjCreator())
    }
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
    <div className="App d-flex flex-column align-items-center justify-items-center mt-2">
      <div className="background w-100 h-100"></div>
      <div className="card">
        <TodoInput
          handleTaskAdd={handleTaskAdd}
          onChange={e => setTask(e.target.value)}
          task={task}
        />
        <TodoList
          tasks={tasks}
          handleTaskDelete={handleTaskDelete}
          handleTaskCompleteOrUpdate={handleTaskCompleteOrUpdate}
          setEditMode={setEditMode}
          editMode={editMode}
        />
      </div>
    </div>
  )
}

export default App
