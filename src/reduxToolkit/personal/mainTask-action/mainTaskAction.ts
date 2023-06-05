import { IMainTask, IUpdateMainTaskName } from "@/DUMMY_DATA/MODEL";
// import from personalTodoAction
import { updateMainTaskListAction } from "../personal-action/personalTodoAction";
// import from personalTodoSlice
import {
	updateIsSendingDataRed,
	setMainTakToEditRed,
} from "../personal-slice/personalTodoSlice";

const formatDataToIMainTask = (dataToFormat: any) => {
	const formattedData: IMainTask = {
		categoryId: dataToFormat.category_id,
		mainTaskId: dataToFormat._id,
		mainTaskName: dataToFormat.mainTaskName,
		isAllSubTaskDone: dataToFormat.isAllSubTaskDone,
		subTaskList: dataToFormat.subTaskList,
	};
	return formattedData;
};

export const addMainTaskAction =
	(enteredMainTaskName: string) => async (dispatch: any, getState: any) => {
		dispatch(updateIsSendingDataRed({ isSendingData: true }));

		const { mainTaskList, currentCategory } = getState().personalTodoReducer;
		const { authData } = getState().authReducer;
		if (!enteredMainTaskName || enteredMainTaskName.trim().length === 0) {
			console.log("no entered new Name");
			return;
		}
		try {
			const bodyData = {
				enteredMainTaskName,
				category_id: currentCategory.categoryId,
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
			// console.log(options);
			const response = await fetch(url, options);
			// console.log(response);
			const data = await response.json();
			// console.log(data);
			if (!response.ok) {
				dispatch(updateIsSendingDataRed({ isSendingData: false }));
				return;
			}
			if (data.message === "new Task Added!") {
				const newMainTask: IMainTask = {
					categoryId: data.newTask.category_id,
					mainTaskId: data.newTask._id,
					mainTaskName: data.newTask.mainTaskName,
					isAllSubTaskDone: data.newTask.isAllSubTaskDone,
					subTaskList: data.newTask.subTaskList,
				};
				const addNewMainTaskList: IMainTask[] = [...mainTaskList, newMainTask];
				dispatch(updateMainTaskListAction(addNewMainTaskList));
				dispatch(updateIsSendingDataRed({ isSendingData: false }));
			}
		} catch (err) {
			console.log("addMainTaskAction", err);
		}
	};

export const selectedMainTaskToEditAction =
	(mainTaskToEdit: IMainTask) => async (dispatch: any, getState: any) => {
		dispatch(setMainTakToEditRed({ mainTaskToEdit }));
	};

export const cancelEditMainTaskNameAction =
	() => async (dispatch: any, getState: any) => {
		dispatch(setMainTakToEditRed({ mainTaskToEdit: {} as IMainTask }));
	};

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
				mainTaskToEdit.mainTaskId;
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
					return item.mainTaskId === updatedMainTask._id;
				});

				const copyOfMainTaskList = [...mainTaskList];
				const formattedUpdatedMainTask: IMainTask =
					formatDataToIMainTask(updatedMainTask);
				copyOfMainTaskList[indexOfMainTask] = formattedUpdatedMainTask;
				dispatch(updateMainTaskListAction(copyOfMainTaskList));
			}
			dispatch(updateIsSendingDataRed({ isSendingData: false }));
		} catch (err) {
			console.log("confirmEditMainTaskNameAction", err);
		}
	};
