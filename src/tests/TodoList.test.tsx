import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from '@/App'
import TodoList from '@/components/todo-list/TodoList'
import { createTaskGenId } from '@/utils/helpers/createTaskGenId'
import { TaskType } from '@/types/types'

test('Exists tasks renders correctly', () => {
  const tasks = [
    createTaskGenId('1'),
    createTaskGenId('2'),
    createTaskGenId('3'),
  ]

  const { container, queryAllByText} = render(
    <TodoList
      tasks={tasks}
      handleTaskCompleteOrUpdate={() => {}}
      handleTaskDelete={() => {}}
      editMode={{mode: false, id: -1, task: ''}}
      setEditMode={() => {}}
    />
  )

  const todoListContainer = container.querySelector('.text')
  expect(todoListContainer).toBeInTheDocument()

  const taskElements = queryAllByText((content, element) => {

    return element!.classList.contains('text')
  })

  expect(taskElements).toHaveLength(tasks.length)

  taskElements.forEach((taskElement, index) => {
    expect(taskElement).toHaveTextContent(tasks[index].task)
  })
})

test('Edit task correctly', () => {
  const tasks = [
    createTaskGenId('1'),
    createTaskGenId('2'),
    createTaskGenId('3'),
  ]

  localStorage.setItem('tasks', JSON.stringify(tasks))

  const { getByPlaceholderText, getByText, queryByText, rerender } = render(<App />)

  const taskText = queryByText('2. ' + tasks[1].task)
  expect(taskText).not.toBeNull()

  const editButton = document.querySelectorAll('.btn-manage')[1]
  expect(editButton).not.toBeNull()

  // Проверяем, что текстовое поле для редактирования задачи появилось
  fireEvent.click(editButton)
  const textarea = getByPlaceholderText('Введите задачу...') as HTMLTextAreaElement
  expect(textarea).toBeInTheDocument()
  console.log(textarea.value, tasks[1].task)
  expect(textarea.value).toBe(tasks[1].task)

  // Изменяем значение задачи
  fireEvent.change(textarea, { target: { value: 'Updated Task' } })
  expect(textarea.value).toBe('Updated Task')

  // Завершаем редактирование задачи
  const completeButton = getByText('✓', { selector: 'button:not([disabled])' })
  fireEvent.click(completeButton)

  // Перерендерим компонент, чтобы убедиться, что изменения применены
  rerender(<App />)

  // Проверяем, что задача обновилась в localStorage
  const updatedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  expect(updatedTasks[1].task).toBe('Updated Task')

  updatedTasks.forEach((task: TaskType)  => {
    expect(getByText(new RegExp(`^${task.task}$`))).toBeInTheDocument()
  })
})