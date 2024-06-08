export const createTaskGenId = (() => {
  let id = 1
  return (taskName: string) => ({
    id: id++,
    task: taskName,
    isCompleted: false,
  })
})()