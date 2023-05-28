import { ITask, IMainTask } from "./MODEL";

export const DUMMY_TODOS: IMainTask[] = [
	{
		categoryId: "Todo next js",
		mainTaskId: "t1",
		mainTaskName: "Study",
		isAllSubTaskDone: false,
		subTaskList: [
			{
				mainTaskId: "t1",
				subTaskId: "s1",
				subTaskName: "OOP Javascript",
				isDone: false,
			},
			{
				mainTaskId: "t1",
				subTaskId: "s2",
				subTaskName: "Science Books",
				isDone: false,
			},
			{
				mainTaskId: "t1",
				subTaskId: "s3",
				subTaskName: "English Language",
				isDone: true,
			},
		],
	},
	{
		categoryId: "Todo next js",
		mainTaskId: "t2",
		mainTaskName: "Exercise",
		isAllSubTaskDone: false,
		subTaskList: [
			{
				mainTaskId: "t2",
				subTaskId: "e1",
				subTaskName: "Walk the dog",
				isDone: true,
			},
			{
				mainTaskId: "t2",
				subTaskId: "e2",
				subTaskName: "Jogging",
				isDone: false,
			},
			{
				mainTaskId: "t2",
				subTaskId: "e3",
				subTaskName: "Swim",
				isDone: false,
			},
		],
	},
	{
		categoryId: "Todo next js",
		mainTaskId: "t3",
		mainTaskName: "House Hold Chore",
		isAllSubTaskDone: false,
		subTaskList: [
			{
				mainTaskId: "t3",
				subTaskId: "h1",
				subTaskName: "Sweep the Room",
				isDone: false,
			},
			{
				mainTaskId: "t3",
				subTaskId: "h2",
				subTaskName: "Wash the dishes",
				isDone: true,
			},
			{
				mainTaskId: "t3",
				subTaskId: "h3",
				subTaskName: "Lawn the grass",
				isDone: true,
			},
		],
	},
];

export const getAllTasks = () => {
	return DUMMY_TODOS;
};

/* {
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
	}, */
