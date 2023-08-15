import { Save } from '@mui/icons-material'
import { Button, ListItem, Paper, TextField } from '@mui/material'
import { useState, type FC } from 'react'

import { useAppDispatch } from '../../../app/hooks'
import { onChangeTodo } from '../../../features/todolist/todoListSlice'

interface EditTodoItemProps {
	todo: Todo
	onEditTodo: (id: Todo['id'] | null) => void
}

export const EditTodoItem: FC<EditTodoItemProps> = ({ todo, onEditTodo }) => {
	const [editTodo, setEditTodo] = useState<TodoContent>({
		description: todo.description,
		name: todo.name
	})
	const dispatch = useAppDispatch()
	const [error, setError] = useState('')

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.currentTarget
		setEditTodo({ ...editTodo, [name]: value })
	}

	const onClick = () => {
		if (!editTodo.name) {
			setError('Name is required')
			return
		}
		onEditTodo(null)
		dispatch(onChangeTodo({ id: todo.id, ...editTodo }))
		setError('')
	}

	return (
		<ListItem sx={{ marginBottom: 2, padding: 0 }}>
			<Paper
				elevation={1}
				sx={{
					alignItems: 'center',
					borderRadius: 2,
					display: 'flex',
					gap: 2,
					justifyContent: 'space-between',
					padding: '30px 25px 15px',
					width: '100%'
				}}
			>
				<TextField
					required
					error={!!error}
					helperText={error || ' '}
					label='Name'
					name='name'
					sx={{ flex: 1 }}
					value={editTodo.name}
					onChange={onChange}
				/>
				<TextField
					helperText=' '
					label='Description'
					name='description'
					sx={{ flex: 2 }}
					value={editTodo.description}
					onChange={onChange}
				/>
				<Button
					startIcon={<Save />}
					sx={{ transform: 'translateY(-30%)' }}
					variant='outlined'
					onClick={onClick}
				>
					Save
				</Button>
			</Paper>
		</ListItem>
	)
}
