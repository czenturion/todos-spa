import React, { FC } from 'react'
import { editModeObjCreator } from '@/shared/helpers/objectCreator'
import { TaskPropsType } from '@/shared/types/types'

const Task: FC<TaskPropsType> = React.memo(({task, index, editMode, setEditMode, handleTaskCompleteOrUpdate, handleTaskDelete}) => {

  return (
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
  )
})

export default Task