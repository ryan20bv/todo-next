import {
	getRawDataRed,
	setCurrentCategoryRed,
	getUserCategoryListRed,
	setMainTaskListRed,
	resetPersonalTodoStateRed,
	setSelectedMainTaskRed,
	updateMainTaskListRed,
} from "../personal-slice/personalTodoSlice";
// import Category Action
import { resetCategoryAction } from "../category/categoryAction";
import { ICategory, IMainTask, ISubTask } from "@/DUMMY_DATA/MODEL";
import { signOut } from "next-auth/react";
// checked
export const getRawDataAction =
	(userId: string, apiToken: string) => async (dispatch: any, getState: any) => {
		const { currentCategory } = getState().personalTodoReducer;
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

			const data = await response.json();

			if (!response.ok) {
				if (data.message === "Authentication failed!") {
					signOut({ callbackUrl: process.env.NEXT_PUBLIC_FRONT_END_URL });
				}
				return;
			}

			await dispatch(getRawDataRed({ rawData: data }));

			// dispatch(setCurrentCategoryAction(initialCategory));
			dispatch(getUserCategoryListAction());
		} catch (err) {
			console.log("getRawDataAction", err);
		}
	};
// checked
export const getUserCategoryListAction =
	() => async (dispatch: any, getState: any) => {
		const { rawData } = getState().personalTodoReducer;

		const categoryList: ICategory[] = [];
		rawData.forEach((item: any) => {
			const indivCategory: ICategory = {
				_id: item._id,
				categoryName: item.categoryName,
				creator_id: item.creator_id,
			};
			categoryList.push(indivCategory);
		});
		dispatch(getUserCategoryListRed({ categoryList }));
	};
// checked
export const setCurrentCategoryAction =
	(category: ICategory) => async (dispatch: any, getState: any) => {
		const { rawData } = getState().personalTodoReducer;

		const foundCategoryItems = rawData.find(
			(item: any) => item._id === category._id
		);
		// console.log(foundCategoryItems);
		if (!foundCategoryItems) {
			await dispatch(setCurrentCategoryRed({ currentCategory: {} as ICategory }));
			dispatch(setMainTaskListAction([]));
			return;
		}
		const currentMainTaskList: IMainTask[] = [...foundCategoryItems.mainTaskList];

		await dispatch(setCurrentCategoryRed({ currentCategory: category }));
		dispatch(setMainTaskListAction(currentMainTaskList));
	};
// checked
export const setMainTaskListAction =
	(mainTaskList: IMainTask[]) => async (dispatch: any, getState: any) => {
		dispatch(setMainTaskListRed({ mainTaskList: mainTaskList }));
	};
// checked
export const setSelectedMainTaskAction =
	(selectedTask: IMainTask) => async (dispatch: any, getState: any) => {
		dispatch(setSelectedMainTaskRed({ selectedMainTask: selectedTask }));
	};

export const resetPersonalTodoStateAction =
	() => async (dispatch: any, getState: any) => {
		await dispatch(resetCategoryAction());
		dispatch(resetPersonalTodoStateRed({}));
	};

export const updateMainTaskListAction =
	(mainTaskList: IMainTask[]) => async (dispatch: any, getState: any) => {
		dispatch(updateMainTaskListRed({ newMainTaskList: mainTaskList }));
	};
