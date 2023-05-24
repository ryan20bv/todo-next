import {
	getRawDataRed,
	getUserCategoryListRed,
} from "../personal-slice/personalTodoSlice";
import { signOut } from "next-auth/react";

export const getRawDataAction =
	(userId: string, apiToken: string) => async (dispatch: any, getState: any) => {
		console.log("getRawDataAction");
		try {
			const url = "http://localhost:5000/api/category/user/" + userId;
			const options = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + apiToken,
				},
			};
			const response = await fetch(url, options);
			console.log(response);
			const data = await response.json();
			console.log(data);
			if (!response.ok) {
				// console.log(data);
				if (data.message === "Authentication failed!") {
					signOut({ callbackUrl: process.env.NEXT_PUBLIC_FRONT_END_URL });
				}
				return;
			}
			dispatch(getRawDataRed({ rawData: data }));
		} catch (err) {
			console.log("getRawDataAction", err);
		}
	};

export const getUserCategoryListAction =
	() => async (dispatch: any, getState: any) => {
		console.log("getCategoryAction");
	};
