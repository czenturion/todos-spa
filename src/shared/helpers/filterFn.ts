import { TaskType } from '@/shared/types/types'

export const filterFn = (filter: string, task: TaskType) => {
  switch (filter) {
    case 'completed':
      return task.isCompleted
    case 'incomplete':
      return !task.isCompleted
    default:
      return true
  }
}