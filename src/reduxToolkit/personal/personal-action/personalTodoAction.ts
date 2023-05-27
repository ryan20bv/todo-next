import {
	getRawDataRed,
	setCurrentCategoryRed,
	getUserCategoryListRed,
	resetPersonalTodoStateRed,
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
			// console.log(response);
			const data = await response.json();
			// console.log(data);
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
			dispatch(setCurrentCategoryAction(initialCategory));
			await dispatch(getRawDataRed({ rawData: data }));
			dispatch(getUserCategoryListAction());
		} catch (err) {
			console.log("getRawDataAction", err);
		}
	};

export const setCurrentCategoryAction =
	(category: ICategory) => async (dispatch: any, getState: any) => {
		const { rawData } = getState().personalTodoReducer;
		const mainTaskList = [];
		const foundCategoryItems = rawData.find(
			(item: any) => item._id === category.categoryId
		);
		console.log(foundCategoryItems);
		dispatch(setCurrentCategoryRed({ currentCategory: category }));
	};

export const setMainTaskListAction =
	(category: ICategory) => async (dispatch: any, getState: any) => {};

export const getUserCategoryListAction =
	() => async (dispatch: any, getState: any) => {
		const { rawData } = getState().personalTodoReducer;
		// console.log(rawData);
		const categoryList: ICategory[] = [];
		rawData.forEach((item: any) => {
			const indivCategory: ICategory = {
				categoryId: item._id,
				categoryName: item.categoryName,
			};
			categoryList.push(indivCategory);
		});
		dispatch(getUserCategoryListRed({ categoryList }));
	};

export const resetPersonalTodoStateAction =
	() => async (dispatch: any, getState: any) => {
		dispatch(resetPersonalTodoStateRed({}));
	};
