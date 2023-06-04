import { IMainTask, INewMainTask } from "@/DUMMY_DATA/MODEL";
import { updateMainTaskListAction } from "../personal-action/personalTodoAction";
import { updateIsSendingDataRed } from "../personal-slice/personalTodoSlice";

export const addMainTaskAction =
	(data: INewMainTask) => async (dispatch: any, getState: any) => {
		// console.log("addMainTaskAction", data);
		dispatch(updateIsSendingDataRed({ isSendingData: true }));
		const { enteredMainTaskName, category_id, apiToken } = data;
		try {
			const url =
				process.env.NEXT_PUBLIC_BACK_END_URL +
				"/api/mainTask/" +
				category_id +
				"/createTask";
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + apiToken,
				},
				body: JSON.stringify({ enteredMainTaskName }),
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
