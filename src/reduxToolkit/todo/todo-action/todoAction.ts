import { getAllTasks } from "@/DUMMY_DATA/DUMMY_DATA";
import {
	getAllTodoRed,
	updateFirstLoadRed,
	addNewTodoRed,
} from "../todo-slice/todoSlice";

import { ITask } from "@/DUMMY_DATA/MODEL";
import { v4 as uuidv4 } from "uuid";

export const getAllTodoAction = () => async (dispatch: any) => {
	dispatch(updateFirstLoadRed({ firstLoad: true }));
	const allTodos = getAllTasks();
	console.log(allTodos);
	dispatch(getAllTodoRed({ allTodos }));
	dispatch(updateFirstLoadRed({ firstLoad: false }));
};

export const addNewTodoAction =
	(newTask: string) => async (dispatch: any, getState: any) => {
		const newTodo: ITask = {
			_id: uuidv4(),
			name: newTask,
			isDone: false,
		};

		// console.log(getState().todoReducer);
		const { todoList } = getState().todoReducer;
		const updatedTodos = [...todoList, newTodo];
		dispatch(addNewTodoRed({ updatedTodos }));
	};
