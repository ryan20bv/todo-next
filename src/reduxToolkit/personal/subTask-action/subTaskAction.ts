import { IMainTask, ISubTask } from "@/DUMMY_DATA/MODEL";
// import action from personalTodo Action
import {
	updateMainTaskListAction,
	setSelectedMainTaskAction,
} from "../personal-action/personalTodoAction";
// import reducer
import {
	updateIsDeletingDataRed,
	updateIsSendingDataRed,
	setSubTaskToDeleteRed,
	updateMessageRed,
	updateIsUpdatingRed,
	setSubTaskToEditRed,
} from "../personal-slice/personalTodoSlice";

/* const formatDataToISubTask = (dataToFormat: any) => {
	const formattedData: ISubTask = {
		mainTaskId: dataToFormat.mainTask_id,
		subTaskId: dataToFormat._id,
		subTaskName: dataToFormat.subTaskName,
		isDone: dataToFormat.isDone,
	};

	return formattedData;
}; */
/* const formatDataToIMainTask = (dataToFormat: any) => {
	const formattedData: IMainTask = {
		categoryId: dataToFormat.category_id,
		mainTaskId: dataToFormat._id,
		mainTaskName: dataToFormat.mainTaskName,
		isAllSubTaskDone: dataToFormat.isAllSubTaskDone,
		subTaskList: [...dataToFormat.subTaskList],
	};

	return formattedData;
}; */

const updateMainTaskAndMainTaskListAction =
	(updatedMainTask: IMainTask) => async (dispatch: any, getState: any) => {
		const { mainTaskList } = getState().personalTodoReducer;
		dispatch(setSelectedMainTaskAction(updatedMainTask));
		const indexOfSelectedMainTask = mainTaskList.findIndex(
			(item: IMainTask) => item._id === updatedMainTask._id
		);

		const copyOfMainTaskList: IMainTask[] = [];
		mainTaskList.forEach((mainTask: IMainTask) =>
			copyOfMainTaskList.push(mainTask)
		);
		copyOfMainTaskList[indexOfSelectedMainTask] = updatedMainTask;
		dispatch(updateMainTaskListAction(copyOfMainTaskList));
	};

export const addSubTaskAction =
	(enteredSubTaskName: string) => async (dispatch: any, getState: any) => {
		if (!enteredSubTaskName || enteredSubTaskName.trim().length === 0) {
			console.log("no entered new Name");
			return;
		}
		dispatch(updateIsSendingDataRed({ isSendingData: true }));

		const { mainTaskList, selectedMainTask } = getState().personalTodoReducer;
		const { authData } = getState().authReducer;

		try {
			const bodyData = {
				enteredSubTaskName,
				maintask_id: selectedMainTask._id,
			};
			const url = process.env.NEXT_PUBLIC_BACK_END_URL + "/api/subtask/addSubtask";
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + authData.apiToken,
				},
				body: JSON.stringify(bodyData),
			};

			const response = await fetch(url, options);
			if (!response.ok) {
				dispatch(updateIsSendingDataRed({ isSendingData: false }));
				return;
			}

			const data = await response.json();

			const { updatedMainTask, message } = data;
			if (message === "subTask Added!") {
				await dispatch(updateMainTaskAndMainTaskListAction(updatedMainTask));
				/* dispatch(setSelectedMainTaskAction(updatedMainTask));
				const indexOfSelectedMainTask = mainTaskList.findIndex(
					(item: IMainTask) => item._id === selectedMainTask._id
				);
				const copyOfMainTaskList: IMainTask[] = [];
				mainTaskList.forEach((mainTask: IMainTask) =>
					copyOfMainTaskList.push(mainTask)
				);
				copyOfMainTaskList[indexOfSelectedMainTask] = updatedMainTask;

				dispatch(updateMainTaskListAction(copyOfMainTaskList)); */
				dispatch(updateIsSendingDataRed({ isSendingData: false }));
			}
		} catch (err) {
			console.log("addSubTaskAction", err);
			dispatch(updateIsSendingDataRed({ isSendingData: false }));
		}
	};
// checked
export const selectedSubTaskToDeleteAction =
	(subTask: ISubTask) => async (dispatch: any, getState: any) => {
		dispatch(updateIsUpdatingRed({ isUpdatingData: false }));
		dispatch(updateIsDeletingDataRed({ isDeletingData: true }));
		dispatch(setSubTaskToDeleteRed({ subTaskToDelete: subTask }));
	};

