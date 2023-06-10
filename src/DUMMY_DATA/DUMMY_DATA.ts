import { IMainTask } from "./MODEL";

export const DUMMY_TODOS: IMainTask[] = [
	{
		_id: "t1",
		creator_id: "public",
		category_id: "Todo next js",
		mainTaskName: "Study",
		isAllSubTaskDone: false,
		subTaskList: [
			{
				_id: "s1",
				creator_id: "public",
				mainTask_id: "t1",
				subTaskName: "OOP Javascript",
				isDone: false,
			},
			{
				_id: "s2",
				creator_id: "public",
				mainTask_id: "t1",
				subTaskName: "Science Books",
				isDone: false,
			},
			{
				_id: "s3",
				creator_id: "public",
				mainTask_id: "t1",
				subTaskName: "English Language",
				isDone: true,
			},
		],
	},
	{
		_id: "t2",
		creator_id: "public",
		category_id: "Todo next js",
		mainTaskName: "Exercise",
		isAllSubTaskDone: false,
		subTaskList: [
			{
				_id: "e1",
				creator_id: "public",
				mainTask_id: "t2",
				subTaskName: "Walk the dog",
				isDone: true,
			},
			{
				_id: "e2",
				creator_id: "public",
				mainTask_id: "t2",
				subTaskName: "Jogging",
				isDone: false,
			},
			{
				_id: "e3",
				creator_id: "public",
				mainTask_id: "t2",
				subTaskName: "Swim",
				isDone: false,
			},
		],
	},
	{
		_id: "t3",
		creator_id: "public",
		category_id: "Todo next js",
		mainTaskName: "House Hold Chore",
		isAllSubTaskDone: false,
		subTaskList: [
			{
				_id: "h1",
				creator_id: "public",
				mainTask_id: "t3",
				subTaskName: "Sweep the Room",
				isDone: false,
			},
			{
				_id: "h2",
				creator_id: "public",
				mainTask_id: "t3",
				subTaskName: "Wash the dishes",
				isDone: true,
			},
			{
				_id: "h3",
				creator_id: "public",
				mainTask_id: "t3",
				subTaskName: "Lawn the grass",
				isDone: true,
			},
		],
	},
];

export const getAllTasks = () => {
	return DUMMY_TODOS;
};
