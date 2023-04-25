import { ITask, ITodoDetails } from "@/DUMMY_DATA/MODEL";
import {
	setTodoDetailRed,
	resetIsInDetailsRed,
	updateIsLoadingRed,
	addNewDetailsRed,
} from "../todo-slice/detailSlice";
import { updateTodoListAction } from "./todoAction";
import { getAllTodoRed } from "../todo-slice/todoSlice";
import { v4 as uuidv4 } from "uuid";

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

export const addNewDetailsAction =
	(detail: string, taskid: string) => async (dispatch: any, getState: any) => {
		let { todoList } = getState().todoReducer;
		let { todoDetails } = getState().detailReducer;
		const newDetail: ITodoDetails = {
			_id: uuidv4(),
			item: detail,
		};
		// console.log(newDetail);
		const copyOfTodoDetails = { ...todoDetails };
		// console.log(copyOfTodoDetails.details);
		copyOfTodoDetails.details = [...todoDetails.details, newDetail];

		let foundTodoIndex = todoList.findIndex((todo: ITask) => todo._id === taskid);

		let copyOfTodoList = [...todoList];
		copyOfTodoList[foundTodoIndex] = copyOfTodoDetails;
		dispatch(updateTodoListAction(copyOfTodoList));
		dispatch(addNewDetailsRed({ updatedTodoDetails: copyOfTodoDetails }));
	};
