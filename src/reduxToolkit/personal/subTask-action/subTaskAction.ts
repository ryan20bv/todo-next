import { IMainTask, ISubTask } from "@/DUMMY_DATA/MODEL";
// import action from personalTodo Action
import {
	updateMainTaskListAction,
	setSelectedMainTaskAction,
} from "../personal-action/personalTodoAction";
// import reducer
import { updateIsSendingDataRed } from "../personal-slice/personalTodoSlice";

const formatDataToISubTask = (dataToFormat: any) => {
	const formattedData: ISubTask = {
		mainTaskId: dataToFormat.mainTask_id,
		subTaskId: dataToFormat._id,
		subTaskName: dataToFormat.subTaskName,
		isDone: dataToFormat.isDone,
	};

	return formattedData;
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
				maintask_id: selectedMainTask.mainTaskId,
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

			const { newSubTask, message } = data;
			if (message === "subTask Added!") {
				const formattedDataToSubTask = formatDataToISubTask(newSubTask);
				const copyOfSubTaskList: ISubTask[] = [];
				selectedMainTask.subTaskList.forEach((subTask: ISubTask) =>
					copyOfSubTaskList.push(subTask)
				);
				copyOfSubTaskList.push(formattedDataToSubTask);
				const copyOfSelectedMainTask: IMainTask = { ...selectedMainTask };
				const indexOfSelectedMainTask = mainTaskList.findIndex(
					(item: IMainTask) => item.mainTaskId === selectedMainTask.mainTaskId
				);

				copyOfSelectedMainTask.subTaskList = [...copyOfSubTaskList];
				dispatch(setSelectedMainTaskAction(copyOfSelectedMainTask));

				const copyOfMainTaskList: IMainTask[] = [];
				mainTaskList.forEach((mainTask: IMainTask) =>
					copyOfMainTaskList.push(mainTask)
				);
				copyOfMainTaskList[indexOfSelectedMainTask] = copyOfSelectedMainTask;

				dispatch(updateMainTaskListAction(copyOfMainTaskList));
				dispatch(updateIsSendingDataRed({ isSendingData: false }));
			}
		} catch (err) {
			console.log("addSubTaskAction", err);
		}
	};
