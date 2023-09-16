import { Box, List } from '@mui/material'
import { useEffect, useState } from 'react'

import { EditTodoItem, TodoItem } from '@/components'
import {
	fetchTodos,
	getTodoList,
	useAppDispatch,
	useAppSelector
} from '@/redux'

export const TodoList = () => {
	const [editTodoId, setEditTodoId] = useState<string | null>(null)
	const dispatch = useAppDispatch()

	const { todos, status, error} = useAppSelector(getTodoList)

	useEffect(() => {
		dispatch(fetchTodos())
	}, [])

	if (status === 'loading') return <div>Loading todos...</div>

	if (error) return <div>Error: {error}</div>

	const setTodoForEdit = (id: Todo['id'] | null) => {
		setEditTodoId(id)
	}

	return (
		<Box width='100%'>
			<List sx={{ padding: 0 }}>
				{todos.map(todo =>
					todo.id === editTodoId ? (
						<EditTodoItem
							key={todo.id}
							setTodoForEdit={setTodoForEdit}
							todo={todo}
						/>
					) : (
						<TodoItem
							key={todo.id}
							setTodoForEdit={setTodoForEdit}
							todo={todo}
						/>
					)
				)}
			</List>
		</Box>
	)
}

export * from './EditTodoItem/EditTodoItem'
export * from './TodoItem/TodoItem'
