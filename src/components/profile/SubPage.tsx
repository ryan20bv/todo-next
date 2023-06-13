import React, { useState } from "react";
import { useRouter } from "next/router";
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";

// import component
import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/CardHeader";
import AddForm from "@/components/ui/AddForm";
import ListContainer from "@/components/ui/ListContainer";
import SubList from "../task/sub/SubList";
import SendingData from "../ui/SendingData";
import ConfirmationModal from "../ui/ConfirmationModal";

// import type & interface
import { ISubTask } from "@/DUMMY_DATA/MODEL";

// import action from subtaskAction
import {
	addSubTaskAction,
	selectedSubTaskToDeleteAction,
	confirmDeleteSubTaskAction,
	toggleSubTaskIsDoneAction,
} from "@/reduxToolkit/personal/subTask-action/subTaskAction";

const SubPage = () => {
	const dispatch = useAppDispatch();
	const [showConfirmationModal, setShowConfirmationModal] =
		useState<boolean>(false);
	const router = useRouter();
	const {
		selectedMainTask,
		isSendingData,
		subTaskToDelete,
		// isDeletingData,
		// isToggleUpdating,
		isUpdatingData,
		updateMessage,
	} = useAppSelector((state: RootState) => state.personalTodoReducer);
	const backArrowHandler = () => {
		router.back();
	};
	// checked
	const addSubTaskHandler = (enteredSubTaskName: string) => {
		dispatch(addSubTaskAction(enteredSubTaskName));
	};
	// checked
	const selectSubTaskToDeleteHandler = (subTask: ISubTask) => {
		dispatch(selectedSubTaskToDeleteAction(subTask));
		setShowConfirmationModal(true);
	};
	// checked
	const cancelDeleteSubTaskHandler = () => {
		dispatch(selectedSubTaskToDeleteAction({} as ISubTask));
		setShowConfirmationModal(false);
	};
	// checked
	const confirmDeleteMainTaskHandler = async () => {
		const data = await dispatch(confirmDeleteSubTaskAction());

		if (data && data.message === "done") {
			setShowConfirmationModal(false);
		}
	};
	//checked
	const toggleIsDoneHandler = async (subTaskId: string) => {
		setShowConfirmationModal(true);
		const data = await dispatch(toggleSubTaskIsDoneAction(subTaskId));
		if (data && data.message === "done") {
			setShowConfirmationModal(false);
		}
	};

	return (
		<Card>
			<CardHeader
				title={selectedMainTask.mainTaskName}
				iconFunction={backArrowHandler}
				from='sub_page'
			/>
			{isSendingData && <SendingData />}
			{!isSendingData && (
				<AddForm
					onAddHandler={addSubTaskHandler}
					placeHolder='add details'
				/>
			)}
			<ListContainer>
				<SubList
					subTaskList={selectedMainTask.subTaskList}
					onDeleteSubTodo={selectSubTaskToDeleteHandler}
					isDoneHandler={toggleIsDoneHandler}
					onEditingSubTask={(subTask: ISubTask) => {}}
					onDeleteAllDone={() => {}}
				/>
			</ListContainer>
			{showConfirmationModal && (
				<ConfirmationModal
					message={`Are you sure you want to delete ${subTaskToDelete.subTaskName}`}
					onCloseModal={cancelDeleteSubTaskHandler}
					// isDeletingData={isDeletingData}
					onConfirm={confirmDeleteMainTaskHandler}
					// isToggleUpdating={isToggleUpdating}
					isUpdatingData={isUpdatingData}
					updateMessage={updateMessage}
				/>
			)}
		</Card>
	);
};

export default SubPage;
