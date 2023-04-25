import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface IDetailState {
	isLoading: boolean;
	isInDetails: boolean;
	todoDetails: ITask;
}

const initialDetailState: IDetailState = {
	isLoading: true,
	isInDetails: false,
	todoDetails: {} as ITask,
};

const detailTodoSlice = createSlice({
	name: "Detail Slice",
	initialState: initialDetailState,
	reducers: {
		updateIsLoadingRed(state, action) {
			state.isLoading = action.payload.isLoading;
		},
		setTodoDetailRed(state, action) {
			state.isInDetails = true;
			state.todoDetails = action.payload.todoDetails;
		},
		resetIsInDetailsRed(state, action) {
			state.isInDetails = false;
			// state.todoDetails = {} as ITask;
			// state.isLoading = true;
		},
		addNewDetailsRed(state, action) {
			state.todoDetails = action.payload.updatedTodoDetails;
		},
	},
});

export const {
	setTodoDetailRed,
	resetIsInDetailsRed,
	updateIsLoadingRed,
	addNewDetailsRed,
} = detailTodoSlice.actions;

export const detailInitialState = initialDetailState;
export default detailTodoSlice;
