import React, { FC } from 'react'
import s from './todo-input.module.css'

type Props = {

}

const TodoInput: FC<Props> = () => {
  return <form className="container">
    <div className="input-group">
      <input type="text" className='form-control' placeholder='Добавь задачу'/>
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button">Добавить</button>
      </div>
    </div>
  </form>
}

export default TodoInput
