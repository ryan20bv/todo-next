import { createSlice } from "@reduxjs/toolkit";

interface IPersonalTodoState {
	categoryList: [];
}

const initialPersonalState: IPersonalTodoState = {
	categoryList: [],
};

const personalTodoSlice = createSlice({
	name: "Personal Todo Slice",
	initialState: initialPersonalState,
	reducers: {
		getUserCategoryListRed(state, action) {
			state.categoryList = action.payload.categoryList;
		},
	},
});

export const { getUserCategoryListRed } = personalTodoSlice.actions;

export default personalTodoSlice;
