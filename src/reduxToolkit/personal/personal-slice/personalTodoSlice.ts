import { createSlice } from "@reduxjs/toolkit";
import { ICategory } from "@/DUMMY_DATA/MODEL";

interface IPersonalTodoState {
	categoryList: [];
	rawData: {};
	currentCategory: ICategory;
}

const initialPersonalState: IPersonalTodoState = {
	categoryList: [],
	rawData: {},
	currentCategory: {} as ICategory,
};

const personalTodoSlice = createSlice({
	name: "Personal Todo Slice",
	initialState: initialPersonalState,
	reducers: {
		getRawDataRed(state, action) {
			state.rawData = action.payload.rawData;
		},
		setCurrentCategoryRed(state, action) {
			state.currentCategory = action.payload.currentCategory;
		},
		getUserCategoryListRed(state, action) {
			state.categoryList = action.payload.categoryList;
		},
	},
});

export const { getRawDataRed, setCurrentCategoryRed, getUserCategoryListRed } =
	personalTodoSlice.actions;

export default personalTodoSlice;
