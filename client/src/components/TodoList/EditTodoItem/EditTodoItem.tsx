import { Cancel, Edit } from '@mui/icons-material'
import { Box, Button, ListItem, Paper, Stack, TextField } from '@mui/material'
import type { FC } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { onChangeTodo, useAppDispatch } from '@/redux'

interface TodoPanelProps {
	todo: Todo
	setTodoForEdit: (id: Todo['id'] | null) => void
}

export const EditTodoItem: FC<TodoPanelProps> = ({ todo, setTodoForEdit }) => {
	const dispatch = useAppDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<TodoContent>({
		defaultValues: {
			description: todo.description,
			name: todo.name
		}
	})

	const onSubmit: SubmitHandler<TodoContent> = ({ name, description }) => {
		dispatch(onChangeTodo({ description, id: todo.id, name }))
		setTodoForEdit(null)
	}

	return (
		<ListItem>
			<Paper
				elevation={3}
				sx={{
					borderRadius: 2,
					mb: 4,
					padding: '20px',
					width: '100%'
				}}
			>
				<form
					onInvalid={e => e.preventDefault()}
					onSubmit={handleSubmit(onSubmit)}
				>
					<Stack spacing={1}>
						<TextField
							{...register('name', { required: 'Name is required' })}
							error={!!errors.name}
							helperText={errors.name?.message || 'Enter a todo name'}
							label='Name'
							variant='filled'
						/>
						<TextField
							{...register('description')}
							helperText='Enter a todo description'
							label='Description'
							variant='filled'
						/>
						<Box alignSelf='end' display='flex' gap={3}>
							<Button
								color='error'
								startIcon={<Cancel />}
								onClick={() => setTodoForEdit(null)}
							>
								cancel
							</Button>
							<Button
								color='warning'
								startIcon={<Edit />}
								type='submit'
								variant='contained'
							>
								save todo
							</Button>
						</Box>
					</Stack>
				</form>
			</Paper>
		</ListItem>
	)
}
