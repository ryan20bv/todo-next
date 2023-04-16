import React from "react";
import TodoItem from "./TodoItem";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	allTasks: ITask[];
	onSetToDone: (id: string) => void;
}
const TodoList: React.FC<propsType> = ({ allTasks, onSetToDone }) => {
	return (
		<ul>
			{allTasks.map((task) => (
				<TodoItem
					key={task._id}
					task={task}
					onSetToDone={() => onSetToDone(task._id)}
				/>
			))}
		</ul>
	);
};

export default TodoList;
