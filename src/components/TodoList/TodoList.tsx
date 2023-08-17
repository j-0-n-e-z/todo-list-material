import { Box, List } from '@mui/material'
import { useState, type FC } from 'react'

import { TodoPanel, TodoItem } from '@/components'

interface TodoListProps {
	todos: Todo[]
}

export const TodoList: FC<TodoListProps> = ({ todos }) => {
	const [editTodoId, setEditTodoId] = useState<string | null>(null)

	const setTodoForEdit = (id: Todo['id'] | null) => {
		setEditTodoId(id)
	}

	return (
		<Box width='100%'>
			<List sx={{ padding: 0 }}>
				{todos.map(todo =>
					todo.id === editTodoId ? (
						<TodoPanel
							key={todo.id}
							mode='edit'
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

export * from './TodoItem/TodoItem'