export const cancelDeleteSubTaskAction =
	() => async (dispatch: any, getState: any) => {
		dispatch(updateIsDeletingDataRed({ isDeletingData: false }));

		dispatch(setSubTaskToDeleteRed({ subTaskToDelete: {} as ISubTask }));
	};
// checked
export const confirmDeleteSubTaskAction =
	() => async (dispatch: any, getState: any) => {
		const { subTaskToDelete, selectedMainTask, mainTaskList } =
			getState().personalTodoReducer;
		const { authData } = getState().authReducer;

		dispatch(updateMessageRed({ updateMessage: "Deleting..." }));
		dispatch(updateIsUpdatingRed({ isUpdatingData: true }));
		try {
			const bodyData = {};
			const url =
				process.env.NEXT_PUBLIC_BACK_END_URL +
				"/api/subtask/deleteSubTask/" +
				subTaskToDelete._id;
			const options = {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + authData.apiToken,
				},
				body: JSON.stringify(bodyData),
			};

			const response = await fetch(url, options);
			if (!response.ok) {
				dispatch(updateIsUpdatingRed({ isUpdatingData: false }));
				return;
			}
			const data = await response.json();

			const { updatedMainTask, message } = data;
			if (message === "delete success") {
				await dispatch(updateMainTaskAndMainTaskListAction(updatedMainTask));
				/* dispatch(setSelectedMainTaskAction(updatedMainTask));
				const indexOfSelectedMainTask = mainTaskList.findIndex(
					(item: IMainTask) => item._id === updatedMainTask._id
				);

				const copyOfMainTaskList: IMainTask[] = [];
				mainTaskList.forEach((mainTask: IMainTask) =>
					copyOfMainTaskList.push(mainTask)
				);
				copyOfMainTaskList[indexOfSelectedMainTask] = updatedMainTask;

				dispatch(updateMainTaskListAction(copyOfMainTaskList)); */
				dispatch(updateIsUpdatingRed({ isUpdatingData: false }));
			}
		} catch (err) {
			console.log("confirmDeleteSubTaskAction", err);
			dispatch(updateIsUpdatingRed({ isUpdatingData: false }));
		}
		return { message: "done" };
	};
// checked
export const toggleSubTaskIsDoneAction =
	(subTaskId: string) => async (dispatch: any, getState: any) => {
		const { mainTaskList } = getState().personalTodoReducer;
		const { authData } = getState().authReducer;
		dispatch(updateMessageRed({ updateMessage: "Updating..." }));
		dispatch(updateIsUpdatingRed({ isUpdatingData: true }));
		try {
			const bodyData = {};
			const url =
				process.env.NEXT_PUBLIC_BACK_END_URL +
				"/api/subtask/toggleIsDone/" +
				subTaskId;
			const options = {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + authData.apiToken,
				},
				body: JSON.stringify(bodyData),
			};

			const response = await fetch(url, options);
			if (!response.ok) {
				dispatch(updateIsUpdatingRed({ isUpdatingData: false }));
				throw new Error("Error connection in toggle subTask isDone");
			}
			const data = await response.json();

			const { updatedMainTask, message } = data;
			if (message === "toggle success") {
				await dispatch(updateMainTaskAndMainTaskListAction(updatedMainTask));
				/* dispatch(setSelectedMainTaskAction(updatedMainTask));
				const indexOfSelectedMainTask = mainTaskList.findIndex(
					(item: IMainTask) => item._id === updatedMainTask._id
				);

				const copyOfMainTaskList: IMainTask[] = [];
				mainTaskList.forEach((mainTask: IMainTask) =>
					copyOfMainTaskList.push(mainTask)
				);
				copyOfMainTaskList[indexOfSelectedMainTask] = updatedMainTask;
				dispatch(updateMainTaskListAction(copyOfMainTaskList)); */
				dispatch(updateIsUpdatingRed({ isUpdatingData: false }));
			}
		} catch (err) {
			console.log("toggleSubTaskIsDoneAction", err);
			dispatch(updateIsUpdatingRed({ isUpdatingData: false }));
		}
		return { message: "done" };
	};

// checked
export const setSubTaskToEditAction =
	(selectedSubTask: ISubTask) => async (dispatch: any, getState: any) => {
		// setSubTaskToEditRed;
		dispatch(setSubTaskToEditRed({ subTaskToEdit: selectedSubTask }));
	};
