import { IMainTask, IUpdateMainTaskName } from "@/DUMMY_DATA/MODEL";
// import from personalTodoAction
import { updateMainTaskListAction } from "../personal-action/personalTodoAction";
// import from personalTodoSlice
import {
	updateIsSendingDataRed,
	setMainTaskToEditRed,
	setMainTaskToDeleteRed,
	updateIsDeletingDataRed,
	updateIsUpdatingRed,
	updateMessageRed,
} from "../personal-slice/personalTodoSlice";

// const formatDataToIMainTask = (dataToFormat: any) => {
// 	const formattedData: IMainTask = {
// 		categoryId: dataToFormat.category_id,
// 		mainTaskId: dataToFormat._id,
// 		mainTaskName: dataToFormat.mainTaskName,
// 		isAllSubTaskDone: dataToFormat.isAllSubTaskDone,
// 		subTaskList: [...dataToFormat.subTaskList],
// 	};

// 	return formattedData;
// };
// checked
export const addMainTaskAction =
	(enteredMainTaskName: string) => async (dispatch: any, getState: any) => {
		dispatch(updateIsSendingDataRed({ isSendingData: true }));

		const { currentCategory } = getState().personalTodoReducer;
		const { authData } = getState().authReducer;
		if (!enteredMainTaskName || enteredMainTaskName.trim().length === 0) {
			console.log("no entered new Name");
			return;
		}
		try {
			const bodyData = {
				enteredMainTaskName,
				category_id: currentCategory._id,
			};
			const url =
				process.env.NEXT_PUBLIC_BACK_END_URL + "/api/mainTask/createMainTask";
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + authData.apiToken,
				},
				body: JSON.stringify(bodyData),
			};

			const response = await fetch(url, options);
			const data = await response.json();

			if (!response.ok) {
				dispatch(updateIsSendingDataRed({ isSendingData: false }));
				return;
			}

			const { updatedMainTaskList, message } = data;
			if (message === "new Task Added!") {
				// const newMainTask = formatDataToIMainTask(data.newTask);
				// const addNewMainTaskList: IMainTask[] = [...mainTaskList, data.newTask];
				dispatch(updateMainTaskListAction(updatedMainTaskList));
				dispatch(updateIsSendingDataRed({ isSendingData: false }));
			}
		} catch (err) {
			console.log("addMainTaskAction", err);
			dispatch(updateIsSendingDataRed({ isSendingData: false }));
		}
	};
// checked
export const selectedMainTaskToEditAction =
	(mainTaskToEdit: IMainTask) => async (dispatch: any, getState: any) => {
		dispatch(setMainTaskToEditRed({ mainTaskToEdit }));
	};
// checked
export const cancelEditMainTaskNameAction =
	() => async (dispatch: any, getState: any) => {
		dispatch(setMainTaskToEditRed({ mainTaskToEdit: {} as IMainTask }));
	};
// checked
export const confirmEditMainTaskNameAction =
	(enteredNewMainTaskName: string) => async (dispatch: any, getState: any) => {
		if (!enteredNewMainTaskName || enteredNewMainTaskName.trim().length === 0) {
			return;
		}
		dispatch(updateIsSendingDataRed({ isSendingData: true }));
		const { mainTaskList, mainTaskToEdit } = getState().personalTodoReducer;
		const { authData } = getState().authReducer;
		try {
			const bodyData = {
				enteredNewMainTaskName,
			};
			const url =
				process.env.NEXT_PUBLIC_BACK_END_URL +
				"/api/mainTask/editMainTask/" +
				mainTaskToEdit._id;
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
				return;
			}
			const data = await response.json();

			const { updatedMainTask, message } = data;
			if (message === "update success") {
				const indexOfMainTask = mainTaskList.findIndex((item: IMainTask) => {
					return item._id === updatedMainTask._id;
				});

				const copyOfMainTaskList = [...mainTaskList];
				// const formattedUpdatedMainTask: IMainTask =
				// 	formatDataToIMainTask(updatedMainTask);
				copyOfMainTaskList[indexOfMainTask] = updatedMainTask;
				dispatch(updateMainTaskListAction(copyOfMainTaskList));
			}
			dispatch(updateIsSendingDataRed({ isSendingData: false }));
		} catch (err) {
			console.log("confirmEditMainTaskNameAction", err);
		}
	};

