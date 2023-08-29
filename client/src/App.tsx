import { Box } from '@mui/material'

import { Header, TodoList, TodoPanel } from '@/components'

const App = () => (
	<Box alignItems='center' display='flex' flexDirection='column' width='45%'>
		<Header />
		<TodoPanel />
		<TodoList />
	</Box>
)

export default App
