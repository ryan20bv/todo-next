import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface ITodoState {
	todoList: ITask[];
	firstLoad: boolean;
	filteredTodoList: ITask[];
	selectedTab: string;
}

const initialTodoState: ITodoState = {
	todoList: [],
	firstLoad: true,
	filteredTodoList: [],
	selectedTab: "all",
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
	},
});
export const {
	getAllTodoRed,
	updateFirstLoadRed,
	addNewTodoRed,
	updateFilteredTodoListRed,
} = todoSlice.actions;
export const todoInitialState = initialTodoState;

export default todoSlice;
