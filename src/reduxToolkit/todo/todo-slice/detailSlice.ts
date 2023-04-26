import { createSlice } from "@reduxjs/toolkit";
import { ITask, ITodoDetails } from "@/DUMMY_DATA/MODEL";

interface IDetailState {
	isLoading: boolean;
	isInDetails: boolean;
	todoDetails: ITask;
	isDetailEditing: boolean;
	detailToEdit: ITodoDetails;
}

const initialDetailState: IDetailState = {
	isLoading: true,
	isInDetails: false,
	todoDetails: {} as ITask,
	isDetailEditing: false,
	detailToEdit: {} as ITodoDetails,
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
		toggleDetailIsDoneRed(state, action) {
			state.todoDetails = action.payload.updatedTodoDetails;
		},
		updateTodoDetailsRed(state, action) {
			state.todoDetails = action.payload.updatedTodoDetails;
		},
		updateDetailEditingStatusRed(state, action) {
			state.isDetailEditing = action.payload.isDetailEditingStatus;
			state.detailToEdit = action.payload.detailToEdit;
		},
		resetIsDetailEditingRed(state, action) {
			state.isDetailEditing = false;
			state.detailToEdit = {} as ITodoDetails;
		},
		updateTodoDetailsAfterEditRed(state, action) {
			state.isDetailEditing = false;
			state.detailToEdit = {} as ITodoDetails;
			state.todoDetails = action.payload.updatedTodoDetails;
		},
	},
});

export const {
	setTodoDetailRed,
	resetIsInDetailsRed,
	updateIsLoadingRed,
	addNewDetailsRed,
	toggleDetailIsDoneRed,
	updateTodoDetailsRed,
	updateDetailEditingStatusRed,
	resetIsDetailEditingRed,
	updateTodoDetailsAfterEditRed,
} = detailTodoSlice.actions;

export const detailInitialState = initialDetailState;
export default detailTodoSlice;
