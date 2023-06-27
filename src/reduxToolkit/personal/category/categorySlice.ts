import { createSlice } from "@reduxjs/toolkit";
import { ICategory } from "@/DUMMY_DATA/MODEL";

interface ICategoryState {
	categoryToDelete: ICategory;
	isDeletingCategory: boolean;
	isUpdatingCategory: boolean;
	categoryMessage: string;
	isCategorySendingData: boolean;
	isEditingCategory: boolean;
	categoryToEdit: ICategory;
}

const initialCategoryState: ICategoryState = {
	categoryToDelete: {} as ICategory,
	isDeletingCategory: false,
	isUpdatingCategory: false,
	categoryMessage: "",
	isCategorySendingData: false,
	isEditingCategory: false,
	categoryToEdit: {} as ICategory,
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
		updateEditingStatusRed(state, action) {
			state.isEditingCategory = action.payload.isEditingStatus;
		},
		setCategoryToEditRed(state, action) {
			state.categoryToEdit = action.payload.categoryToEdit;
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
	updateEditingStatusRed,
	setCategoryToEditRed,
} = categoryTodoSlice.actions;
export const categoryInitialState = initialCategoryState;
export default categoryTodoSlice;
