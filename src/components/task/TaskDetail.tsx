import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import AddForm from "../ui/AddForm";
import ListContainer from "../ui/ListContainer";
import DetailsLists from "./DetailsLists";
import EditForm from "../ui/EditForm";
import SubList from "./sub/SubList";

import {
	addNewSubTodoAction,
	cancelDetailEditingAction,
	confirmDetailEditingAction,
	toggleDetailIsDoneAction,
} from "@/reduxToolkit/todo/todo-action/detailAction";
import { IMainTask } from "@/DUMMY_DATA/MODEL";

import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";

const TaskDetail = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { mainTodoList, selectedTodo } = useAppSelector(
		(state: RootState) => state.todoReducer
	);
	const backArrowHandler = () => {
		router.back();
	};
	const isDoneHandler = (subTaskId: string) => {
		dispatch(toggleDetailIsDoneAction(subTaskId));
	};
	const addSubTodoHandler = (newSubTodoName: string) => {
		dispatch(addNewSubTodoAction(newSubTodoName, selectedTodo.mainTaskId));
	};
	return (
		<Card>
			<CardHeader
				title={selectedTodo.mainTaskName}
				onIconHandler={backArrowHandler}
				from='generalSubtask'
			/>
			<AddForm
				onAddHandler={addSubTodoHandler}
				placeHolder='add sub todo'
			/>
			<ListContainer>
				<SubList
					subTaskList={selectedTodo.subTaskList}
					isDoneHandler={isDoneHandler}
				/>
			</ListContainer>
		</Card>
	);
};

/* const TaskDetail = () => {
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
	}, [taskid, dispatch, todoDetails._id]);

	let index: string | number = "";
	let title = "";
	if (todoDetails._id) {
		index = todoList.findIndex((todo: ITask) => todo._id === todoDetails._id);
		title = index + 1 + ". " + todoDetails.name;
	}

	let todoLength: number = 0;
	if (!isLoading) {
		todoLength = todoDetails?.details.length;
	}

	const addDetailsHandler = (enteredDetail: string) => {
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
				from='generalSubtask'
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
		</Card>
	);
}; */

export default TaskDetail;
