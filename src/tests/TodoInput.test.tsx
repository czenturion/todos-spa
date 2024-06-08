import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import App from '@/App'
import { createTaskGenId } from '@/shared/helpers/createTaskGenId'

test('Adding a task updates tasks state', async () => {
  const { getByPlaceholderText, getByText } = render(<App />)
  const inputElement = getByPlaceholderText('Добавь задачу') as HTMLInputElement
  const addButton = getByText('Добавить')

  const task1 = createTaskGenId('task1')
  const task2 = createTaskGenId('task2')

  fireEvent.change(inputElement, {target: {value: task1.task}})
  expect(inputElement.value).toBe(task1.task)
  fireEvent.click(addButton)

  await waitFor(() => {
    const allTasks = localStorage.getItem('tasks')
    const parsedTasks = allTasks ? JSON.parse(allTasks) : []
    expect(parsedTasks).toHaveLength(1)
    expect(parsedTasks[0]).toEqual(task1)
  })

  fireEvent.change(inputElement, {target: {value: task2.task}})
  fireEvent.click(addButton)

  await waitFor(() => {
    const allTasks = localStorage.getItem('tasks')
    const parsedTasks = allTasks ? JSON.parse(allTasks) : []
    expect(parsedTasks).toHaveLength(2)
    expect(parsedTasks[1]).toEqual(task2)
  })
})