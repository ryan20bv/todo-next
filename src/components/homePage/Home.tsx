import React, { useEffect } from "react";

import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
import { getAllTodoAction } from "@/reduxToolkit/todo/todo-action/todoAction";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import AddForm from "../ui/AddForm";
import EditForm from "../ui/EditForm";
import ListContainer from "../ui/ListContainer";
import TodoList from "./TodoList";
import {
	addNewTodoAction,
	confirmEditAction,
	cancelEditTodoAction,
} from "@/reduxToolkit/todo/todo-action/todoAction";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	allTasks: ITask[];
}

const Home: React.FC<propsType> = ({ allTasks }) => {
	const dispatch = useAppDispatch();
	const { todoList, firstLoad, isEditing, todoToEdit } = useAppSelector(
		(state: RootState) => state.todoReducer
	);

	useEffect(() => {
		if (firstLoad) {
			dispatch(getAllTodoAction());
		}
	}, [dispatch, firstLoad]);

	const addTodoHandler = (task: string) => {
		dispatch(addNewTodoAction(task));
	};
	const editTodoHandler = (task: string) => {
		dispatch(confirmEditAction(task));
	};
	const cancelEditingHandler = () => {
		dispatch(cancelEditTodoAction());
	};

	const burgerMenuHandler = () => {
		console.log("burger menu");
	};

	return (
		<Card>
			<CardHeader
				title='TODO nextJS'
				onIconHandler={burgerMenuHandler}
				from='/'
			/>
			{!isEditing && (
				<AddForm
					onAddHandler={addTodoHandler}
					placeHolder='add todo'
				/>
			)}
			{isEditing && (
				<EditForm
					todoToEdit={todoToEdit}
					confirmEditing={editTodoHandler}
					isEditing={isEditing}
					onCancel={cancelEditingHandler}
				/>
			)}
			<ListContainer>
				{firstLoad && <TodoList allTasks={allTasks} />}
				{!firstLoad && <TodoList allTasks={todoList} />}
			</ListContainer>
		</Card>
	);
};

export default Home;
