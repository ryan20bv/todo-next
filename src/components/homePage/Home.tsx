import React from "react";
import TodoForm from "../ui/TodoForm";
import TodoList from "../ui/TodoList";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	allTasks: ITask[];
}

const Home: React.FC<propsType> = ({ allTasks }) => {
	return (
		<main className='flex flex-col items-center w-screen h-screen pt-8'>
			<h1>TODO nextJS</h1>
			<TodoForm />
			<TodoList allTasks={allTasks} />
		</main>
	);
};

export default Home;
