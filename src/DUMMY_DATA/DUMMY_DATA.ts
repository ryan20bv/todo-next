import { ITask } from "./MODEL";

export const DUMMY_TODOS: ITask[] = [
	{
		_id: "t1",
		name: "Study",
		isDone: false,
		details: [
			{
				_id: "s1",
				item: "OOP Javascript",
				isDone: false,
			},
			{
				_id: "s2",
				item: "Science Books",
				isDone: false,
			},
			{
				_id: "s3",
				item: "English Language",
				isDone: true,
			},
		],
	},
	{
		_id: "t2",
		name: "Exercise",
		isDone: false,
		details: [
			{
				_id: "e1",
				item: "Walk the dog",
				isDone: true,
			},
			{
				_id: "e2",
				item: "Jogging",
				isDone: false,
			},
			{
				_id: "e3",
				item: "Swim",
				isDone: false,
			},
		],
	},
	{
		_id: "t3",
		name: "House Hold Chore",
		isDone: false,
		details: [
			{
				_id: "h1",
				item: "Sweep the Room",
				isDone: false,
			},
			{
				_id: "h2",
				item: "Wash the dishes",
				isDone: true,
			},
			{
				_id: "h3",
				item: "Lawn the grass",
				isDone: true,
			},
		],
	},
];

export const getAllTasks = () => {
	return DUMMY_TODOS;
};
