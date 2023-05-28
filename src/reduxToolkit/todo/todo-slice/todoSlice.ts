import { createSlice } from "@reduxjs/toolkit";
import { IMainTask } from "@/DUMMY_DATA/MODEL";

interface ITodoState {
	todoList: IMainTask[];
	firstLoad: boolean;

	isEditing: boolean;
	todoToEdit: IMainTask;
	isInDetails: boolean;
	todoDetails: IMainTask;
	selectedTodo: IMainTask;
}

const initialTodoState: ITodoState = {
	todoList: [],
	firstLoad: true,
	isEditing: false,
	selectedTodo: {} as IMainTask,
	todoToEdit: {} as IMainTask,
	isInDetails: false,
	todoDetails: {} as IMainTask,
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
		setSelectedTodoRed(state, action) {
			state.selectedTodo = action.payload.selectedTodo;
		},
		// updateFilteredTodoListRed(state, action) {
		// 	state.selectedTab = action.payload.selectedTab;
		// 	state.filteredTodoList = action.payload.updatedFilteredTodoList;
		// },
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
			state.todoToEdit = {} as IMainTask;
			state.todoList = action.payload.todoList;
		},
		resetIsEditingRed(state, action) {
			state.isEditing = false;
			state.todoToEdit = {} as IMainTask;
		},
	},
});
export const {
	getAllTodoRed,
	updateFirstLoadRed,
	setSelectedTodoRed,
	addNewTodoRed,
	// updateFilteredTodoListRed,
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