export const cancelEditSubTaskAction =
	() => async (dispatch: any, getState: any) => {
		dispatch(setSubTaskToEditRed({ subTaskToEdit: {} as ISubTask }));
	};

export const confirmEdiSubTaskAction =
	(enteredSubTaskName: string) => async (dispatch: any, getState: any) => {
		if (!enteredSubTaskName || enteredSubTaskName.trim().length === 0) {
			return;
		}
		dispatch(updateIsSendingDataRed({ isSendingData: true }));

		const { subTaskToEdit } = getState().personalTodoReducer;
		const { authData } = getState().authReducer;
		try {
			const bodyData = {
				enteredNewSubTaskName: enteredSubTaskName,
			};
			const url =
				process.env.NEXT_PUBLIC_BACK_END_URL +
				"/api/subtask/editSubTaskName/" +
				subTaskToEdit._id;
			const options = {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + authData.apiToken,
				},
				body: JSON.stringify(bodyData),
			};

			const response = await fetch(url, options);

			if (!response.ok) {
				dispatch(updateIsSendingDataRed({ isSendingData: false }));
				return { message: "done" };
			}
			const data = await response.json();

			const { updatedMainTask, message } = data;
			if (message === "subtask updated") {
				await dispatch(updateMainTaskAndMainTaskListAction(updatedMainTask));
				dispatch(updateIsSendingDataRed({ isSendingData: false }));
			}
		} catch (err) {
			console.log("confirmEditMainTaskNameAction", err);
			dispatch(updateIsSendingDataRed({ isSendingData: false }));
		}
		return { message: "done" };
	};

// checked
export const deleteAllDoneSubTaskAction =
	() => async (dispatch: any, getState: any) => {
		dispatch(updateIsDeletingDataRed({ isDeletingData: true }));
	};

// checked
export const cancelDeleteAllDoneSubTaskAction =
	() => async (dispatch: any, getState: any) => {
		dispatch(updateIsDeletingDataRed({ isDeletingData: false }));
	};
// checked
export const confirmDeleteAllSubTaskIsDoneAction =
	() => async (dispatch: any, getState: any) => {
		const { selectedMainTask, mainTaskList } = getState().personalTodoReducer;
		const { authData } = getState().authReducer;
		let hasDoneSubTask: boolean = false;
		hasDoneSubTask = selectedMainTask.subTaskList.some(
			(subTask: ISubTask) => subTask.isDone === true
		);
		// dispatch(updateIsUpdatingRed({ isUpdatingData: false }));
		if (selectedMainTask.subTaskList.length <= 0 || !hasDoneSubTask) {
			console.log("NO subTask done");
			return { message: "done" };
		}

		dispatch(updateMessageRed({ updateMessage: "Deleting All done SubTask..." }));
		dispatch(updateIsUpdatingRed({ isUpdatingData: true }));

		try {
			const bodyData = {};
			const url =
				process.env.NEXT_PUBLIC_BACK_END_URL +
				"/api/subtask/deleteAllDone/" +
				selectedMainTask._id;
			const options = {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + authData.apiToken,
				},
				body: JSON.stringify(bodyData),
			};

			const response = await fetch(url, options);
			if (!response.ok) {
				// dispatch(updateIsUpdatingRed({ isUpdatingData: false }));
				return { message: "done" };
			}
			const data = await response.json();

			const { updatedMainTask, message } = data;
			if (message === "All Done deleted") {
				await dispatch(updateMainTaskAndMainTaskListAction(updatedMainTask));
				/* dispatch(setSelectedMainTaskAction(updatedMainTask));
				const indexOfSelectedMainTask = mainTaskList.findIndex(
					(item: IMainTask) => item._id === updatedMainTask._id
				);

				const copyOfMainTaskList: IMainTask[] = [];
				mainTaskList.forEach((mainTask: IMainTask) =>
					copyOfMainTaskList.push(mainTask)
				);
				copyOfMainTaskList[indexOfSelectedMainTask] = updatedMainTask;

				dispatch(updateMainTaskListAction(copyOfMainTaskList)); */
				// dispatch(updateIsUpdatingRed({ isUpdatingData: false }));
			}
		} catch (err) {
			console.log("deleteAllSubTaskIsDoneAction", err);
		}
		return { message: "done" };
	};
