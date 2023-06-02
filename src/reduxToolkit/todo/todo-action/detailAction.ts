import { IMainTask, ISubTask } from "@/DUMMY_DATA/MODEL";
import {
	updateIsLoadingRed,
	setSubTaskToEditRed,
} from "../todo-slice/detailSlice";

import { updateTodoListAction, setSelectedTodoAction } from "./todoAction";
import { v4 as uuidv4 } from "uuid";

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

		const copyOfTodoDetails: IMainTask = { ...selectedTodo };

		copyOfTodoDetails.subTaskList = [...selectedTodo.subTaskList, newSubTodo];

		await dispatch(updateLisOfTodoAction(copyOfTodoDetails));
		dispatch(setSelectedTodoAction(copyOfTodoDetails));
	};

// checked
export const deleteSubTodoAction =
	(subTodo_Id: string) => async (dispatch: any, getState: any) => {
		let { selectedTodo } = getState().todoReducer;
		let copyOfTodoDetails: IMainTask = { ...selectedTodo };
		let updatedTodoDetails = selectedTodo.subTaskList.filter(
			(subTask: ISubTask) => subTask.subTaskId !== subTodo_Id
		);

		copyOfTodoDetails.subTaskList = [...updatedTodoDetails];
		await dispatch(updateLisOfTodoAction(copyOfTodoDetails));
		dispatch(setSelectedTodoAction(copyOfTodoDetails));
	};
// checked
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

// checked
export const selectSubTodoToEditAction =
	(subTaskToEdit: ISubTask) => async (dispatch: any) => {
		dispatch(setSubTaskToEditRed({ subTaskToEdit }));
	};
// checked
export const cancelSubTodoEditingAction = () => async (dispatch: any) => {
	dispatch(setSubTaskToEditRed({} as ISubTask));
};
// checked
export const confirmSubTodoEditingAction =
	(newSubTodoName: string) => async (dispatch: any, getState: any) => {
		let { selectedTodo } = getState().todoReducer;
		let { subTaskToEdit } = getState().detailReducer;
		let copyOfSelectedTodo: IMainTask = { ...selectedTodo };
		// let copyOfSubTodoList: ISubTask[] = [...selectedTodo.subTaskList];
		let copyOfSubTodoList: ISubTask[] = selectedTodo.subTaskList.map(
			(subTodo: ISubTask) => ({
				...subTodo,
			})
		);

		let subTaskIndex = copyOfSubTodoList.findIndex(
			(subTodo: ISubTask) => subTodo.subTaskId === subTaskToEdit.subTaskId
		);

		copyOfSubTodoList[subTaskIndex].subTaskName = newSubTodoName;

		copyOfSelectedTodo.subTaskList = [...copyOfSubTodoList];

		await dispatch(updateLisOfTodoAction(copyOfSelectedTodo));
		dispatch(setSelectedTodoAction(copyOfSelectedTodo));
	};
// ?working on
export const toggleSubTodoIsDoneAction =
	(subTodo_id: string) => async (dispatch: any, getState: any) => {
		console.log(subTodo_id);
		let { selectedTodo } = getState().todoReducer;
		let copyOfSelectedTodo: IMainTask = { ...selectedTodo };
		let copyOfSubTodoList: ISubTask[] = selectedTodo.subTaskList.map(
			(subTodo: ISubTask) => ({
				...subTodo,
			})
		);
		let subTaskIndex = copyOfSubTodoList.findIndex(
			(subTodo: ISubTask) => subTodo.subTaskId === subTodo_id
		);

		copyOfSubTodoList[subTaskIndex].isDone =
			!copyOfSubTodoList[subTaskIndex].isDone;

		copyOfSelectedTodo.subTaskList = [...copyOfSubTodoList];
		// let { todoDetails } = getState().detailReducer;
		// let copyOfTodoDetails: ITask = { ...todoDetails };
		// let copyOfDetails: ITodoDetails[] = todoDetails.details.map(
		// 	(detail: ITodoDetails) => ({
		// 		...detail,
		// 	})
		// );
		// const foundDetailIndex = copyOfTodoDetails.details.findIndex(
		// 	(detail: ITodoDetails) => detail._id === detail_id
		// );
		// copyOfDetails[foundDetailIndex].isDone =
		// 	!copyOfDetails[foundDetailIndex].isDone;
		// copyOfTodoDetails.details = [...copyOfDetails];
		// dispatch(toggleDetailIsDoneRed({ updatedTodoDetails: copyOfTodoDetails }));
		// dispatch(updateLisOfTodoAction(copyOfTodoDetails));
		await dispatch(updateLisOfTodoAction(copyOfSelectedTodo));
		dispatch(setSelectedTodoAction(copyOfSelectedTodo));
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
