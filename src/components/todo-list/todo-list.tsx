import React, { FC } from 'react'
import { Task } from '../../App'

type Props = {
  tasks: Task[]
  handleTaskDelete: (id: number) => void
  handleTaskComplete: (id: number) => void
}

const TodoList: FC<Props> = ({ tasks, handleTaskDelete, handleTaskComplete }) => {
  return <div className="container">
    <ul className="list-group">
      {tasks.length > 0 ? tasks.map((task, index) => (
        <li key={task.id} className={`list-group-item d-flex justify-content-between align-items-center ${task.isCompleted ? 'list-group-item-success' : ''}`}>
          <div className="text">
            {index + 1 + ". " + task.task}
          </div>
          <div className="btn-toolbar ml-2">
            <button className="btn manage btn-outline-success mr-2 " onClick={() => handleTaskComplete(task.id)}>✔</button>
            <button className="btn manage btn-outline-danger" onClick={() => handleTaskDelete(task.id)}>X</button>
          </div>
        </li>
        )) : <li className="list-group-item d-flex justify-content-between align-items-center">Задач нету</li>}
    </ul>
  </div>
}

export default TodoList