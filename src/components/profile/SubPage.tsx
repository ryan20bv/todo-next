import React from "react";
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

// import type & interface
import { ISubTask } from "@/DUMMY_DATA/MODEL";

// import action from subtaskAction
import { addSubTaskAction } from "@/reduxToolkit/personal/subTask-action/subTaskAction";

const SubPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { selectedMainTask, isSendingData } = useAppSelector(
		(state: RootState) => state.personalTodoReducer
	);
	const backArrowHandler = () => {
		router.back();
	};

	const addSubTaskHandler = (enteredSubTaskName: string) => {
		dispatch(addSubTaskAction(enteredSubTaskName));
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
					isDoneHandler={(id: string) => {}}
					onDeleteSubTodo={(subTask: ISubTask) => {}}
					onEditingSubTask={(subTask: ISubTask) => {}}
					onDeleteAllDone={() => {}}
				/>
			</ListContainer>
		</Card>
	);
};

export default SubPage;
