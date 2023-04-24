import React from "react";
import TodoItem from "./TodoItem";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	allTasks: ITask[];
}
const TodoList: React.FC<propsType> = ({ allTasks }) => {
	return (
		<ul>
			{allTasks.map((task, index) => (
				<TodoItem
					key={task._id}
					task={task}
					index={index}
				/>
			))}
		</ul>
	);
};

export default TodoList;
