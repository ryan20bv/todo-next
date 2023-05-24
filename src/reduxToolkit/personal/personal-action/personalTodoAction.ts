import {
	getRawDataRed,
	setCurrentCategoryRed,
	getUserCategoryListRed,
} from "../personal-slice/personalTodoSlice";
import { ICategory } from "@/DUMMY_DATA/MODEL";
import { signOut } from "next-auth/react";

export const getRawDataAction =
	(userId: string, apiToken: string) => async (dispatch: any, getState: any) => {
		try {
			const url =
				process.env.NEXT_PUBLIC_BACK_END_URL + "/api/category/user/" + userId;
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
			const initialCategory: ICategory = {
				categoryId: data[0]._id,
				categoryName: data[0].categoryName,
			};
			dispatch(getRawDataRed({ rawData: data }));
			dispatch(setCurrentCategoryAction(initialCategory));
		} catch (err) {
			console.log("getRawDataAction", err);
		}
	};

export const setCurrentCategoryAction =
	(category: ICategory) => async (dispatch: any, getState: any) => {
		dispatch(setCurrentCategoryRed({ currentCategory: category }));
	};

export const getUserCategoryListAction =
	() => async (dispatch: any, getState: any) => {
		console.log("getCategoryAction");
	};
