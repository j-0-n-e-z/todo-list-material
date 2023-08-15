import { Add } from '@mui/icons-material'
import { Box, Button, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'

import { useAppDispatch } from '../../app/hooks'
import { onAddTodo } from '../../features/todolist/todoListSlice'

const DEFAULT_TODO: TodoContent = {
	description: '',
	name: ''
}

export const Panel = () => {
	const [todo, setTodo] = useState<TodoContent>(DEFAULT_TODO)
	const [error, setError] = useState('')
	const dispatch = useAppDispatch()

	const onClick = () => {
		if (!todo.name || todo.name.trim().length === 0) {
			setError('Name is required')
			return
		}
		setTodo(DEFAULT_TODO)
		dispatch(onAddTodo(todo))
		setError('')
	}

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.currentTarget
		setTodo({ ...todo, [name]: value })
	}

	return (
		<Paper
			elevation={2}
			sx={{
				bgcolor: '#fefef0',
				borderRadius: 2,
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				mb: 4,
				padding: '20px',
				width: '100%'
			}}
		>
			<Box display='flex' gap={3} justifyContent='space-between'>
				<TextField
					required
					error={!!error}
					helperText={error || 'Enter a todo name'}
					label='Name'
					name='name'
					sx={{ flex: 2 }}
					value={todo.name}
					variant='filled'
					onChange={onChange}
				/>
				<TextField
					helperText='Enter a todo description'
					label='Description'
					name='description'
					sx={{ flex: 3 }}
					value={todo.description}
					variant='filled'
					onChange={onChange}
				/>
			</Box>
			<Button
				color='success'
				startIcon={<Add />}
				sx={{ alignSelf: 'end', width: 'fit-content' }}
				variant='contained'
				onClick={onClick}
			>
				add todo
			</Button>
		</Paper>
	)
}
