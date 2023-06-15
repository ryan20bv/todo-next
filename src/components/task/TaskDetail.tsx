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
		dispatch(addNewSubTodoAction(newSubTodoName));
	};
	// checked
	const deleteSubTodoHandler = (subTask: ISubTask) => {
		dispatch(deleteSubTodoAction(subTask));
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
		cancelEditSubTaskHandler();
		dispatch(toggleSubTodoIsDoneAction(subTaskId));
	};

	const deleteAllDoneSubTaskHandler = () => {
		dispatch(deleteAllDoneDetailAction());
	};
	return (
		<Card>
			<CardHeader
				title={selectedTodo.mainTaskName}
				iconFunction={backArrowHandler}
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

export default TaskDetail;
