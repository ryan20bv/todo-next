import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import AddForm from "../ui/AddForm";
import ListContainer from "../ui/ListContainer";
import DetailsLists from "./DetailsLists";
import Summary from "../ui/Summary";

import { setTodoDetailAction } from "@/reduxToolkit/todo/todo-action/detailAction";
import { ITask } from "@/DUMMY_DATA/MODEL";

import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";

interface propsType {
	selectedTodo: {
		todoDetail: ITask;
		index: number;
	};
}

const TaskDetail: React.FC<propsType> = (props) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { todoList } = useAppSelector((state: RootState) => state.todoReducer);
	const { todoDetails, isLoading } = useAppSelector(
		(state: RootState) => state.detailReducer
	);

	let { taskid } = router.query;

	useEffect(() => {
		if (!todoDetails._id && taskid) {
			if (typeof taskid === "string") dispatch(setTodoDetailAction(taskid));
		}
		// console.log("effect");
		// if (typeof taskid === "string") dispatch(setTodoDetailAction(taskid));
	}, []);

	let index: string | number = "";
	let title = <div></div>;
	if (todoDetails) {
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

	return (
		<Card>
			<CardHeader title={title} />
			<AddForm />
			<ListContainer>
				{isLoading && <h1>Loading...</h1>}
				{!isLoading && <DetailsLists details={todoDetails?.details} />}
			</ListContainer>
			<Summary todoLength={todoLength} />
		</Card>
	);
};

export default TaskDetail;
