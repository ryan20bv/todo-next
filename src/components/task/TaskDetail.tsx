import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import AddForm from "../ui/AddForm";
import ListContainer from "../ui/ListContainer";

import EditForm from "../ui/EditForm";
import SubList from "./sub/SubList";

import {
	addNewSubTodoAction,
	deleteSubTodoAction,
	selectSubTodoToEditAction,
	cancelSubTodoEditingAction,
	confirmSubTodoEditingAction,
	toggleSubTodoIsDoneAction,
	deleteAllDoneDetailAction,
} from "@/reduxToolkit/todo/todo-action/detailAction";
import { ISubTask } from "@/DUMMY_DATA/MODEL";

import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";

const TaskDetail = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [isEditingSubTodo, setIsEditingSubTodo] = useState<boolean>(false);
	const { selectedTodo } = useAppSelector(
		(state: RootState) => state.todoReducer
	);
	const { subTaskToEdit } = useAppSelector(
		(state: RootState) => state.detailReducer
	);
	const backArrowHandler = () => {
		router.back();
	};
	// checked
	const addSubTodoHandler = (newSubTodoName: string) => {
		dispatch(addNewSubTodoAction(newSubTodoName, selectedTodo.mainTaskId));
	};
	// checked
	const deleteSubTodoHandler = (subTodo_Id: string) => {
		// console.log(subTodo_Id);
		dispatch(deleteSubTodoAction(subTodo_Id));
	};

	// checked
	const onEditingSubTaskHandler = (subTask: ISubTask) => {
		setIsEditingSubTodo(true);
		dispatch(selectSubTodoToEditAction(subTask));
	};
	//checked
	const cancelEditSubTaskHandler = () => {
		setIsEditingSubTodo(false);
		dispatch(cancelSubTodoEditingAction());
	};
	// checked
	const confirmEditSubTaskHandler = (newSubTodoName: string) => {
		dispatch(confirmSubTodoEditingAction(newSubTodoName));
		setIsEditingSubTodo(false);
	};
	// checked
	const isDoneHandler = (subTaskId: string) => {
		dispatch(toggleSubTodoIsDoneAction(subTaskId));
	};

	const deleteAllDoneSubTaskHandler = () => {
		dispatch(deleteAllDoneDetailAction());
	};
	return (
		<Card>
			<CardHeader
				title={selectedTodo.mainTaskName}
				onIconHandler={backArrowHandler}
				from='generalSubtask'
			/>
			{!isEditingSubTodo && (
				<AddForm
					onAddHandler={addSubTodoHandler}
					placeHolder='add sub todo'
				/>
			)}
			{isEditingSubTodo && (
				<EditForm
					itemToEdit={subTaskToEdit.subTaskName}
					confirmEditing={confirmEditSubTaskHandler}
					onCancelEditing={cancelEditSubTaskHandler}
				/>
			)}
			<ListContainer>
				<SubList
					subTaskList={selectedTodo.subTaskList}
					isDoneHandler={isDoneHandler}
					onDeleteSubTodo={deleteSubTodoHandler}
					onEditingSubTask={onEditingSubTaskHandler}
					onDeleteAllDone={deleteAllDoneSubTaskHandler}
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
