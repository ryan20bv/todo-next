import { createSlice } from "@reduxjs/toolkit";
import { IMainTask } from "@/DUMMY_DATA/MODEL";

interface ITodoState {
	mainTodoList: IMainTask[];
	firstLoad: boolean;
	isEditingMainTodo: boolean;
	todoToEdit: IMainTask;
	selectedTodo: IMainTask;
}

const initialTodoState: ITodoState = {
	mainTodoList: [],
	firstLoad: true,
	isEditingMainTodo: false,
	selectedTodo: {} as IMainTask,
	todoToEdit: {} as IMainTask,
};

const todoSlice = createSlice({
	name: "Todo Slice",
	initialState: initialTodoState,
	reducers: {
		// checked
		getAllTodoRed(state, action) {
			state.mainTodoList = action.payload.allTodos;
		},
		// checked
		updateTodoListRed(state, action) {
			state.mainTodoList = action.payload.updatedTodoList;
		},
		// checked
		updateFirstLoadRed(state, action) {
			state.firstLoad = action.payload.firstLoad;
		},
		// checked
		addNewTodoRed(state, action) {
			state.mainTodoList = action.payload.updatedTodos;
		},
		// checked
		updateEditingStatusRed(state, action) {
			state.isEditingMainTodo = action.payload.isEditingStatus;
			state.todoToEdit = action.payload.todoToEdit;
		},
		// checked
		setSelectedTodoRed(state, action) {
			state.selectedTodo = action.payload.selectedTodo;
		},

		// checked
		deleteTodoRed(state, action) {
			state.mainTodoList = action.payload.updatedTodoList;
		},

		// checked
		updateTodoListAfterEditRed(state, action) {
			state.isEditingMainTodo = false;
			state.todoToEdit = {} as IMainTask;
			state.mainTodoList = action.payload.todoList;
		},
		// checked
		resetIsEditingRed(state, action) {
			state.isEditingMainTodo = false;
			state.todoToEdit = {} as IMainTask;
		},
		deleteAllDoneRed(state, action) {
			state.mainTodoList = action.payload.updatedTodoList;
		},
		updateTodoDoneStatusRed(state, action) {
			state.mainTodoList = action.payload.updatedTodoList;
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
