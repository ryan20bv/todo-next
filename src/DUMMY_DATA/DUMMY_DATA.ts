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
			},
			{
				_id: "s2",
				item: "Science Books",
			},
			{
				_id: "s3",
				item: "English Language",
			},
		],
	},
	{
		_id: "t2",
		name: "Exercise",
		isDone: true,
		details: [
			{
				_id: "e1",
				item: "Walk the dog",
			},
			{
				_id: "e2",
				item: "Jogging",
			},
			{
				_id: "e3",
				item: "Swim",
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
			},
			{
				_id: "h2",
				item: "Wash the dishes",
			},
			{
				_id: "h3",
				item: "Lawn the grass",
			},
		],
	},
];

export const getAllTasks = () => {
	return DUMMY_TODOS;
};
