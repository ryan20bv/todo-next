import { createSlice } from "@reduxjs/toolkit";
import { IMainTask } from "@/DUMMY_DATA/MODEL";

interface ITodoState {
	mainTodoList: IMainTask[];
	firstLoad: boolean;

	mainTodoToEdit: IMainTask;
	selectedTodo: IMainTask;
}

const initialTodoState: ITodoState = {
	mainTodoList: [],
	firstLoad: true,

	selectedTodo: {} as IMainTask,
	mainTodoToEdit: {} as IMainTask,
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
			state.mainTodoToEdit = action.payload.todoToEdit;
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
			state.mainTodoToEdit = {} as IMainTask;
			state.mainTodoList = action.payload.todoList;
		},
		// checked
		resetIsEditingRed(state, action) {
			state.mainTodoToEdit = {} as IMainTask;
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
