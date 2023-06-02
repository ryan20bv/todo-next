import { createSlice } from "@reduxjs/toolkit";
import { ISubTask } from "@/DUMMY_DATA/MODEL";

interface IDetailState {
	isLoading: boolean;
	subTaskToEdit: ISubTask;
}

const initialDetailState: IDetailState = {
	isLoading: true,
	subTaskToEdit: {} as ISubTask,
};

const detailTodoSlice = createSlice({
	name: "Detail Slice",
	initialState: initialDetailState,
	reducers: {
		updateIsLoadingRed(state, action) {
			state.isLoading = action.payload.isLoading;
		},
		setSubTaskToEditRed(state, action) {
			state.subTaskToEdit = action.payload.subTaskToEdit;
		},
	},
});

export const { updateIsLoadingRed, setSubTaskToEditRed } =
	detailTodoSlice.actions;

export const detailInitialState = initialDetailState;
export default detailTodoSlice;
