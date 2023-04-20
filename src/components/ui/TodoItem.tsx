import React from "react";
import { useAppDispatch } from "@/reduxToolkit/indexStore/indexStore";
import {
	updateTodoIsDoneAction,
	deleteTodoAction,
	selectTodoToEditAction,
} from "@/reduxToolkit/todo/todo-action/todoAction";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	task: ITask;
}

const TodoItem: React.FC<propsType> = ({ task }) => {
	const dispatch = useAppDispatch();
	const setDone: string = task.isDone ? "line-through" : "";

	const setIsDoneHandler = (id: string) => {
		dispatch(updateTodoIsDoneAction(id));
	};
	const setIsEditingHandler = (todo: ITask) => {
		dispatch(selectTodoToEditAction(todo));
	};
	const deleteHandler = (id: string) => {
		dispatch(deleteTodoAction(id));
	};

	let summaryName = task.name;
	if (task.name.length > 15) {
		summaryName = task.name.substring(0, 15) + "...";
	}

	return (
		<li
			key={task._id}
			className='flex py-2 px-4 w-full justify-between items-center'
		>
			<section className='flex items-center'>
				<input
					type='checkbox'
					name=''
					id=''
					checked={task.isDone ? true : false}
					onChange={() => setIsDoneHandler(task._id)}
				/>

				<h3 className={`${setDone} px-2`}>{summaryName}</h3>
			</section>
			<section>
				{!task.isDone && (
					<button onClick={() => setIsEditingHandler(task)}>
						<PencilSquareIcon className='text-blue-600 h-6' />
					</button>
				)}
				<button onClick={() => deleteHandler(task._id)}>
					<TrashIcon className='text-red-600 h-6' />
				</button>
			</section>
		</li>
	);
};

export default TodoItem;
