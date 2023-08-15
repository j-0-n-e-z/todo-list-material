import { Save } from '@mui/icons-material'
import { Button, ListItem, Paper, TextField } from '@mui/material'
import { useState, type FC } from 'react'

import type { Todo } from '../../../App'
import { useAppDispatch } from '../../../app/hooks'
import { onChangeTodo } from '../../../features/todolist/todoListSlice'
import type { TodoContent } from '../../../types/types'

interface EditTodoItemProps {
	todo: Todo
	editTodoId: string
	onEditTodo: (id: Todo['id'] | null) => void
}

export const EditTodoItem: FC<EditTodoItemProps> = ({
	todo,
	editTodoId,
	onEditTodo
}) => {
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
		dispatch(onChangeTodo({ id: editTodoId, ...editTodo }))
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
					value={editTodo.name}
					onChange={onChange}
				/>
				<TextField
					helperText=' '
					label='Description'
					name='description'
					value={editTodo.description}
					onChange={onChange}
				/>
				<Button
					startIcon={<Save />}
					sx={{ transform: 'translateY(-25%)' }}
					variant='outlined'
					onClick={onClick}
				>
					Save
				</Button>
			</Paper>
		</ListItem>
	)
}
