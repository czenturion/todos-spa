import React, { FC, useState } from 'react'
import Navbar from '@/components/todo-list/navbar/Navbar'
import Task from '@/components/todo-list/task/Task'
import { filterFn } from '@/shared/helpers/filterFn'
import { filterState } from '@/shared/consts/consts'
import { TodoListPropsType } from '@/shared/types/types'

const TodoList: FC<TodoListPropsType> = ({
                               tasks,
                               handleTaskCompleteOrUpdate,
                               handleTaskDelete,
                               setEditMode,
                               editMode,
                               }) => {
  const [filter, setFilter] = useState<string>(filterState.all)

  return <div className="container mb-2">
    <Navbar tasks={tasks} filter={filter} setFilter={setFilter} />
    <ul className="list-group">
      {
        tasks.filter(task => filterFn(filter, task)).length > 0
          ? tasks
            .filter(task => filterFn(filter, task))
            .map((task, index) => (
              <Task
                key={index}
                task={task}
                index={index}
                editMode={editMode}
                setEditMode={setEditMode}
                handleTaskDelete={handleTaskDelete}
                handleTaskCompleteOrUpdate={handleTaskCompleteOrUpdate}
              />
            ))
          : <li className="list-group-item d-flex justify-content-between align-items-center">
            Задач нету
          </li>
      }
    </ul>
  </div>
}

export default TodoList