// checked
export const setMainTaskToDeleteAction =
	(mainTask: IMainTask) => async (dispatch: any, getState: any) => {
		dispatch(updateIsUpdatingRed({ isUpdatingData: false }));
		dispatch(updateIsDeletingDataRed({ isDeletingData: true }));
		dispatch(setMainTaskToDeleteRed({ mainTaskToDelete: mainTask }));
	};
// checked
export const cancelMainTaskToDeleteAction =
	() => async (dispatch: any, getState: any) => {
		dispatch(updateIsDeletingDataRed({ isDeletingData: false }));
		dispatch(setMainTaskToDeleteRed({ mainTaskToDelete: {} as IMainTask }));
	};

// checked
export const confirmDeleteMainTaskAction =
	() => async (dispatch: any, getState: any) => {
		const { mainTaskList, mainTaskToDelete } = getState().personalTodoReducer;
		const { authData } = getState().authReducer;
		// dispatch(updateIsDeletingDataRed({ isDeletingData: true }));
		dispatch(updateIsUpdatingRed({ isUpdatingData: false }));
		dispatch(updateMessageRed({ updateMessage: "Deleting..." }));
		dispatch(updateIsUpdatingRed({ isUpdatingData: true }));
		try {
			const bodyData = {};
			const url =
				process.env.NEXT_PUBLIC_BACK_END_URL +
				"/api/mainTask/deleteMainTask/" +
				mainTaskToDelete._id;
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
				// dispatch(updateIsDeletingDataRed({ isDeletingData: false }));
				// dispatch(updateIsUpdatingRed({ isUpdatingData: false }));
				return;
			}
			const data = await response.json();

			const { updatedMainTaskList, message } = data;

			if (message === "delete success") {
				// const updatedMainTaskList = mainTaskList.filter(
				// 	(mainTask: IMainTask) => mainTask._id !== mainTaskToDelete._id
				// );
				dispatch(updateMainTaskListAction(updatedMainTaskList));
			}
			// dispatch(updateIsDeletingDataRed({ isDeletingData: false }));
			// dispatch(updateIsUpdatingRed({ isUpdatingData: false }));

			return { message: "success" };
		} catch (err) {
			console.log("confirmDeleteMainTaskAction", err);
			// dispatch(updateIsDeletingDataRed({ isDeletingData: false }));
			// dispatch(updateIsUpdatingRed({ isUpdatingData: false }));
		}
	};

// checked
export const deleteAllDoneMainTaskAction =
	() => async (dispatch: any, getState: any) => {
		dispatch(updateIsUpdatingRed({ isUpdatingData: false }));
		dispatch(updateIsDeletingDataRed({ isDeletingData: true }));
	};

// checked
export const cancelDeleteAllDoneMainTaskAction =
	() => async (dispatch: any, getState: any) => {
		dispatch(updateIsDeletingDataRed({ isDeletingData: false }));
	};

// checked
export const confirmDeleteAllSubTaskIsDoneAction =
	() => async (dispatch: any, getState: any) => {
		console.log("confirmDeleteAllSubTaskIsDone");
		const { currentCategory } = getState().personalTodoReducer;
		const { authData } = getState().authReducer;

		dispatch(updateIsUpdatingRed({ isUpdatingData: false }));
		dispatch(updateMessageRed({ updateMessage: "Deleting..." }));
		dispatch(updateIsUpdatingRed({ isUpdatingData: true }));

		try {
			const bodyData = {};
			const url =
				process.env.NEXT_PUBLIC_BACK_END_URL +
				"/api/mainTask/deleteAllDone/" +
				currentCategory._id;
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
				dispatch(updateIsSendingDataRed({ isSendingData: false }));
				return;
			}
			const data = await response.json();
			const { updatedMainTask, message } = data;
			if (message === "mainTask updated") {
				dispatch(updateMainTaskListAction(updatedMainTask));
			}
		} catch (err) {
			console.log("confirmDeleteMainTaskAction", err);
		}

		return { message: "done" };
	};
