import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoInput from '@/components/todo-input/TodoInput';

test('TodoInput renders correctly', () => {
  const { getByPlaceholderText } = render(<TodoInput onChange={() => {}} handleTaskAdd={() => {}} task="" />);
  const inputElement = getByPlaceholderText('Добавь задачу');
  expect(inputElement).toBeInTheDocument();
});

test('TodoInput handles input change', () => {
  const handleChange = jest.fn();
  const { getByPlaceholderText } = render(<TodoInput onChange={handleChange} handleTaskAdd={() => {}} task="" />);
  const inputElement = getByPlaceholderText('Добавь задачу');
  fireEvent.change(inputElement, { target: { value: 'New Task' } });
  expect(handleChange).toHaveBeenCalledTimes(1);
});

test('TodoInput handles form submission', () => {
  const handleAdd = jest.fn();
  const { getByText } = render(<TodoInput onChange={() => {}} handleTaskAdd={handleAdd} task="" />);
  const addButton = getByText('Добавить');
  fireEvent.click(addButton);
  expect(handleAdd).toHaveBeenCalledTimes(1);
});