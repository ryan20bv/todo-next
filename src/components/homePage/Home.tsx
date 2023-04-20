import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
import { getAllTodoAction } from "@/reduxToolkit/todo/todo-action/todoAction";
import TodoAddForm from "../ui/TodoAddForm";
import TodoEditForm from "../ui/TodoEditForm";
import TodoList from "../ui/TodoList";
import Summary from "../ui/Summary";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	allTasks: ITask[];
}

const Home: React.FC<propsType> = ({ allTasks }) => {
	const dispatch = useAppDispatch();
	const { filteredTodoList, firstLoad, isEditing, todoToEdit } = useAppSelector(
		(state: RootState) => state.todoReducer
	);
	// const [allTodos, setAllTodos] = useState<ITask[]>(allTasks);
	// const [isEditing, setIsEditing] = useState<boolean>(false);
	// const [todoToEdit, setTodoToEdit] = useState<ITask>({} as ITask);
	// const [selectedTab, setSelectedTab] = useState<string>("all");

	useEffect(() => {
		dispatch(getAllTodoAction());
	}, [dispatch]);

	let todoLength: number = firstLoad ? allTasks.length : filteredTodoList.length;

	return (
		<main className='w-screen h-screen pt-8 pb-6 flex justify-center'>
			<div className='flex flex-col items-center w-[90%] sm:w-96 border border-black'>
				<section className='bg-[#AF7EEB] w-full py-2 px-3 text-white text-center'>
					<h1>TODO nextJS</h1>
				</section>

				{!isEditing && <TodoAddForm />}
				{isEditing && <TodoEditForm todoToEdit={todoToEdit} />}
				{firstLoad && <TodoList allTasks={allTasks} />}
				{!firstLoad && <TodoList allTasks={filteredTodoList} />}

				<Summary todoLength={todoLength} />
			</div>
		</main>
	);
};

export default Home;
