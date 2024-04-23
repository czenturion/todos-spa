import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import App from './App';

test('should add new task', async () => {
  render(<App />);

  const input = screen.getByPlaceholderText('Добавь задачу');
  const button = screen.getByText('Добавить');

  fireEvent.change(input, { target: { value: 'Купить молоко' } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText('1. Купить молоко')).toBeInTheDocument();
  });
});

test('should mark task as completed', async () => {
  render(<App />);

  const input = screen.getByPlaceholderText('Добавь задачу');
  const button = screen.getByText('Добавить');

  fireEvent.change(input, { target: { value: 'Купить хлеб' } });
  fireEvent.click(button);

  const task = await screen.findByText('1. Купить хлеб');
  const buttonDone = screen.getByText('✔');
  const parentElement = task.closest('.list-group-item');

  expect(parentElement).not.toHaveClass('list-group-item d-flex justify-content-between align-items-center list-group-item-success');

  fireEvent.click(buttonDone);

  expect(parentElement).toHaveClass('list-group-item d-flex justify-content-between align-items-center list-group-item-success');
});

test('should delete task', async () => {
  render(<App />);

  const input = screen.getByPlaceholderText('Добавь задачу');
  const button = screen.getByText('Добавить');

  fireEvent.change(input, { target: { value: 'Посадить цветы' } });
  fireEvent.click(button);

  const task = await screen.findByText('1. Посадить цветы');
  const deleteButton = screen.getByText('X');

  fireEvent.click(deleteButton);

  expect(task).not.toBeInTheDocument();
});
