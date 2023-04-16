import React from "react";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	task: ITask;
	onSetToDone: () => void;
}

const TodoItem: React.FC<propsType> = ({ task, onSetToDone }) => {
	const setClass: string = task.isDone ? "line-through" : "";
	return (
		<li
			key={task._id}
			onClick={onSetToDone}
			className={setClass}
		>
			{task.name}
		</li>
	);
};

export default TodoItem;
