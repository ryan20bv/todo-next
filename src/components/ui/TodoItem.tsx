import React from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	task: ITask;
	onSetToDone: () => void;
	onDeleteTodo: () => void;
	onEditTodo: () => void;
}

const TodoItem: React.FC<propsType> = ({
	task,
	onSetToDone,
	onDeleteTodo,
	onEditTodo,
}) => {
	const setClass: string = task.isDone ? "line-through" : "";
	return (
		<li key={task._id}>
			<h3
				onClick={onSetToDone}
				className={setClass}
			>
				{task.name}
			</h3>
			{!task.isDone && (
				<button onClick={onEditTodo}>
					<PencilSquareIcon className='text-blue-600 h-6' />
				</button>
			)}
			<button onClick={onDeleteTodo}>
				<TrashIcon className='text-red-600 h-6' />
			</button>
		</li>
	);
};

export default TodoItem;
