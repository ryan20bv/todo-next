import { createSlice } from "@reduxjs/toolkit";
import { ICategory, IMainTask, ISubTask } from "@/DUMMY_DATA/MODEL";

interface IPersonalTodoState {
	categoryList: ICategory[];
	rawData: [];
	currentCategory: ICategory;
	mainTaskList: IMainTask[];
	subTaskList: ISubTask[];
}

const initialPersonalState: IPersonalTodoState = {
	categoryList: [],
	rawData: [],
	currentCategory: {} as ICategory,
	mainTaskList: [],
	subTaskList: [],
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
		setMainTaskListRed(state, action) {},
		resetPersonalTodoStateRed(state, action) {
			state.categoryList = [];
			state.rawData = [];
			state.currentCategory = {} as ICategory;
			state.mainTaskList = [];
			state.subTaskList = [];
		},
	},
});

export const {
	getRawDataRed,
	setCurrentCategoryRed,
	getUserCategoryListRed,
	resetPersonalTodoStateRed,
} = personalTodoSlice.actions;

export default personalTodoSlice;
