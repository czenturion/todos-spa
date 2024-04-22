import React, { FC } from 'react'
import { Task } from '../../App'

type Props = {
  tasks: Task[]
  handleTaskDelete: (id: number) => void
}

const TodoList: FC<Props> = ({ tasks, handleTaskDelete }) => {
  return <div className="container">
    <ul className="list-group">
      {tasks.length > 0 ? tasks.map((task, index) => (
        <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
          <div className="text">
            {index + 1 + ". " + task.task}
          </div>
          <div className="btn-toolbar ml-2">
            <button className="btn btn-outline-success mr-2">✔</button>
            <button className="btn btn-outline-danger" onClick={() => handleTaskDelete(task.id)}>X</button>
          </div>
        </li>
        )) : <li className="list-group-item d-flex justify-content-between align-items-center">Задач нету</li>}
    </ul>
  </div>
}

export default TodoList