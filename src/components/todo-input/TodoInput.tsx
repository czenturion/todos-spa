import React, { FC, FormEvent } from 'react'

type PropsType = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleTaskAdd: (e: FormEvent<HTMLFormElement>) => void
  task: string
}

const TodoInput: FC<PropsType> = ({ onChange, handleTaskAdd, task }) => {

  return <form className="container pt-2" onSubmit={handleTaskAdd}>
    <div className="input-group">
      <input type="text" className='form-control' placeholder='Добавь задачу' onChange={onChange} value={task}/>
      <div className="input-group-append">
        <button className="btn btn-outline-secondary">Добавить</button>
      </div>
    </div>
  </form>
}

export default TodoInput
