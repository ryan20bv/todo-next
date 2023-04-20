import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface ITodoState {
	todoList: ITask[];
	firstLoad: boolean;
}

const initialTodoState: ITodoState = {
	todoList: [],
	firstLoad: true,
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
	},
});
export const { getAllTodoRed, updateFirstLoadRed, addNewTodoRed } =
	todoSlice.actions;
export const todoInitialState = initialTodoState;

export default todoSlice;
