import { Box } from '@mui/material'

import { Header, TodoList, TodoPanel } from '@/components'
import { useAppSelector } from '@/redux'

const App = () => {
	const todos = useAppSelector(state => state.todoList.todos)

	return (
		<Box alignItems='center' display='flex' flexDirection='column' width='45%'>
			<Header />
			<TodoPanel mode='add' />
			<TodoList todos={todos} />
		</Box>
	)
}

export default App
