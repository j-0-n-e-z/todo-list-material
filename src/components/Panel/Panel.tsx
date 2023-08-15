import { Add } from '@mui/icons-material'
import { Button, Paper, Stack, TextField } from '@mui/material'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { useAppDispatch } from '../../app/hooks'
import { onAddTodo } from '../../features/todolist/todoListSlice'

export const Panel = () => {
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

	const onSubmit: SubmitHandler<TodoContent> = todo => {
		dispatch(onAddTodo(todo))
		reset()
	}

	return (
		<Paper
			elevation={3}
			sx={{
				bgcolor: '#fefef0',
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
					<Button
						color='success'
						startIcon={<Add />}
						sx={{ alignSelf: 'end', width: 'fit-content' }}
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
