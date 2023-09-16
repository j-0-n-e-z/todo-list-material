import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import type { TodoListState } from '../slices/todoListSlice'

const BASE_URL = 'http://localhost:8081'

export const fetchTodos = createAsyncThunk('todolist', () =>
  axios.get<TodoListState>(BASE_URL).then((res) => res.data.todos)
)
