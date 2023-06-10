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
} from "@/reduxToolkit/personal/subTask-action/subTaskAction";

const SubPage = () => {
	const dispatch = useAppDispatch();
	const [showConfirmationModal, setShowConfirmationModal] =
		useState<boolean>(false);
	const router = useRouter();
	const { selectedMainTask, isSendingData, subTaskToDelete } = useAppSelector(
		(state: RootState) => state.personalTodoReducer
	);
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
	// !working on
	const confirmDeleteMainTaskHandler = async () => {
		const data = await dispatch(confirmDeleteSubTaskAction());

		if (data && data.message === "success") {
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
					isDoneHandler={(id: string) => {}}
					onEditingSubTask={(subTask: ISubTask) => {}}
					onDeleteAllDone={() => {}}
				/>
			</ListContainer>
			{showConfirmationModal && (
				<ConfirmationModal
					message={`Are you sure you want to delete ${subTaskToDelete.subTaskName}`}
					onCloseModal={cancelDeleteSubTaskHandler}
					isSendingData={isSendingData}
					onConfirm={confirmDeleteMainTaskHandler}
				/>
			)}
		</Card>
	);
};

export default SubPage;
