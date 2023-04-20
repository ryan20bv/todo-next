import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface ITodoState {
	todoList: ITask[];
	firstLoad: boolean;
	filteredTodoList: ITask[];
	selectedTab: string;
	isEditing: boolean;
}

const initialTodoState: ITodoState = {
	todoList: [],
	firstLoad: true,
	filteredTodoList: [],
	selectedTab: "all",
	isEditing: false,
};

const todoSlice = createSlice({
	name: "Todo Slice",
	initialState: initialTodoState,
	reducers: {
		getAllTodoRed(state, action) {
			state.todoList = action.payload.allTodos;
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

		// updateEditingStatusRed(state, action) {
		// 	state.isEditing = action.payload.isEditingStatus;
		// },
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
} = todoSlice.actions;
export const todoInitialState = initialTodoState;

export default todoSlice;
