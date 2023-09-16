import { Add } from '@mui/icons-material'
import { Button, Paper, Stack, TextField } from '@mui/material'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { onAddTodo, useAppDispatch } from '@/redux'

export const TodoPanel = () => {
	const dispatch = useAppDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<TodoContent>({
		defaultValues: {
			description: '',
			name: ''
		}
	})

	const onSubmit: SubmitHandler<TodoContent> = ({ name, description }) => {
		dispatch(onAddTodo({ description, name }))
		reset()
	}

	return (
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
						{...register('name', { required: 'Task name is required' })}
						error={!!errors.name}
						helperText={errors.name?.message || 'Enter a task name'}
						label='Task name'
						variant='filled'
					/>
					<TextField
						{...register('description')}
						helperText='Enter a todo description'
						label='Description'
						variant='filled'
					/>
					<Button
						color='success'
						startIcon={<Add />}
						sx={{ alignSelf: 'end' }}
						type='submit'
						variant='contained'
					>
						add todo
					</Button>
				</Stack>
			</form>
		</Paper>
	)
}
