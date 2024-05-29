import React, {FC, useState} from 'react'
import { Task } from '../../App'

type Props = {
  tasks: Task[]
  handleTaskComplete: (id: number) => void
  handleTaskEdit: (id: number) => void
  handleTaskDelete: (id: number) => void
  setEditMode: (elm: any) => void
  editMode: {
    mode: boolean,
    id: number
  }
  setEditedTask: (val: string) => void
}

const TodoList: FC<Props> = ({
                               tasks,
                               handleTaskComplete,
                               handleTaskEdit,
                               handleTaskDelete,
                               setEditMode,
                               editMode,
                               setEditedTask
                               }) => {
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
        <li className={`nav-item mr-2 px-1 rounded ${filter === '' ? 'active' : ''}`} aria-current="page" onClick={() => setFilter('')}>Все</li>
        <li className={`nav-item mr-2 px-1 rounded ${filter === 'incomplete' ? 'active' : ''}`} onClick={() => setFilter('incomplete')}>Активные</li>
        <li className={`nav-item px-1 rounded ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Выполненные</li>
      </ul>
    </nav>
    <ul className="list-group">
      {tasks.length > 0 ? tasks.filter(task => filterFn(filter, task)).map((task, index) => (
        <li key={task.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${task.isCompleted ? 'list-group-item-success' : ''}`}>
          {
            !editMode?.mode || editMode.id !== task.id
              ? <div className="text">
                {index + 1 + ". " + task.task}
              </div>
              : <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                defaultValue={task.task}
                onChange={s => {
                  setEditMode({
                    mode: true,
                    id: task.id
                  })
                }}
              ></textarea>
          }
          <div className="btn-toolbar ml-2">
            <button className="btn manage btn-outline-success" onClick={() => handleTaskComplete(task.id)}>✓
            </button>
            <button className="btn manage btn-outline-info ml-1" onClick={() => setEditMode({id: task.id, mode: true})}><span
              className="fa fa-pencil"></span></button>
            <button className="btn manage btn-outline-danger ml-1" onClick={() => handleTaskDelete(task.id)}>X</button>
          </div>
        </li>
      )) : <li className="list-group-item d-flex justify-content-between align-items-center">Задач нету</li>}
    </ul>
  </div>
}

export default TodoList
