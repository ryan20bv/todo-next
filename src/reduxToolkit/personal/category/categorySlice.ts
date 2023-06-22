import { createSlice } from "@reduxjs/toolkit";
import { ICategory } from "@/DUMMY_DATA/MODEL";

interface ICategoryState {
	categoryToDelete: ICategory;
}

const initialCategoryState: ICategoryState = {
	categoryToDelete: {} as ICategory,
};

const categoryTodoSlice = createSlice({
	name: "Category Slice",
	initialState: initialCategoryState,
	reducers: {
		setCategoryToDeleteRed(state, action) {
			state.categoryToDelete = action.payload.categoryToDelete;
		},
	},
});

export const { setCategoryToDeleteRed } = categoryTodoSlice.actions;
export const categoryInitialState = initialCategoryState;
export default categoryTodoSlice;
