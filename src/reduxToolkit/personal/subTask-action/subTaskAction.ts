export const addSubTaskAction =
	(enteredSubTaskName: string) => async (dispatch: any, getState: any) => {
		if (!enteredSubTaskName || enteredSubTaskName.trim().length === 0) {
			console.log("no entered new Name");
			return;
		}
		console.log("addSubTaskAction", enteredSubTaskName);
		const { selectedMainTask } = getState().personalTodoReducer;
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
			console.log(response);
			const data = await response.json();
			console.log(data);
		} catch (err) {
			console.log("addSubTaskAction", err);
		}
	};
