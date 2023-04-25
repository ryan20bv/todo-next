import React, { useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
import { getAllTodoAction } from "@/reduxToolkit/todo/todo-action/todoAction";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import AddForm from "../ui/AddForm";
import TodoEditForm from "../ui/TodoEditForm";
import ListContainer from "../ui/ListContainer";
import TodoList from "./TodoList";
import Summary from "../ui/Summary";
import { addNewTodoAction } from "@/reduxToolkit/todo/todo-action/todoAction";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	allTasks: ITask[];
}

const Home: React.FC<propsType> = ({ allTasks }) => {
	const dispatch = useAppDispatch();
	const { filteredTodoList, firstLoad, isEditing, todoToEdit } = useAppSelector(
		(state: RootState) => state.todoReducer
	);

	useEffect(() => {
		dispatch(getAllTodoAction());
	}, [dispatch]);

	let todoLength: number = firstLoad ? allTasks.length : filteredTodoList.length;
	const title = <h1>TODO nextJS</h1>;

	const addHandler = (task: string) => {
		dispatch(addNewTodoAction(task));
	};

	const burgerMenuHandler = () => {
		console.log("burger menu");
	};

	return (
		<Card>
			<CardHeader
				title={title}
				onIconHandler={burgerMenuHandler}
				isInDetails={false}
			/>
			{!isEditing && (
				<AddForm
					onAddHandler={addHandler}
					placeHolder='add todo'
				/>
			)}
			{isEditing && <TodoEditForm todoToEdit={todoToEdit} />}
			<ListContainer>
				{firstLoad && <TodoList allTasks={allTasks} />}
				{!firstLoad && <TodoList allTasks={filteredTodoList} />}
			</ListContainer>

			<Summary todoLength={todoLength} />
		</Card>
	);
};

export default Home;

// return (
// 	<main className=' pt-2 pb-6 flex justify-center '>
// 		<div className='flex flex-col items-center w-[90%] sm:w-96 border border-black'>
// 			<section className='bg-[#AF7EEB] w-full py-2 px-3 text-white text-center'>
// 				<h1>TODO nextJS</h1>
// 			</section>

// 			{!isEditing && <TodoAddForm />}
// 			{isEditing && <TodoEditForm todoToEdit={todoToEdit} />}
// 			{firstLoad && <TodoList allTasks={allTasks} />}
// 			{!firstLoad && <TodoList allTasks={filteredTodoList} />}

// 			<Summary todoLength={todoLength} />
// 		</div>
// 	</main>
// );
