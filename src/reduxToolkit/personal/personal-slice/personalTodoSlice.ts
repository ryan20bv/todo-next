import { createSlice } from "@reduxjs/toolkit";

interface IPersonalTodoState {
	categoryList: [];
	rawData: {};
}

const initialPersonalState: IPersonalTodoState = {
	categoryList: [],
	rawData: {},
};

const personalTodoSlice = createSlice({
	name: "Personal Todo Slice",
	initialState: initialPersonalState,
	reducers: {
		getRawDataRed(state, action) {
			state.rawData = action.payload.rawData;
		},
		getUserCategoryListRed(state, action) {
			state.categoryList = action.payload.categoryList;
		},
	},
});

export const { getRawDataRed, getUserCategoryListRed } =
	personalTodoSlice.actions;

export default personalTodoSlice;
