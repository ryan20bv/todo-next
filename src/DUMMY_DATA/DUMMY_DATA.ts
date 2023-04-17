import { ITask } from "./MODEL";

export const DUMMY_TODOS: ITask[] = [
	{
		_id: "t1",
		name: "Study",
		isDone: false,
	},
	{
		_id: "t2",
		name: "Exercise",
		isDone: true,
	},
	{
		_id: "t3",
		name: "Swim",
		isDone: false,
	},
];

export const getAllTasks = () => {
	return DUMMY_TODOS;
};
