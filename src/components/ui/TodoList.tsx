import React from "react";
import TodoItem from "./TodoItem";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	allTasks: ITask[];
	onSetToDone: (id: string) => void;
	onDeleteTodo: (id: string) => void;
}
const TodoList: React.FC<propsType> = ({
	allTasks,
	onSetToDone,
	onDeleteTodo,
}) => {
	return (
		<ul>
			{allTasks.map((task) => (
				<TodoItem
					key={task._id}
					task={task}
					onSetToDone={() => onSetToDone(task._id)}
					onDeleteTodo={() => onDeleteTodo(task._id)}
				/>
			))}
		</ul>
	);
};

export default TodoList;
