import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface ITodoState {
	todoList: ITask[];
}

const initialTodoState: ITodoState = {
	todoList: [],
};

const todoSlice = createSlice({
	name: "Todo Slice",
	initialState: initialTodoState,
	reducers: {
		getAllTodo(state, action) {
			state.todoList = action.payload.allTodo;
		},
	},
});
export const { getAllTodo } = todoSlice.actions;
export const todoInitialState = initialTodoState;

export default todoSlice;
