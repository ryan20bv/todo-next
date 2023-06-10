import { IMainTask, ISubTask } from "@/DUMMY_DATA/MODEL";
import { setSubTaskToEditRed } from "../todo-slice/detailSlice";

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
	(subTaskToDelete: ISubTask) => async (dispatch: any, getState: any) => {
		let { selectedTodo } = getState().todoReducer;
		let copyOfTodoDetails: IMainTask = { ...selectedTodo };
		let updatedTodoDetails = selectedTodo.subTaskList.filter(
			(subTask: ISubTask) => subTask._id !== subTaskToDelete._id
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
			(todo: IMainTask) => todo._id === updatedTodo._id
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
// checked
export const toggleSubTodoIsDoneAction =
	(subTodo_id: string) => async (dispatch: any, getState: any) => {
		let { selectedTodo } = getState().todoReducer;
		let copyOfSelectedTodo: IMainTask = { ...selectedTodo };
		let copyOfSubTodoList: ISubTask[] = selectedTodo.subTaskList.map(
			(subTodo: ISubTask) => ({
				...subTodo,
			})
		);
		let subTaskIndex = copyOfSubTodoList.findIndex(
			(subTodo: ISubTask) => subTodo._id === subTodo_id
		);

		copyOfSubTodoList[subTaskIndex].isDone =
			!copyOfSubTodoList[subTaskIndex].isDone;

		copyOfSelectedTodo.subTaskList = [...copyOfSubTodoList];

		await dispatch(updateLisOfTodoAction(copyOfSelectedTodo));
		dispatch(setSelectedTodoAction(copyOfSelectedTodo));
	};

export const deleteAllDoneDetailAction =
	() => async (dispatch: any, getState: any) => {
		let { selectedTodo } = getState().todoReducer;
		let copyOfSelectedTodo: IMainTask = { ...selectedTodo };
		let updatedSubTaskListAfterDeleteAllDone =
			copyOfSelectedTodo.subTaskList.filter(
				(subTask: ISubTask) => subTask.isDone === false
			);

		copyOfSelectedTodo.subTaskList = [...updatedSubTaskListAfterDeleteAllDone];

		await dispatch(updateLisOfTodoAction(copyOfSelectedTodo));
		dispatch(setSelectedTodoAction(copyOfSelectedTodo));
	};
