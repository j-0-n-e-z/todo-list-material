import { Box } from '@mui/material'
import { useState } from 'react'

import { useAppSelector } from './app/hooks'
import { Header, Panel, TodoList } from './components'

export interface Todo {
	id: string
	description: string
	done: boolean
	name: string
}

const App = () => {
	const [editTodoId, setEditTodoId] = useState<string | null>(null)
	const todoList = useAppSelector(state => state.todoList.todos)

	const onEditTodo = (id: Todo['id'] | null) => {
		setEditTodoId(id)
	}

	return (
		<Box alignItems='center' display='flex' flexDirection='column' width='45%'>
			<Header todoList={todoList} />
			<Panel />
			<TodoList
				editTodoId={editTodoId}
				todoList={todoList}
				onEditTodo={onEditTodo}
			/>
		</Box>
	)
}

export default App
