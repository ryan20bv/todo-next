import { ITask, ITodoDetails } from "@/DUMMY_DATA/MODEL";
import {
	setTodoDetailRed,
	resetIsInDetailsRed,
	updateIsLoadingRed,
} from "../todo-slice/detailSlice";
import { getAllTodoRed } from "../todo-slice/todoSlice";

export const setTodoDetailAction =
	(id: string) => async (dispatch: any, getState: any) => {
		dispatch(updateIsLoadingRed({ isLoading: true }));

		let { todoList } = getState().todoReducer;

		if (todoList.length === 0) {
			const allTodosAsString = window.localStorage.getItem("allTodos");

			if (allTodosAsString) {
				todoList = JSON.parse(allTodosAsString);
				await dispatch(getAllTodoRed({ allTodos: todoList }));
			}
		}
		const foundTodo = todoList.find((todo: ITask) => todo._id === id);

		dispatch(setTodoDetailRed({ todoDetails: foundTodo }));
		dispatch(updateIsLoadingRed({ isLoading: false }));
	};

export const resetIsInDetailsAction = () => async (dispatch: any) => {
	dispatch(resetIsInDetailsRed({}));
};
