import { Box, List } from '@mui/material'
import { useState, type FC } from 'react'

import { TodoPanel } from '../TodoPanel/TodoPanel'

import { TodoItem } from './TodoItem/TodoItem'

interface TodoListProps {
	todoList: Todo[]
}

export const TodoList: FC<TodoListProps> = ({ todoList }) => {
	const [editTodoId, setEditTodoId] = useState<string | null>(null)

	const setTodoForEdit = (id: Todo['id'] | null) => {
		setEditTodoId(id)
	}

	return (
		<Box width='100%'>
			<List sx={{ padding: 0 }}>
				{todoList.map(todo =>
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
