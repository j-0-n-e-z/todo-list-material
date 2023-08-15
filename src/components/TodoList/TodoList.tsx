import { Box, List } from '@mui/material'
import type { FC } from 'react'

import { EditTodoItem } from './EditTodoItem/EditTodoItem'
import { TodoItem } from './TodoItem/TodoItem'

interface TodoListProps {
	todoList: Todo[]
	editTodoId: Todo['id'] | null
	onEditTodo: (id: Todo['id'] | null) => void
}

export const TodoList: FC<TodoListProps> = ({
	todoList,
	editTodoId,
	onEditTodo
}) => (
	<Box width='100%'>
		<List sx={{ padding: 0 }}>
			{todoList.map(todo =>
				todo.id === editTodoId ? (
					<EditTodoItem
						key={todo.id}
						editTodoId={editTodoId}
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
