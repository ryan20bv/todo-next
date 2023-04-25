import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface ITodoState {
	todoList: ITask[];
	firstLoad: boolean;
	filteredTodoList: ITask[];
	selectedTab: string;
	isEditing: boolean;
	todoToEdit: ITask;
	isInDetails: boolean;
	todoDetails: ITask;
}

const initialTodoState: ITodoState = {
	todoList: [],
	firstLoad: true,
	filteredTodoList: [],
	selectedTab: "all",
	isEditing: false,
	todoToEdit: {} as ITask,
	isInDetails: false,
	todoDetails: {} as ITask,
};

const todoSlice = createSlice({
	name: "Todo Slice",
	initialState: initialTodoState,
	reducers: {
		getAllTodoRed(state, action) {
			state.todoList = action.payload.allTodos;
		},
		updateTodoListRed(state, action) {
			state.todoList = action.payload.updatedTodoList;
		},
		updateFirstLoadRed(state, action) {
			state.firstLoad = action.payload.firstLoad;
		},
		addNewTodoRed(state, action) {
			state.todoList = action.payload.updatedTodos;
		},
		updateFilteredTodoListRed(state, action) {
			state.selectedTab = action.payload.selectedTab;
			state.filteredTodoList = action.payload.updatedFilteredTodoList;
		},
		updateTodoDoneStatusRed(state, action) {
			state.todoList = action.payload.updatedTodoList;
		},
		deleteTodoRed(state, action) {
			state.todoList = action.payload.updatedTodoList;
		},
		deleteAllDoneRed(state, action) {
			state.todoList = action.payload.updatedTodoList;
		},
		updateEditingStatusRed(state, action) {
			state.isEditing = action.payload.isEditingStatus;
			state.todoToEdit = action.payload.todoToEdit;
		},
		updateTodoListAfterEditRed(state, action) {
			state.isEditing = false;
			state.todoToEdit = {} as ITask;
			state.todoList = action.payload.todoList;
		},
		resetIsEditingRed(state, action) {
			state.isEditing = false;
			state.todoToEdit = {} as ITask;
		},
	},
});
export const {
	getAllTodoRed,
	updateFirstLoadRed,
	addNewTodoRed,
	updateFilteredTodoListRed,
	updateTodoDoneStatusRed,
	deleteTodoRed,
	deleteAllDoneRed,
	updateEditingStatusRed,
	updateTodoListAfterEditRed,
	resetIsEditingRed,
	updateTodoListRed,
} = todoSlice.actions;
export const todoInitialState = initialTodoState;

export default todoSlice;
