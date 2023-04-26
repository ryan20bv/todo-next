import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import AddForm from "../ui/AddForm";
import ListContainer from "../ui/ListContainer";
import DetailsLists from "./DetailsLists";
import Summary from "../ui/Summary";
import EditForm from "../ui/EditForm";

import {
	setTodoDetailAction,
	addNewDetailsAction,
	cancelDetailEditingAction,
	confirmDetailEditingAction,
} from "@/reduxToolkit/todo/todo-action/detailAction";
import { ITask } from "@/DUMMY_DATA/MODEL";

import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";

const TaskDetail = () => {
	const dispatch = useAppDispatch();

	const router = useRouter();
	const { todoList } = useAppSelector((state: RootState) => state.todoReducer);
	const { todoDetails, isLoading, detailToEdit, isDetailEditing } =
		useAppSelector((state: RootState) => state.detailReducer);
	const { taskid } = router.query;

	useEffect(() => {
		if (!todoDetails._id && taskid) {
			if (typeof taskid === "string") {
				dispatch(setTodoDetailAction(taskid));
			}
		}
	}, [taskid]);

	let index: string | number = "";
	let title = <div></div>;
	if (todoDetails._id) {
		index = todoList.findIndex((todo: ITask) => todo._id === todoDetails._id);
		title = (
			<h1>
				<span>{index + 1 + ". "}</span> {todoDetails.name}
			</h1>
		);
	}

	let todoLength: number = 0;
	if (!isLoading) {
		todoLength = todoDetails?.details.length;
	}

	const addDetailsHandler = (enteredDetail: string) => {
		console.log(enteredDetail, taskid);
		let id = "";
		if (typeof taskid === "string") {
			id = taskid;
		}
		dispatch(addNewDetailsAction(enteredDetail, id));
	};
	const backArrowHandler = () => {
		// if (isInDetails) {
		// 	await dispatch(resetIsInDetailsAction());
		// }
		router.replace("/");
		// router.reload();
	};
	const editDetailHandler = (detail: string) => {
		dispatch(confirmDetailEditingAction(detail));
	};
	const cancelDetailEditingHandler = () => {
		dispatch(cancelDetailEditingAction());
	};

	return (
		<Card>
			<CardHeader
				title={title}
				onIconHandler={backArrowHandler}
				isInDetails={true}
			/>
			{!isDetailEditing && (
				<AddForm
					onAddHandler={addDetailsHandler}
					placeHolder='add details'
				/>
			)}
			{isDetailEditing && (
				<EditForm
					detailToEdit={detailToEdit}
					confirmEditing={editDetailHandler}
					isDetailEditing={isDetailEditing}
					onCancel={cancelDetailEditingHandler}
				/>
			)}
			<ListContainer>
				<DetailsLists
					details={todoDetails?.details}
					isLoading={isLoading}
				/>
			</ListContainer>
			{/* <Summary length={todoLength} /> */}
		</Card>
	);
};

export default TaskDetail;
