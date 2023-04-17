import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoForm from "../ui/TodoForm";
import TodoList from "../ui/TodoList";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	allTasks: ITask[];
}

const Home: React.FC<propsType> = ({ allTasks }) => {
	const [allTodos, setAllTodos] = useState<ITask[]>(allTasks);

	const addNewTodo = (todo: string) => {
		const newTodo: ITask = {
			_id: uuidv4(),
			name: todo,
			isDone: false,
		};

		setAllTodos((prevState) => {
			return prevState.concat(newTodo);
		});
	};
	const setToDoneHandler = (id: string) => {
		const copyOfTodos = [...allTodos];
		const selectedTodoIndex = copyOfTodos.findIndex((todo) => todo._id === id);

		copyOfTodos[selectedTodoIndex] = {
			...copyOfTodos[selectedTodoIndex],
			isDone: !copyOfTodos[selectedTodoIndex].isDone,
		};

		setAllTodos(copyOfTodos);
	};

	const deleteTodoHandler = (id: string) => {
		const copyOfTodos = [...allTodos];
		const filteredTodo = copyOfTodos.filter((todo) => todo._id !== id);
		setAllTodos(filteredTodo);
	};
	return (
		<main className='flex flex-col items-center w-screen h-screen pt-8'>
			<h1>TODO nextJS</h1>
			<TodoForm onAddTodo={addNewTodo} />
			<TodoList
				allTasks={allTodos}
				onSetToDone={setToDoneHandler}
				onDeleteTodo={deleteTodoHandler}
			/>
		</main>
	);
};

export default Home;
