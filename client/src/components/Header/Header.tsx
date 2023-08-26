import { Box, Typography } from '@mui/material'

import { useAppSelector } from '@/redux'

export const Header = () => {
	const todos = useAppSelector(state => state.todoList.todos)
	const doneCount = todos.filter(todo => todo.done).length

	return (
		<Box>
			<Typography
				gutterBottom
				component='h1'
				sx={{ fontSize: 35, my: 4 }}
				variant='h3'
			>
				Todo List ({doneCount}/{todos.length})
			</Typography>
		</Box>
	)
}
