import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoAddForm from "../ui/TodoAddForm";
import TodoEditForm from "../ui/TodoEditForm";
import TodoList from "../ui/TodoList";
import Summary from "../ui/Summary";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	allTasks: ITask[];
}

const Home: React.FC<propsType> = ({ allTasks }) => {
	const [allTodos, setAllTodos] = useState<ITask[]>(allTasks);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [todoToEdit, setTodoToEdit] = useState<ITask>({} as ITask);

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

	const selectTodoToEditHandler = (todo: ITask) => {
		setIsEditing(true);
		setTodoToEdit(todo);
	};

	const cancelTodoEditHandler = () => {
		setIsEditing(false);
		setTodoToEdit({} as ITask);
	};

	const confirmEditTodoHandler = (editedTodoName: string) => {
		const copyOfTodos = [...allTodos];
		const foundTodoIndex = copyOfTodos.findIndex(
			(todo) => todo._id === todoToEdit._id
		);

		copyOfTodos[foundTodoIndex] = {
			...copyOfTodos[foundTodoIndex],
			name: editedTodoName,
		};
		setAllTodos(copyOfTodos);
		cancelTodoEditHandler();
	};

	return (
		<main className='flex flex-col items-center w-screen h-screen pt-8'>
			<section className='bg-[#AF7EEB] w-[90%] py-2 px-3 text-white'>
				<h1>TODO nextJS</h1>
			</section>

			{!isEditing && <TodoAddForm onAddTodo={addNewTodo} />}
			{isEditing && (
				<TodoEditForm
					onCancelEditTodo={cancelTodoEditHandler}
					todoToEdit={todoToEdit}
					onConfirmEdit={confirmEditTodoHandler}
				/>
			)}

			<TodoList
				allTasks={allTodos}
				onSetToDone={setToDoneHandler}
				onDeleteTodo={deleteTodoHandler}
				onEditTodo={selectTodoToEditHandler}
			/>
			<Summary />
		</main>
	);
};

export default Home;
