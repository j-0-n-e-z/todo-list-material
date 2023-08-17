import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

import { initialState } from './initialState'

export interface TodoListState {
	todos: Todo[]
}

export const todoListSlice = createSlice({
	initialState,
	name: 'todoListSlice',
	reducers: {
		onAddTodo: (state, action: PayloadAction<TodoContent>) => {
			const { name, description } = action.payload
			const id = uuid()
			return {
				...state,
				todos: [...state.todos, { description, done: false, id, name }]
			}
		},
		onChangeTodo: (state, action: PayloadAction<Omit<Todo, 'done'>>) => {
			const { id: editTodoId, name, description } = action.payload
			return {
				...state,
				todos: state.todos.map(todo =>
					todo.id === editTodoId ? { ...todo, description, name } : todo
				)
			}
		},
		onDeleteTodo: (state, action: PayloadAction<string>) => {
			const deleteTodoId = action.payload
			return {
				...state,
				todos: state.todos.filter(todo => todo.id !== deleteTodoId)
			}
		},
		onDoneTodo: (state, action: PayloadAction<Todo['id']>) => {
			const id = action.payload
			return {
				...state,
				todos: state.todos.map(todo =>
					todo.id === id ? { ...todo, done: !todo.done } : todo
				)
			}
		}
	}
})

export const { onAddTodo, onChangeTodo, onDeleteTodo, onDoneTodo } =
	todoListSlice.actions

export default todoListSlice.reducer
