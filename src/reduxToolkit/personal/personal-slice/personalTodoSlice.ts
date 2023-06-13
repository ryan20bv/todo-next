import { createSlice } from "@reduxjs/toolkit";
import { ICategory, IMainTask, ISubTask } from "@/DUMMY_DATA/MODEL";

interface IPersonalTodoState {
	categoryList: ICategory[];
	rawData: ICategory[];
	currentCategory: ICategory;
	mainTaskList: IMainTask[];
	selectedMainTask: IMainTask;
	isSendingData: boolean;
	mainTaskToEdit: IMainTask;
	mainTaskToDelete: IMainTask;
	subTaskToDelete: ISubTask;
	isDeletingData: boolean;
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
	subTaskToDelete: {} as ISubTask,
	isDeletingData: false,
};

const personalTodoSlice = createSlice({
	name: "Personal Todo Slice",
	initialState: initialPersonalState,
	reducers: {
		updateIsSendingDataRed(state, action) {
			state.isSendingData = action.payload.isSendingData;
		},
		updateIsDeletingDataRed(state, action) {
			state.isDeletingData = action.payload.isDeletingData;
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
			state.isSendingData = false;
			state.mainTaskToEdit = {} as IMainTask;
			state.mainTaskToDelete = {} as IMainTask;
			state.subTaskToDelete = {} as ISubTask;
			state.isDeletingData = false;
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
		setSubTaskToDeleteRed(state, action) {
			state.subTaskToDelete = action.payload.subTaskToDelete;
		},
	},
});

export const {
	updateIsSendingDataRed,
	updateIsDeletingDataRed,
	getRawDataRed,
	setCurrentCategoryRed,
	getUserCategoryListRed,
	setMainTaskListRed,
	setSelectedMainTaskRed,
	resetPersonalTodoStateRed,
	updateMainTaskListRed,
	setMainTaskToEditRed,
	setMainTaskToDeleteRed,
	setSubTaskToDeleteRed,
} = personalTodoSlice.actions;

export default personalTodoSlice;
