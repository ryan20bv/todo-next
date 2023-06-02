import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import MainList from "../task/main/MainList";

import {
	addNewTodoAction,
	confirmEditAction,
	cancelEditMainTaskAction,
	editSelectedTodoAction,
	deleteMainTodoAction,
	setSelectedTodoAction,
	deleteAllDoneMainTaskAction,
} from "@/reduxToolkit/todo/todo-action/todoAction";
import { IMainTask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	allTasks: IMainTask[];
}

const Home: React.FC<propsType> = ({ allTasks }) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const { mainTodoList, firstLoad, mainTodoToEdit } = useAppSelector(
		(state: RootState) => state.todoReducer
	);

	useEffect(() => {
		if (firstLoad) {
			dispatch(getAllTodoAction());
		}
	}, [dispatch, firstLoad]);
	// checked
	const addTodoHandler = (task: string) => {
		dispatch(addNewTodoAction(task));
	};
	// checked
	const isEditingHandler = (mainTask: IMainTask) => {
		setIsEditing(true);
		dispatch(editSelectedTodoAction(mainTask));
	};
	// checked
	const confirmEditingHandler = (task: string) => {
		dispatch(confirmEditAction(task));
		setIsEditing(false);
	};
	// checked
	const cancelMainTaskEditingHandler = () => {
		dispatch(cancelEditMainTaskAction());
		setIsEditing(false);
	};
	// checked
	const deleteMainTaskHandler = (mainTaskId: string) => {
		dispatch(deleteMainTodoAction(mainTaskId));
	};
	// checked
	const goToSubTaskPageHandler = (selectedTask: IMainTask) => {
		dispatch(setSelectedTodoAction(selectedTask));
		let str = selectedTask.mainTaskName;
		str = str.replace(/\s+/g, "-").toLowerCase();
		router.push(`${router.asPath}/${str}`);
		// router.push(`/n/${selectedTask.mainTaskName}`);
	};
	// working on
	const deleteAllDoneMainTaskHandler = () => {
		dispatch(deleteAllDoneMainTaskAction());
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
					itemToEdit={mainTodoToEdit.mainTaskName}
					confirmEditing={confirmEditingHandler}
					onCancelEditing={cancelMainTaskEditingHandler}
				/>
			)}
			<ListContainer>
				{firstLoad && (
					<MainList
						mainTaskList={allTasks}
						onEditing={isEditingHandler}
						onDeleteMainTask={deleteMainTaskHandler}
						onSeeSubTaskPage={goToSubTaskPageHandler}
						onDeleteAllDone={deleteAllDoneMainTaskHandler}
					/>
				)}
				{!firstLoad && (
					<MainList
						mainTaskList={mainTodoList}
						onEditing={isEditingHandler}
						onDeleteMainTask={deleteMainTaskHandler}
						onSeeSubTaskPage={goToSubTaskPageHandler}
						onDeleteAllDone={deleteAllDoneMainTaskHandler}
					/>
				)}
				{/* {firstLoad && <TodoList allTasks={allTasks} />} */}
				{/* {!firstLoad && <TodoList allTasks={todoList} />} */}
			</ListContainer>
		</Card>
	);
};

export default Home;
