import React, { FC } from 'react'
import { filterState } from '@/shared/consts/consts'
import { filterFn } from '@/shared/helpers/filterFn'
import { NavbarPropsType } from '@/shared/types/types'

const Navbar: FC<NavbarPropsType> = ({
                  filter,
                  setFilter,
                  tasks
                }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav mx-auto flex-row flex-wrap align-items-center">
        <li className={`nav-item px-1 rounded ${filter === filterState.all ? 'active' : ''}`}
            aria-current="page"
            onClick={() => setFilter(filterState.all)}
        >
          Все - {tasks.length}
        </li>
        <li className={`nav-item ml-3 px-1 rounded ${filter === filterState.incomplete ? 'active' : ''}`}
            onClick={() => setFilter(filterState.incomplete)}
        >
          Активные - {tasks.filter(task => filterFn(filterState.incomplete, task)).length}
        </li>
        <li className={`nav-item ml-3 px-1 rounded ${filter === filterState.completed ? 'active' : ''}`}
            onClick={() => setFilter(filterState.completed)}
        >
          Выполненные - {tasks.filter(task => filterFn(filterState.completed, task)).length}
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
