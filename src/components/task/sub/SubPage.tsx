import React from "react";
import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/CardHeader";
import AddForm from "@/components/ui/AddForm";
import ListContainer from "@/components/ui/ListContainer";
import SubList from "./SubList";
import { ISubTask } from "@/DUMMY_DATA/MODEL";

import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";

const SubPage = () => {
	const { selectedMainTask } = useAppSelector(
		(state: RootState) => state.personalTodoReducer
	);

	return (
		<Card>
			<CardHeader
				title='Sub Page'
				onIconHandler={() => {}}
				from='Sub Page'
			/>
			<AddForm
				onAddHandler={() => {}}
				placeHolder='add details'
			/>
			<ListContainer>
				<SubList subTaskList={selectedMainTask.subTaskList} />
			</ListContainer>
		</Card>
	);
};

export default SubPage;
