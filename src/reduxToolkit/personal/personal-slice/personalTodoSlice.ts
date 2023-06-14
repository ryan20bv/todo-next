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
	isUpdatingData: boolean;
	updateMessage: string;
	subTaskToEdit: ISubTask;
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
	isUpdatingData: false,
	updateMessage: "",
	subTaskToEdit: {} as ISubTask,
};

const personalTodoSlice = createSlice({
	name: "Personal Todo Slice",
	initialState: initialPersonalState,
	reducers: {
		updateIsDeletingDataRed(state, action) {
			state.isDeletingData = action.payload.isDeletingData;
		},
		updateIsSendingDataRed(state, action) {
			state.isSendingData = action.payload.isSendingData;
		},
		updateMessageRed(state, action) {
			state.updateMessage = action.payload.updateMessage;
		},
		updateIsUpdatingRed(state, action) {
			state.isUpdatingData = action.payload.isUpdatingData;
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
			state.isUpdatingData = false;
			state.updateMessage = "";
			state.subTaskToEdit = {} as ISubTask;
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
		setSubTaskToEditRed(state, action) {
			state.subTaskToEdit = action.payload.subTaskToEdit;
		},
	},
});

export const {
	updateIsDeletingDataRed,
	updateIsSendingDataRed,
	updateMessageRed,
	updateIsUpdatingRed,
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
	setSubTaskToEditRed,
} = personalTodoSlice.actions;

export default personalTodoSlice;
