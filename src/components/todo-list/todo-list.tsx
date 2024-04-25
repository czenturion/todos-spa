import React, {FC, useState} from 'react'
import { Task } from '../../App'

type Props = {
  tasks: Task[]
  handleTaskDelete: (id: number) => void
  handleTaskComplete: (id: number) => void
}

const TodoList: FC<Props> = ({ tasks, handleTaskDelete, handleTaskComplete }) => {
  const [filter, setFilter] = useState<string>('')

  const filterFn = (filter: string, task: Task) => {
    switch (filter) {
      case 'completed':
        return task.isCompleted
      case 'incomplete':
        return !task.isCompleted
      default:
        return true
    }
  }

  return <div className="container">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav mx-auto">
        <li className={`nav-item mr-1 px-1 rounded ${filter === '' ? 'active' : ''}`} aria-current="page" onClick={() => setFilter('')}>Все</li>
        <li className={`nav-item mr-1 px-1 rounded ${filter === 'incomplete' ? 'active' : ''}`} onClick={() => setFilter('incomplete')}>Активные</li>
        <li className={`nav-item px-1 rounded ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Выполненные</li>
      </ul>
    </nav>
    <ul className="list-group">
      {tasks.length > 0 ? tasks.filter(task => filterFn(filter, task)).map((task, index) => (
        <li key={task.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${task.isCompleted ? 'list-group-item-success' : ''}`}>
          <div className="text">
            {index + 1 + ". " + task.task}
          </div>
          <div className="btn-toolbar ml-2">
            <button className="btn manage btn-outline-success mr-2 " onClick={() => handleTaskComplete(task.id)}>✓
            </button>
            <button className="btn manage btn-outline-danger" onClick={() => handleTaskDelete(task.id)}>X</button>
          </div>
        </li>
      )) : <li className="list-group-item d-flex justify-content-between align-items-center">Задач нету</li>}
    </ul>
  </div>
}

export default TodoList