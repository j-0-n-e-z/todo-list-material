import { Box } from '@mui/material'
import { useEffect } from 'react'

import { Header, TodoList, TodoPanel } from '@/components'

import {
	fetchTodos,
	getAllTodos,
	getTodosError,
	getTodosStatus,
	useAppDispatch,
	useAppSelector
} from './redux'

const App = () => {
	const dispatch = useAppDispatch()

	const todos = useAppSelector(getAllTodos)
	const todosStatus = useAppSelector(getTodosStatus)
	const todosError = useAppSelector(getTodosError)

	useEffect(() => {
		dispatch(fetchTodos())
	}, [])

	if (todosStatus === 'loading') return <div>Loading...</div>

	if (todosError) return <div>Error: {todosError}</div>

	return (
		<Box alignItems='center' display='flex' flexDirection='column' width='45%'>
			<Header />
			<TodoPanel mode='add' />
			<TodoList todos={todos || []} />
		</Box>
	)
}

export default App
