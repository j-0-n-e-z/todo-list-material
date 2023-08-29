import { v4 as uuid } from 'uuid'

export const initialTodoList = {
	todos: [
		{
			description: 'Lorem ipsum dolor sit.',
			done: false,
			id: uuid(),
			name: 'Tester'
		},
		{
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dolorum delectus tenetur deserunt id nesciunt quas, et eius provident similique amet. Nam delectus facilis praesentium id debitis! Esse nulla vel voluptatum quaerat.',
			done: false,
			id: uuid(),
			name: 'Sample Text'
		},
		{
			description:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, quos?',
			done: true,
			id: uuid(),
			name: 'Lorem, ipsum'
		},
		{
			description:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, quos?',
			done: true,
			id: uuid(),
			name: 'Watch Openheimer'
		}
	]
}
