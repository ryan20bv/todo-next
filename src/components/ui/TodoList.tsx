import React from "react";

import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	allTasks: ITask[];
}
const TodoList: React.FC<propsType> = ({ allTasks }) => {
	return (
		<ul>
			{allTasks.map((task) => (
				<li key={task._id}> {task.name}</li>
			))}
		</ul>
	);
};

export default TodoList;
