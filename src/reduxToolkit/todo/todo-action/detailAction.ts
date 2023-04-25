import { ITask, ITodoDetails } from "@/DUMMY_DATA/MODEL";
import {
	setTodoDetailRed,
	resetIsInDetailsRed,
	updateIsLoadingRed,
	addNewDetailsRed,
	toggleDetailIsDoneRed,
} from "../todo-slice/detailSlice";
import { updateFirstLoadRed } from "../todo-slice/todoSlice";
import {
	updateTodoListAction,
	updateFilteredTodoListAction,
} from "./todoAction";
import { getAllTodoRed } from "../todo-slice/todoSlice";
import { v4 as uuidv4 } from "uuid";

export const setTodoDetailAction =
	(id: string) => async (dispatch: any, getState: any) => {
		dispatch(updateIsLoadingRed({ isLoading: true }));

		let { todoList, selectedTab } = getState().todoReducer;

		if (todoList.length === 0) {
			const allTodosAsString = window.localStorage.getItem("allTodos");

			if (allTodosAsString) {
				todoList = JSON.parse(allTodosAsString);
				dispatch(updateFirstLoadRed(false));

				await dispatch(getAllTodoRed({ allTodos: todoList }));
				dispatch(updateFilteredTodoListAction(selectedTab));
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
			isDone: false,
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

export const toggleDetailIsDoneAction =
	(detail_id: string) => async (dispatch: any, getState: any) => {
		let { todoDetails } = getState().detailReducer;
		let { todoList } = getState().todoReducer;
		let copyOfTodoList = [...todoList];
		const todoDetailsIndex = copyOfTodoList.findIndex(
			(todo: ITask) => todo._id === todoDetails._id
		);

		let copyOfTodoDetails: ITask = { ...todoDetails };
		let copyOfDetails: ITodoDetails[] = todoDetails.details.map(
			(detail: ITodoDetails) => ({
				...detail,
			})
		);
		const foundDetailIndex = copyOfTodoDetails.details.findIndex(
			(detail: ITodoDetails) => detail._id === detail_id
		);
		copyOfDetails[foundDetailIndex].isDone = true;
		copyOfTodoDetails.details = [...copyOfDetails];
		// console.log(copyOfTodoDetails.details[foundDetailIndex].isDone);

		dispatch(toggleDetailIsDoneRed({ updatedTodoDetails: copyOfTodoDetails }));

		copyOfTodoList[todoDetailsIndex] = { ...copyOfTodoDetails };

		dispatch(updateTodoListAction(copyOfTodoList));
	};
