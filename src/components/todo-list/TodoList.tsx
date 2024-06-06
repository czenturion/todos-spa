import React, {FC, useState} from 'react'
import { editModeObjCreator } from '@/utils/helpers/objectCreator'
import { filterFn } from '@/utils/helpers/filterFn'
import { EditObjType, TaskType } from '@/types/types'

type PropsType = {
  tasks: TaskType[]
  handleTaskCompleteOrUpdate: (id: number) => void
  handleTaskDelete: (id: number) => void
  setEditMode: (elm: any) => void
  editMode: EditObjType
}

const TodoList: FC<PropsType> = ({
                               tasks,
                               handleTaskCompleteOrUpdate,
                               handleTaskDelete,
                               setEditMode,
                               editMode,
                               }) => {
  const [filter, setFilter] = useState<string>('')

  return <div className="container mb-2">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav mx-auto flex-row flex-wrap">
        <li className={`nav-item mr-2 px-1 rounded ${filter === '' ? 'active' : ''}`} aria-current="page" onClick={() => setFilter('')}>Все</li>
        <li className={`nav-item mr-2 px-1 rounded ${filter === 'incomplete' ? 'active' : ''}`} onClick={() => setFilter('incomplete')}>Активные</li>
        <li className={`nav-item px-1 rounded ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Выполненные</li>
      </ul>
    </nav>
    <ul className="list-group">
      {
        tasks.length > 0 ? tasks.filter(task => filterFn(filter, task)).map((task, index) => (
          <li key={task.id}
              className={`list-group-item d-flex justify-content-between align-items-center pl-2 pr-2 ${task.isCompleted ? 'list-group-item-success' : ''}`}>
            {
              !editMode?.mode || editMode.id !== task.id
                ? <div className="text">
                  {index + 1 + ". " + task.task}
                </div>
                : <textarea
                  className="form-control"
                  placeholder="Введите задачу..."
                  rows={3}
                  defaultValue={task.task}
                  onChange={s => {
                    setEditMode(editModeObjCreator(true, task.id, s.target.value))
                  }}
                ></textarea>
            }
            <div className="btn-toolbar ml-1 flex-nowrap">
              <button
                className="btn btn-manage btn-outline-success ml-1 mt-1"
                onClick={() => handleTaskCompleteOrUpdate(task.id)}
                disabled={editMode.mode && task.id !== editMode.id}
              >
                ✓
              </button>
              <button
                className="btn btn-manage btn-outline-info ml-1 mt-1"
                onClick={() => setEditMode(editModeObjCreator(true, task.id, task.task))}
                disabled={editMode.mode && task.id === editMode.id}
              >
                <span className="fa fa-pencil"></span>
              </button>
              <button
                className="btn btn-manage btn-outline-danger ml-1 mt-1"
                onClick={() => handleTaskDelete(task.id)}
              >
                X
              </button>
            </div>
          </li>
        )) : <li className="list-group-item d-flex justify-content-between align-items-center">
          Задач нету
        </li>
      }
    </ul>
  </div>
}

export default TodoList
