import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Todo from './Todo'

const todo = {
  text: 'Some text',
  done: false
}

test('text is rendered', () => {
  const component = render(
    <Todo todo={todo} onClickDelete={() => () => (null)} onClickComplete={() => () => (null)} />
  )

  expect(component.container).toHaveTextContent('Some text')
})

test('not done task shows "set as done" button', () => {
  const component = render(
    <Todo todo={todo} onClickDelete={() => () => (null)} onClickComplete={() => () => (null)} />
  )

  const button = component.queryByText(/set as done/i)
  expect(button).toBeTruthy()
})

test('done task does not show "set as done" button', () => {
  const done = {
    text: 'Done it already!',
    done: true
  }
  const component = render(
    <Todo todo={done} onClickDelete={() => () => (null)} onClickComplete={() => () => (null)} />
  )

  const button = component.queryByText(/set as done/i)
  expect(button).toBeFalsy()
})

test('clicking delete button calls delete handler', () => {
  const mockDelete = jest.fn()
  
  const component = render(
    <Todo todo={todo} onClickDelete={() => mockDelete} onClickComplete={() => () => (null)} />
  )

  const delButton = component.getByText('Delete')
  fireEvent.click(delButton)
  
  expect(mockDelete.mock.calls).toHaveLength(1)
})

test('clicking "set as done" button calls completion handler', () => {
  const mockComplete = jest.fn()

  const component = render(
    <Todo todo={todo} onClickDelete={() => () => (null)} onClickComplete={() => mockComplete} />
  )

  const doneButton = component.getByText('Set as done')
  fireEvent.click(doneButton)
  
  expect(mockComplete.mock.calls).toHaveLength(1)
})