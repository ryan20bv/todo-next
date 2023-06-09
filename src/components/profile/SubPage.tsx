import React from "react";
import { useRouter } from "next/router";
import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/CardHeader";
import AddForm from "@/components/ui/AddForm";
import ListContainer from "@/components/ui/ListContainer";
import SubList from "../task/sub/SubList";
import { ISubTask } from "@/DUMMY_DATA/MODEL";

import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";

const SubPage = () => {
	const router = useRouter();
	const { selectedMainTask } = useAppSelector(
		(state: RootState) => state.personalTodoReducer
	);
	const backArrowHandler = () => {
		router.back();
	};
	return (
		<Card>
			<CardHeader
				title={selectedMainTask.mainTaskName}
				iconFunction={backArrowHandler}
				from='sub_page'
			/>
			<AddForm
				onAddHandler={() => {}}
				placeHolder='add details'
			/>
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
