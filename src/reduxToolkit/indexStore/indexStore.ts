import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import todoSlice from "../todo/todo-slice/todoSlice";
import detailTodoSlice from "../todo/todo-slice/detailSlice";

const indexStore = configureStore({
	reducer: {
		todoReducer: todoSlice.reducer,
		detailReducer: detailTodoSlice.reducer,
	},
});

export type RootState = ReturnType<typeof indexStore.getState>;
export type AppDispatch = typeof indexStore.dispatch;

export const useAppSelector = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default indexStore;
