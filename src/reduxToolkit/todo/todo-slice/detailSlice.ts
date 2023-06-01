import { createSlice } from "@reduxjs/toolkit";
import { ISubTask } from "@/DUMMY_DATA/MODEL";

interface IDetailState {
	isLoading: boolean;
	isInDetails: boolean;
	isEditingSubTask: boolean;
	subTaskToEdit: ISubTask;
}

const initialDetailState: IDetailState = {
	isLoading: true,
	isInDetails: false,
	isEditingSubTask: false,
	subTaskToEdit: {} as ISubTask,
};

const detailTodoSlice = createSlice({
	name: "Detail Slice",
	initialState: initialDetailState,
	reducers: {
		updateIsLoadingRed(state, action) {
			state.isLoading = action.payload.isLoading;
		},
	},
});

export const { updateIsLoadingRed } = detailTodoSlice.actions;

export const detailInitialState = initialDetailState;
export default detailTodoSlice;
