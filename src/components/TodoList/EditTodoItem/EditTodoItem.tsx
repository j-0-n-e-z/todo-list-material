import { Box, Button, ListItem, Paper, TextField } from '@mui/material'
import { type FC } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { useAppDispatch } from '../../../app/hooks'
import { onChangeTodo } from '../../../features/todolist/todoListSlice'

interface EditTodoItemProps {
	todo: Todo
	onEditTodo: (id: Todo['id'] | null) => void
}

export const EditTodoItem: FC<EditTodoItemProps> = ({ todo, onEditTodo }) => {
	const dispatch = useAppDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Todo>({
		defaultValues: todo
	})

	const onSubmit: SubmitHandler<Todo> = editTodo => {
		onEditTodo(null)
		dispatch(onChangeTodo({ ...editTodo }))
	}

	return (
		<ListItem sx={{ marginBottom: 2, padding: 0 }}>
			<Paper
				elevation={1}
				sx={{
					borderRadius: 2,
					padding: '20px',
					width: '100%'
				}}
			>
				<form
					onInvalid={e => e.preventDefault()}
					onSubmit={handleSubmit(onSubmit)}
				>
					<Box
						sx={{
							alignItems: 'center',
							display: 'flex',
							gap: 2,
							justifyContent: 'space-between'
						}}
					>
						<TextField
							{...register('name', { required: 'Name is required' })}
							error={!!errors.name}
							helperText={errors.name?.message || 'Enter a todo name'}
							label='Name'
							sx={{ flex: 1 }}
						/>
						<TextField
							{...register('description')}
							helperText='Enter a todo description'
							label='Description'
							sx={{ flex: 2 }}
						/>
						<Button type='submit' variant='outlined'>
							Save
						</Button>
					</Box>
				</form>
			</Paper>
		</ListItem>
	)
}
