import type { Todo } from '../App'

export interface TodoContent extends Omit<Todo, 'id' | 'done'> {}
