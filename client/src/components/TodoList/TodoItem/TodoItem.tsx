import { Delete, Edit } from '@mui/icons-material'
import {
	Box,
	Checkbox,
	IconButton,
	ListItem,
	Paper,
	Typography
} from '@mui/material'
import type { FC } from 'react'

import { onDeleteTodo, onDoneTodo, useAppDispatch } from '@/redux'

interface TodoItemProps {
	todo: Todo
	setTodoForEdit: (id: Todo['id']) => void
}

export const TodoItem: FC<TodoItemProps> = ({ todo, setTodoForEdit }) => {
	const dispatch = useAppDispatch()
	const lineThroughIfChecked = todo.done ? 'line-through' : 'none'

	return (
		<ListItem sx={{ mb: 2, padding: 0 }}>
			<Paper
				elevation={1}
				sx={{
					alignItems: 'center',
					borderRadius: 2,
					display: 'flex',
					gap: 2,
					padding: '25px 30px',
					width: '100%'
				}}
			>
				<Checkbox
					checked={todo.done}
					color='success'
					onClick={() => dispatch(onDoneTodo(todo.id))}
				/>
				<Box sx={{ opacity: todo.done ? 0.5 : 1 }}>
					<Typography
						component='p'
						variant='h6'
						sx={{
							cursor: 'pointer',
							textDecorationLine: lineThroughIfChecked
						}}
						onClick={() => dispatch(onDoneTodo(todo.id))}
					>
						{todo.name}
					</Typography>
					<Typography
						component='p'
						sx={{ textDecorationLine: lineThroughIfChecked }}
						variant='subtitle2'
					>
						{todo.description}
					</Typography>
				</Box>
				<Box display='flex' marginLeft='auto'>
					<IconButton
						aria-label='delete'
						color='error'
						onClick={() => dispatch(onDeleteTodo(todo.id))}
					>
						<Delete />
					</IconButton>
					<IconButton
						aria-label='edit'
						color='warning'
						onClick={() => setTodoForEdit(todo.id)}
					>
						<Edit />
					</IconButton>
				</Box>
			</Paper>
		</ListItem>
	)
}
