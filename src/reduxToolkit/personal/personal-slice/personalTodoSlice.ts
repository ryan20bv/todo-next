import { createSlice } from "@reduxjs/toolkit";
import { ICategory, IMainTask, ISubTask } from "@/DUMMY_DATA/MODEL";

interface IPersonalTodoState {
	categoryList: ICategory[];
	rawData: [];
	currentCategory: ICategory;
	mainTaskList: IMainTask[];
	selectedMainTask: IMainTask;
	isSendingData: boolean;
	mainTaskToEdit: IMainTask;
	mainTaskToDelete: IMainTask;
}

const initialPersonalState: IPersonalTodoState = {
	categoryList: [],
	rawData: [],
	currentCategory: {} as ICategory,
	mainTaskList: [],
	selectedMainTask: {} as IMainTask,
	isSendingData: false,
	mainTaskToEdit: {} as IMainTask,
	mainTaskToDelete: {} as IMainTask,
};

const personalTodoSlice = createSlice({
	name: "Personal Todo Slice",
	initialState: initialPersonalState,
	reducers: {
		updateIsSendingDataRed(state, action) {
			state.isSendingData = action.payload.isSendingData;
		},
		getRawDataRed(state, action) {
			state.rawData = action.payload.rawData;
		},
		setCurrentCategoryRed(state, action) {
			state.currentCategory = action.payload.currentCategory;
		},
		getUserCategoryListRed(state, action) {
			state.categoryList = action.payload.categoryList;
		},
		setMainTaskListRed(state, action) {
			state.mainTaskList = action.payload.mainTaskList;
		},
		setSelectedMainTaskRed(state, action) {
			state.selectedMainTask = action.payload.selectedMainTask;
		},
		resetPersonalTodoStateRed(state, action) {
			state.categoryList = [];
			state.rawData = [];
			state.currentCategory = {} as ICategory;
			state.mainTaskList = [];
			state.selectedMainTask = {} as IMainTask;
		},
		updateMainTaskListRed(state, action) {
			state.mainTaskList = action.payload.newMainTaskList;
		},
		setMainTaskToEditRed(state, action) {
			state.mainTaskToEdit = action.payload.mainTaskToEdit;
		},
		setMainTaskToDeleteRed(state, action) {
			state.mainTaskToDelete = action.payload.mainTaskToDelete;
		},
	},
});

export const {
	updateIsSendingDataRed,
	getRawDataRed,
	setCurrentCategoryRed,
	getUserCategoryListRed,
	setMainTaskListRed,
	setSelectedMainTaskRed,
	resetPersonalTodoStateRed,
	updateMainTaskListRed,
	setMainTaskToEditRed,
	setMainTaskToDeleteRed,
} = personalTodoSlice.actions;

export default personalTodoSlice;
