import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from '@/App'
import TodoList from '@/components/todo-list/TodoList'
import { createTaskGenId } from '@/utils/helpers/createTaskGenId'

test('Exists tasks renders correctly', () => {
  const tasks = [
    createTaskGenId('1'),
    createTaskGenId('2'),
    createTaskGenId('3'),
    createTaskGenId('4'),
    createTaskGenId('5'),
  ]

  const { container, queryByText, queryAllByText } = render(
    <TodoList
      tasks={tasks}
      handleTaskCompleteOrUpdate={jest.fn()}
      handleTaskDelete={jest.fn()}
      editMode={{mode: false, id: -1, task: ''}}
      setEditMode={jest.fn()}
    />
  )

  // Testing amount of rendered tasks
  const todoListContainer = container.querySelectorAll('.text')
  expect(todoListContainer).toHaveLength(tasks.length)
  console.log(todoListContainer)

  tasks.forEach((task, index) => {
    const taskText = `${index + 1}. ${task.task}`
    expect(queryByText(taskText)).toBeInTheDocument()
  })
})

test('Edit task correctly', () => {
  const tasks = [
    createTaskGenId('1'),
    createTaskGenId('2'),
    createTaskGenId('3'),
  ]

  localStorage.setItem('tasks', JSON.stringify(tasks))

  const { container, getByPlaceholderText, getByText, rerender } = render(<App/>)

  // Searching edit button and click
  const editButton = container.querySelectorAll('.fa-pencil')[tasks[1].id - 1]
  expect(editButton).not.toBeNull()
  fireEvent.click(editButton)

  const textarea = getByPlaceholderText('Введите задачу...') as HTMLTextAreaElement
  expect(textarea).toBeInTheDocument()
  expect(textarea.value).toBe(tasks[1].task)

  // Editing second task
  fireEvent.change(textarea, {target: {value: 'Updated Task'}})
  expect(textarea.value).toBe('Updated Task')

  const completeButton = getByText('✓', {selector: 'button:not([disabled])'})
  fireEvent.click(completeButton)

  rerender(<App />)

  // Checking edited task
  const updatedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')[1]
  expect(updatedTasks.task).toBe('Updated Task')
  expect(getByText('2. Updated Task')).toBeInTheDocument()
})