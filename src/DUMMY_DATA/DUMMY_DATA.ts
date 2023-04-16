import { ITask } from "./MODEL";

export const DUMMY_TODOS: ITask[] = [
	{
		_id: "t1",
		name: "Study",
	},
	{
		_id: "t2",
		name: "Exercise",
	},
	{
		_id: "t3",
		name: "Swim",
	},
];

export const getAllTasks = () => {
	return DUMMY_TODOS;
};
