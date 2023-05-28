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
import MainList from "../task/main/MainList";

import {
	addNewTodoAction,
	confirmEditAction,
	cancelEditMainTaskAction,
	editSelectedTodoAction,
} from "@/reduxToolkit/todo/todo-action/todoAction";
import { IMainTask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	allTasks: IMainTask[];
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
	const confirmEditingHandler = (task: string) => {
		dispatch(confirmEditAction(task));
	};
	const cancelMainTaskEditingHandler = () => {
		dispatch(cancelEditMainTaskAction());
	};

	const burgerMenuHandler = () => {
		console.log("burger menu");
	};

	const isEditingHandler = (mainTask: IMainTask) => {
		dispatch(editSelectedTodoAction(mainTask));
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
					mainTaskToEdit={todoToEdit}
					confirmEditing={confirmEditingHandler}
					isEditing={isEditing}
					onCancelEditing={cancelMainTaskEditingHandler}
				/>
			)}
			<ListContainer>
				{firstLoad && (
					<MainList
						mainTaskList={allTasks}
						onEditing={isEditingHandler}
					/>
				)}
				{!firstLoad && (
					<MainList
						mainTaskList={todoList}
						onEditing={isEditingHandler}
					/>
				)}
				{/* {firstLoad && <TodoList allTasks={allTasks} />} */}
				{/* {!firstLoad && <TodoList allTasks={todoList} />} */}
			</ListContainer>
		</Card>
	);
};

export default Home;
