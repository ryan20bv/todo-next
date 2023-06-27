import { ICategory } from "@/DUMMY_DATA/MODEL";
// import personalTodoSlice
import {
	getUserCategoryListRed,
	// updateIsSendingDataRed,
	updateCategoryListAfterDeleteRed,
} from "../personal-slice/personalTodoSlice";
// import personalTodoAction
import { getRawDataAction } from "../personal-action/personalTodoAction";
// import categorySlice
import {
	setCategoryToDeleteRed,
	setIsDeletingCategoryRed,
	updateCategoryIsSendingDataRed,
	resetCategorySliceRed,
	setIsUpdatingCategoryRed,
	setCategoryMessageRed,
	updateEditingStatusRed,
	setCategoryToEditRed,
} from "./categorySlice";

export const addNewCategoryAction =
	(enteredCategoryName: string) => async (dispatch: any, getState: any) => {
		const { categoryList } = getState().personalTodoReducer;
		const { authData } = getState().authReducer;
		if (!enteredCategoryName || enteredCategoryName.trim().length === 0) {
			console.log("no entered new category name");
			return;
		}
		dispatch(updateCategoryIsSendingDataRed({ isSendingData: true }));
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
			if (!response.ok) {
				dispatch(updateCategoryIsSendingDataRed({ isSendingData: false }));
				return;
			}
			const data = await response.json();
			// console.log(data);
			const { newCategory, message } = data;
			if (message === "new category created") {
				const addedCategory: ICategory = {
					_id: newCategory._id,
					categoryName: newCategory.categoryName,
					creator_id: newCategory.creator_id,
				};
				let updatedCategoryList: ICategory[] = [...categoryList, addedCategory];

				await dispatch(updateCategoryListAction(updatedCategoryList));
				await dispatch(getRawDataAction(authData.userId, authData.apiToken));
				return { status: "done" };
			}
		} catch (err) {
			console.log("addNewCategoryAction", err);
			dispatch(updateCategoryIsSendingDataRed({ isSendingData: false }));
		}
	};

export const updateCategoryListAction =
	(updatedCategoryList: ICategory[]) => async (dispatch: any, getState: any) => {
		dispatch(getUserCategoryListRed({ categoryList: updatedCategoryList }));
		dispatch(updateCategoryIsSendingDataRed({ isSendingData: false }));
	};

export const resetCategoryAction =
	() => async (dispatch: any, getState: any) => {
		dispatch(resetCategorySliceRed({}));
	};
export const setDeleteCategoryAction =
	(category: ICategory) => async (dispatch: any, getState: any) => {
		dispatch(setCategoryToDeleteRed({ categoryToDelete: category }));
		dispatch(setIsDeletingCategoryRed({ isDeletingCategory: true }));
	};

export const cancelDeleteCategoryAction =
	() => async (dispatch: any, getState: any) => {
		dispatch(setCategoryToDeleteRed({ categoryToDelete: {} as ICategory }));
		dispatch(setIsDeletingCategoryRed({ isDeletingCategory: false }));
	};

export const confirmDeleteCategoryAction =
	() => async (dispatch: any, getState: any) => {
		// console.log("confirmDeleteCategoryAction");
		dispatch(setIsUpdatingCategoryRed({ isUpdatingCategory: true }));
		dispatch(setCategoryMessageRed({ categoryMessage: "Deleting...." }));
		const { categoryToDelete } = getState().categoryTodoReducer;
		const { authData } = getState().authReducer;
		try {
			const bodyData = {};
			const url =
				process.env.NEXT_PUBLIC_BACK_END_URL +
				"/api/category/delete/" +
				categoryToDelete._id;
			const options = {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + authData.apiToken,
				},
				body: JSON.stringify(bodyData),
			};

			const response = await fetch(url, options);
			if (!response.ok) {
				// dispatch(updateIsDeletingDataRed({ isDeletingData: false }));
				// dispatch(updateIsUpdatingRed({ isUpdatingData: false }));
				return;
			}
			const data = await response.json();

			const { message } = data;
			if (message === "deleted") {
				const { categoryList } = getState().personalTodoReducer;
				const copyOfCategoryList: ICategory[] = [...categoryList];

				const updatedCategoryList = copyOfCategoryList.filter(
					(category) => category._id !== categoryToDelete._id
				);

				await dispatch(getRawDataAction(authData.userId, authData.apiToken));
				await dispatch(updateCategoryListAfterDeleteRed({ updatedCategoryList }));
				dispatch(setIsUpdatingCategoryRed({ isUpdatingCategory: false }));
				dispatch(setCategoryMessageRed({ categoryMessage: "" }));

				return "done";
			}
		} catch (err) {
			console.log("confirmDeleteCategoryAction", err);
		}
	};

export const setIsEditingCategoryAction =
	(categoryToEdit: ICategory) => async (dispatch: any, getState: any) => {
		await dispatch(setCategoryToEditRed({ categoryToEdit }));
		dispatch(updateEditingStatusRed({ isEditingStatus: true }));
	};
export const cancelEditCategoryAction =
	() => async (dispatch: any, getState: any) => {
		await dispatch(setCategoryToEditRed({ categoryToEdit: {} as ICategory }));
		dispatch(updateEditingStatusRed({ isEditingStatus: false }));
	};

export const confirmEditCategoryAction =
	(enteredCategoryName: string) => async (dispatch: any, getState: any) => {
		const { categoryToEdit } = getState().categoryTodoReducer;
		const { authData } = getState().authReducer;
		dispatch(setIsUpdatingCategoryRed({ isUpdatingCategory: false }));
		dispatch(setIsUpdatingCategoryRed({ isUpdatingCategory: true }));
		if (enteredCategoryName === categoryToEdit.categoryName) {
			dispatch(setIsUpdatingCategoryRed({ isUpdatingCategory: false }));
			return "done";
		}

		try {
			const bodyData = { enteredCategoryName };
			const url =
				process.env.NEXT_PUBLIC_BACK_END_URL +
				"/api/category/edit/" +
				categoryToEdit._id;
			const options = {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + authData.apiToken,
				},
				body: JSON.stringify(bodyData),
			};

			const response = await fetch(url, options);
			if (!response.ok) {
				// dispatch(updateIsDeletingDataRed({ isDeletingData: false }));
				// dispatch(updateIsUpdatingRed({ isUpdatingData: false }));
				dispatch(setIsUpdatingCategoryRed({ isUpdatingCategory: false }));
				return;
			}
			const data = await response.json();

			const { updatedCategory, message } = data;
			if (message === "edited") {
				const { categoryList } = getState().personalTodoReducer;
				let copyOfCategoryList = [...categoryList];
				let findIndexOfEditedCategory = copyOfCategoryList.findIndex(
					(category: ICategory) => category._id === updatedCategory._id
				);

				// console.log(findIndexOfEditedCategory);
				copyOfCategoryList[findIndexOfEditedCategory] = updatedCategory;
				let updatedCategoryList = [...copyOfCategoryList];

				await dispatch(updateCategoryListAction(updatedCategoryList));
				await dispatch(getRawDataAction(authData.userId, authData.apiToken));
				dispatch(setIsUpdatingCategoryRed({ isUpdatingCategory: false }));

				// return "done";
			}
		} catch (err) {
			console.log("confirmEditCategoryAction", err);
			dispatch(setIsUpdatingCategoryRed({ isUpdatingCategory: false }));
		}
		return "done";
	};
