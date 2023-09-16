interface Todo {
	id: string
	description: string
	done: boolean
	name: string
}

interface TodoContent extends Omit<Todo, 'id' | 'done'> {}