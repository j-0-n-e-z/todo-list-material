/* eslint-disable react/destructuring-assignment */
import { Add, Cancel, Edit } from '@mui/icons-material'
import { Box, Button, Paper, Stack, TextField } from '@mui/material'
import type { FC } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { useAppDispatch } from '../../app/hooks'
import { onAddTodo, onChangeTodo } from '../../features/todolist/todoListSlice'

interface AddTodoProps {
	mode: 'add'
}

interface EditTodoProps {
	mode: 'edit'
	onEditTodo: (id: Todo['id'] | null) => void
	todo: Todo
}

type TodoPanelProps = AddTodoProps | EditTodoProps

export const TodoPanel: FC<TodoPanelProps> = props => {
	const isEdit = props.mode === 'edit'

	const dispatch = useAppDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<TodoContent>({
		defaultValues: {
			description: isEdit ? props.todo.description : '',
			name: isEdit ? props.todo.name : ''
		}
	})

	const onSubmit: SubmitHandler<TodoContent> = data => {
		if (!isEdit) {
			dispatch(onAddTodo(data))
			reset()
		} else if (isEdit) {
			dispatch(onChangeTodo({ id: props.todo.id, ...data }))
			props.onEditTodo(null)
		}
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
					{isEdit ? (
						<Box alignSelf='end' display='flex' gap={3}>
							<Button
								color='error'
								startIcon={<Cancel />}
								onClick={() => props.onEditTodo(null)}
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
					) : (
						<Button
							color='success'
							startIcon={<Add />}
							sx={{ alignSelf: 'end' }}
							type='submit'
							variant='contained'
						>
							add todo
						</Button>
					)}
				</Stack>
			</form>
		</Paper>
	)
}
