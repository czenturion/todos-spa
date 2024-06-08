import { EditObjType } from '@/shared/types/types'

export const editModeObjCreator = (
  mode = false,
  id = -1,
  task = ''
): EditObjType => {
  return { mode, id, task }
}