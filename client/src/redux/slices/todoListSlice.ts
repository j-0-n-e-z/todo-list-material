import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

import type { RootState } from '../common/store'
import { fetchTodos } from '../thunks/todolist'

export interface TodoListState {
  todos: Todo[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string
}

const initialState: TodoListState = {
  error: '',
  status: 'idle',
  todos: []
}

export const todoListSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.todos = action.payload
    })
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.status = 'failed'
      state.todos = []
      state.error = action.error.message || 'error'
    })
  },
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
        todos: state.todos.map((todo) =>
          todo.id === editTodoId ? { ...todo, description, name } : todo
        )
      }
    },
    onDeleteTodo: (state, action: PayloadAction<string>) => {
      const deleteTodoId = action.payload
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== deleteTodoId)
      }
    },
    onDoneTodo: (state, action: PayloadAction<Todo['id']>) => {
      const id = action.payload
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
      }
    }
  }
})

export const getTodoList = (state: RootState) => state.todoList

export const { onAddTodo, onChangeTodo, onDeleteTodo, onDoneTodo } = todoListSlice.actions

export default todoListSlice.reducer
