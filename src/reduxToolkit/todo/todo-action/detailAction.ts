import { IMainTask, ISubTask } from "@/DUMMY_DATA/MODEL";
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
import { updateTodoListAction, setSelectedTodoAction } from "./todoAction";
import { v4 as uuidv4 } from "uuid";

export const resetIsInDetailsAction = () => async (dispatch: any) => {
	dispatch(resetIsInDetailsRed({}));
};

// checked
export const addNewSubTodoAction =
	(newSubTodoName: string, mainTodoId: string) =>
	async (dispatch: any, getState: any) => {
		let { selectedTodo } = getState().todoReducer;
		const newSubTodo: ISubTask = {
			subTaskId: uuidv4(),
			subTaskName: newSubTodoName,
			isDone: false,
			mainTaskId: mainTodoId,
		};
		console.log(newSubTodoName);
		console.log(selectedTodo);

		const copyOfTodoDetails: IMainTask = { ...selectedTodo };

		copyOfTodoDetails.subTaskList = [...selectedTodo.subTaskList, newSubTodo];

		await dispatch(updateLisOfTodoAction(copyOfTodoDetails));
		dispatch(setSelectedTodoAction(copyOfTodoDetails));
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
	(updatedTodo: IMainTask) => async (dispatch: any, getState: any) => {
		let { mainTodoList } = getState().todoReducer;
		let copyOfMainTodoList = [...mainTodoList];
		const todoDetailsIndex = copyOfMainTodoList.findIndex(
			(todo: IMainTask) => todo.mainTaskId === updatedTodo.mainTaskId
		);
		let mainTodoIsDone: boolean = updatedTodo.subTaskList.every(
			(detail: ISubTask) => detail.isDone === true
		);
		const copyOfSingleTodo: IMainTask = { ...updatedTodo };
		copyOfSingleTodo.isAllSubTaskDone = mainTodoIsDone;
		copyOfMainTodoList[todoDetailsIndex] = { ...copyOfSingleTodo };
		dispatch(updateTodoListAction(copyOfMainTodoList));
	};

export const deleteDetailAction =
	(detail_id: string) => async (dispatch: any, getState: any) => {
		let { todoDetails } = getState().detailReducer;
		let copyOfTodoDetails: ITask = { ...todoDetails };
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

export const deleteAllDoneDetailAction =
	() => async (dispatch: any, getState: any) => {
		let { todoDetails } = getState().detailReducer;

		let copyOfTodoDetails: ITask = { ...todoDetails };
		let updatedDetailsAfterDeleteAllDone = todoDetails.details.filter(
			(detail: ITodoDetails) => detail.isDone === false
		);

		copyOfTodoDetails.details = updatedDetailsAfterDeleteAllDone;
		dispatch(updateTodoDetailsRed({ updatedTodoDetails: copyOfTodoDetails }));
		dispatch(updateLisOfTodoAction(copyOfTodoDetails));
	};
