import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TodoListManager from './index';

describe('TodoListManager', () => {
  it('renders initial input and add button', () => {
    const { getByPlaceholderText, getByTestId } = render(<TodoListManager />);
    
    expect(getByPlaceholderText('Enter Todo')).toBeTruthy();
    expect(getByTestId('add-todo-button')).toBeTruthy();
  });

  it('verifies that a new todo item is added to the list', () => {
    const { getByPlaceholderText, getByTestId, getByText } = render (<TodoListManager />);

    const addField = getByPlaceholderText('Enter Todo');
    fireEvent.changeText(addField, "Get some good OJ");

    const addButton = getByTestId('add-todo-button');
    fireEvent.press(addButton);

    expect(getByText('Get some good OJ')).toBeTruthy();
  })

  it('verifies that a new todo item is added, and can then be removed', () => {
    const { getByPlaceholderText, getByTestId, getByText, queryByText } = render (<TodoListManager />);

    const addField = getByPlaceholderText('Enter Todo');
    fireEvent.changeText(addField, "Get some good OJ");

    const addButton = getByTestId('add-todo-button');
    fireEvent.press(addButton);

    expect(getByText('Get some good OJ')).toBeTruthy();

    const removeButton = getByTestId(/^remove-todo-button-.+/);
    fireEvent.press(removeButton);
    expect(queryByText('Get some good OJ')).toBeFalsy();
  })

  });


  

