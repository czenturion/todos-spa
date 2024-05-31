import React, {FC, FormEvent} from 'react'

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleTaskAdd: (e: FormEvent<HTMLFormElement>) => void
  newTask: string
}

const TodoInput: FC<Props> = ({ onChange, handleTaskAdd, newTask }) => {

  return <form className="container pt-2" onSubmit={handleTaskAdd}>
    <div className="input-group">
      <input type="text" className='form-control' placeholder='Добавь задачу' onChange={onChange} value={newTask}/>
      <div className="input-group-append">
        <button className="btn btn-outline-secondary">Добавить</button>
      </div>
    </div>
  </form>
}

export default TodoInput
