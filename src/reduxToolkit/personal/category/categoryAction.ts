export const addNewCategoryAction =
	(enteredCategoryName: string) => async (dispatch: any, getState: any) => {
		console.log(enteredCategoryName);
		const { authData } = getState().authReducer;
		if (!enteredCategoryName || enteredCategoryName.trim().length === 0) {
			console.log("no entered new category name");
			return;
		}
		try {
			const bodyData = {
				enteredCategoryName,
			};
			const url = process.env.NEXT_PUBLIC_BACK_END_URL + "/api/category/create";
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
			console.log(data);
		} catch (err) {
			console.log("addNewCategoryAction", err);
		}
	};
