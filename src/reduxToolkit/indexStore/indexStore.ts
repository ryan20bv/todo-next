import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import todoSlice from "../todo/todo-slice/todoSlice";
import detailTodoSlice from "../todo/todo-slice/detailSlice";
import authSlice from "../auth/auth-slice/authSlice";
import personalTodoSlice from "../personal/personal-slice/personalTodoSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
// import storageSession from "reduxjs-toolkit-persist/lib/storage/session";

const reducers = combineReducers({
	todoReducer: todoSlice.reducer,
	detailReducer: detailTodoSlice.reducer,
	authReducer: authSlice.reducer,
	personalTodoReducer: personalTodoSlice.reducer,
});

// const indexStore = configureStore({
// 	reducer: {
// 		todoReducer: todoSlice.reducer,
// 		detailReducer: detailTodoSlice.reducer,
// 		authReducer: authSlice.reducer,
// 		personalTodoReducer: personalTodoSlice.reducer,
// 	},
// });
const persistConfig = {
	key: "root",
	storage,
	blacklist: ["todoReducer", "detailReducer"],
	// storageSession,
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const indexStore = configureStore({
	reducer: persistedReducer,
	// middleware: [thunk],
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // Disable serializable check for redux-persist
		}),
});

export type RootState = ReturnType<typeof indexStore.getState>;
export type AppDispatch = typeof indexStore.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

// export default indexStore;

export const persistor = persistStore(indexStore);
