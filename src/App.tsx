import { Box } from '@mui/material'

import { useAppSelector } from './app/hooks'
import { Header, TodoList, TodoPanel } from './components'

const App = () => {
	const todoList = useAppSelector(state => state.todoList.todos)

	return (
		<Box alignItems='center' display='flex' flexDirection='column' width='45%'>
			<Header todoList={todoList} />
			<TodoPanel mode='add' />
			<TodoList todoList={todoList} />
		</Box>
	)
}

export default App
