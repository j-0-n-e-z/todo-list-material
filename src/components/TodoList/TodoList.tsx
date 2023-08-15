import { Box, List } from '@mui/material'
import { useState, type FC } from 'react'

import { EditTodoItem } from './EditTodoItem/EditTodoItem'
import { TodoItem } from './TodoItem/TodoItem'

interface TodoListProps {
	todoList: Todo[]
}

export const TodoList: FC<TodoListProps> = ({ todoList }) => {
	const [editTodoId, setEditTodoId] = useState<string | null>(null)

	const onEditTodo = (id: Todo['id'] | null) => {
		setEditTodoId(id)
	}

	return (
		<Box width='100%'>
			<List sx={{ padding: 0 }}>
				{todoList.map(todo =>
					todo.id === editTodoId ? (
						<EditTodoItem
							key={todo.id}
							todo={todo}
							onEditTodo={onEditTodo}
						/>
					) : (
						<TodoItem key={todo.id} todo={todo} onEditTodo={onEditTodo} />
					)
				)}
			</List>
		</Box>
	)
}
