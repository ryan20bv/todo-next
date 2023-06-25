import { createSlice } from "@reduxjs/toolkit";
import { ICategory } from "@/DUMMY_DATA/MODEL";

interface ICategoryState {
	categoryToDelete: ICategory;
	isDeletingCategory: boolean;
}

const initialCategoryState: ICategoryState = {
	categoryToDelete: {} as ICategory,
	isDeletingCategory: false,
};

const categoryTodoSlice = createSlice({
	name: "Category Slice",
	initialState: initialCategoryState,
	reducers: {
		resetCategorySliceRed(state, action) {
			state.categoryToDelete = {} as ICategory;
			state.isDeletingCategory = false;
		},
		setCategoryToDeleteRed(state, action) {
			state.categoryToDelete = action.payload.categoryToDelete;
		},
		setIsDeletingCategoryRed(state, action) {
			state.isDeletingCategory = action.payload.isDeletingCategory;
		},
	},
});

export const {
	resetCategorySliceRed,
	setCategoryToDeleteRed,
	setIsDeletingCategoryRed,
} = categoryTodoSlice.actions;
export const categoryInitialState = initialCategoryState;
export default categoryTodoSlice;
