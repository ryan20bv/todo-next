import { createSlice } from "@reduxjs/toolkit";
import { ICategory } from "@/DUMMY_DATA/MODEL";

interface ICategoryState {
	categoryToDelete: ICategory;
	isDeletingCategory: boolean;
	isUpdatingCategory: boolean;
	categoryMessage: string;
	isCategorySendingData: boolean;
}

const initialCategoryState: ICategoryState = {
	categoryToDelete: {} as ICategory,
	isDeletingCategory: false,
	isUpdatingCategory: false,
	categoryMessage: "",
	isCategorySendingData: false,
};

const categoryTodoSlice = createSlice({
	name: "Category Slice",
	initialState: initialCategoryState,
	reducers: {
		resetCategorySliceRed(state, action) {
			state.categoryToDelete = {} as ICategory;
			state.isDeletingCategory = false;
		},
		updateCategoryIsSendingDataRed(state, action) {
			state.isCategorySendingData = action.payload.isSendingData;
		},
		setCategoryToDeleteRed(state, action) {
			state.categoryToDelete = action.payload.categoryToDelete;
		},
		setIsDeletingCategoryRed(state, action) {
			state.isDeletingCategory = action.payload.isDeletingCategory;
		},
		setIsUpdatingCategoryRed(state, action) {
			state.isUpdatingCategory = action.payload.isUpdatingCategory;
		},
		setCategoryMessageRed(state, action) {
			state.categoryMessage = action.payload.categoryMessage;
		},
	},
});

export const {
	resetCategorySliceRed,
	updateCategoryIsSendingDataRed,
	setCategoryToDeleteRed,
	setIsDeletingCategoryRed,
	setIsUpdatingCategoryRed,
	setCategoryMessageRed,
} = categoryTodoSlice.actions;
export const categoryInitialState = initialCategoryState;
export default categoryTodoSlice;
