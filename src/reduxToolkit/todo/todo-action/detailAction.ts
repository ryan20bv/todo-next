import { ITask, ITodoDetails } from "@/DUMMY_DATA/MODEL";
import {
	setTodoDetailRed,
	resetIsInDetailsRed,
	updateIsLoadingRed,
	addNewDetailsRed,
	toggleDetailIsDoneRed,
	updateTodoDetailsRed,
	updateDetailEditingStatusRed,
	resetIsDetailEditingRed,
	updateTodoDetailsAfterEditRed,
} from "../todo-slice/detailSlice";
import { updateFirstLoadRed } from "../todo-slice/todoSlice";
import {
	updateTodoListAction,
	// updateFilteredTodoListAction,
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

				dispatch(getAllTodoRed({ allTodos: todoList }));
				// dispatch(updateFilteredTodoListAction(selectedTab));
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
		let { todoDetails } = getState().detailReducer;
		const newDetail: ITodoDetails = {
			_id: uuidv4(),
			item: detail,
			isDone: false,
		};

		const copyOfTodoDetails = { ...todoDetails };

		copyOfTodoDetails.details = [...todoDetails.details, newDetail];

		dispatch(addNewDetailsRed({ updatedTodoDetails: copyOfTodoDetails }));
		dispatch(updateLisOfTodoAction(copyOfTodoDetails));
	};

export const toggleDetailIsDoneAction =
	(detail_id: string) => async (dispatch: any, getState: any) => {
		let { todoDetails } = getState().detailReducer;
		let copyOfTodoDetails: ITask = { ...todoDetails };
		let copyOfDetails: ITodoDetails[] = todoDetails.details.map(
			(detail: ITodoDetails) => ({
				...detail,
			})
		);
		const foundDetailIndex = copyOfTodoDetails.details.findIndex(
			(detail: ITodoDetails) => detail._id === detail_id
		);
		copyOfDetails[foundDetailIndex].isDone =
			!copyOfDetails[foundDetailIndex].isDone;
		copyOfTodoDetails.details = [...copyOfDetails];
		dispatch(toggleDetailIsDoneRed({ updatedTodoDetails: copyOfTodoDetails }));
		dispatch(updateLisOfTodoAction(copyOfTodoDetails));
	};

export const updateLisOfTodoAction =
	(updatedTodo: ITask) => async (dispatch: any, getState: any) => {
		let { todoList } = getState().todoReducer;
		let copyOfTodoList = [...todoList];
		const todoDetailsIndex = copyOfTodoList.findIndex(
			(todo: ITask) => todo._id === updatedTodo._id
		);
		copyOfTodoList[todoDetailsIndex] = { ...updatedTodo };
		dispatch(updateTodoListAction(copyOfTodoList));
	};

export const deleteDetailAction =
	(detail_id: string) => async (dispatch: any, getState: any) => {
		let { todoDetails } = getState().detailReducer;
		let copyOfTodoDetails = { ...todoDetails };
		let updatedTodoDetails = todoDetails.details.filter(
			(detail: ITodoDetails) => detail._id !== detail_id
		);
		copyOfTodoDetails.details = [...updatedTodoDetails];
		dispatch(updateTodoDetailsRed({ updatedTodoDetails: copyOfTodoDetails }));
		dispatch(updateLisOfTodoAction(copyOfTodoDetails));
	};

export const selectDetailToEditAction =
	(detailToEdit: ITodoDetails) => async (dispatch: any) => {
		dispatch(
			updateDetailEditingStatusRed({ isDetailEditingStatus: true, detailToEdit })
		);
	};

export const cancelDetailEditingAction = () => async (dispatch: any) => {
	dispatch(resetIsDetailEditingRed({}));
};

export const confirmDetailEditingAction =
	(updatedDetail: string) => async (dispatch: any, getState: any) => {
		let { todoDetails, detailToEdit } = getState().detailReducer;
		let copyOfTodoDetails = { ...todoDetails };

		let copyOfDetails: ITodoDetails[] = todoDetails.details.map(
			(detail: ITodoDetails) => ({
				...detail,
			})
		);

		let detailIndex = copyOfDetails.findIndex(
			(detail: ITodoDetails) => detail._id === detailToEdit._id
		);

		copyOfDetails[detailIndex].item = updatedDetail;

		copyOfTodoDetails.details = copyOfDetails;

		dispatch(
			updateTodoDetailsAfterEditRed({ updatedTodoDetails: copyOfTodoDetails })
		);
		dispatch(updateLisOfTodoAction(copyOfTodoDetails));
	};
