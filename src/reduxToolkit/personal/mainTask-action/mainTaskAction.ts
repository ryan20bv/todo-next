import {
	IMainTask,
	INewMainTask,
	IUpdateMainTaskName,
} from "@/DUMMY_DATA/MODEL";
// import from personalTodoAction
import { updateMainTaskListAction } from "../personal-action/personalTodoAction";
// import from personalTodoSlice
import {
	updateIsSendingDataRed,
	setMainTakToEditRed,
} from "../personal-slice/personalTodoSlice";

export const addMainTaskAction =
	(data: INewMainTask) => async (dispatch: any, getState: any) => {
		// console.log("addMainTaskAction", data);
		dispatch(updateIsSendingDataRed({ isSendingData: true }));
		const { enteredMainTaskName, category_id, apiToken } = data;
		try {
			const bodyData = {
				enteredMainTaskName,
				category_id,
			};
			const url =
				process.env.NEXT_PUBLIC_BACK_END_URL + "/api/mainTask/createMainTask";
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + apiToken,
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
				const { mainTaskList } = getState().personalTodoReducer;
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
