import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { useDispatch, useSelector } from "react-redux";
import todoSlice from "../todo/todo-slice/todoSlice";
import detailTodoSlice from "../todo/todo-slice/detailSlice";
import authSlice from "../auth/auth-slice/authSlice";
import personalTodoSlice from "../personal/personal-slice/personalTodoSlice";

const reducers = combineReducers({
	todoReducer: todoSlice.reducer,
	detailReducer: detailTodoSlice.reducer,
	authReducer: authSlice.reducer,
	personalTodoReducer: personalTodoSlice.reducer,
});

const indexStore = configureStore({
	reducer: reducers,
});

export type RootState = ReturnType<typeof indexStore.getState>;
export type AppDispatch = typeof indexStore.dispatch;

export const useAppSelector = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default indexStore;
