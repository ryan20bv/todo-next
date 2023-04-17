import React from "react";
import TodoItem from "./TodoItem";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	allTasks: ITask[];
	onSetToDone: (id: string) => void;
	onDeleteTodo: (id: string) => void;
	onEditTodo: (todo: ITask) => void;
}
const TodoList: React.FC<propsType> = ({
	allTasks,
	onSetToDone,
	onDeleteTodo,
	onEditTodo,
}) => {
	return (
		<ul className='border border-black bg-white w-[90%] h-4/6  overflow-y-scroll'>
			{allTasks.map((task) => (
				<TodoItem
					key={task._id}
					task={task}
					onSetToDone={() => onSetToDone(task._id)}
					onDeleteTodo={() => onDeleteTodo(task._id)}
					onEditTodo={() => onEditTodo(task)}
				/>
			))}
		</ul>
	);
};

export default TodoList;
