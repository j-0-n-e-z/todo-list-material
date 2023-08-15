import { Box, Typography } from '@mui/material'
import type { FC } from 'react'

import type { Todo } from '../../App'

interface HeaderProps {
	todoList: Todo[]
}

export const Header: FC<HeaderProps> = ({ todoList }) => {
	const doneCount = todoList.filter(todo => todo.done).length

	return (
		<Box>
			<Typography
				gutterBottom
				component='h1'
				sx={{ fontSize: 35, mb: 3 }}
				variant='h3'
			>
				Todo List ({doneCount}/{todoList.length})
			</Typography>
		</Box>
	)
}
