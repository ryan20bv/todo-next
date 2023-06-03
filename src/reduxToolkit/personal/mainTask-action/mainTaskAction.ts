import { INewMainTask } from "@/DUMMY_DATA/MODEL";

export const addMainTaskAction =
	(data: INewMainTask) => async (dispatch: any, getState: any) => {
		console.log("addMainTaskAction", data);
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
			console.log(options);
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(data);
		} catch (err) {
			console.log("addMainTaskAction", err);
		}
	};
