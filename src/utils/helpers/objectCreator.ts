import { EditObjType } from '@/types/types'

export const editModeObjCreator = (
  mode = false,
  id = -1,
  task = ''
): EditObjType => {
  return { mode, id, task }
}