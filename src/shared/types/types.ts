export type TaskType = {
  id: number
  task: string
  isCompleted: boolean
}

export type EditObjType = {
  mode: boolean
  id: number
  task: string
}

export type TodoListPropsType = {
  tasks: TaskType[]
  handleTaskCompleteOrUpdate: (id: number) => void
  handleTaskDelete: (id: number) => void
  setEditMode: (elm: any) => void
  editMode: EditObjType
}

export type NavbarPropsType = {
  filter: string
  setFilter: (s: string) => void
  tasks: TaskType[]
}

export type TaskPropsType =
  Omit<TodoListPropsType, 'tasks'>
  & { task: TaskType, index: number }
