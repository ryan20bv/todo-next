import React from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/reduxToolkit/indexStore/indexStore";
import {
	updateTodoIsDoneAction,
	deleteTodoAction,
	selectTodoToEditAction,
} from "@/reduxToolkit/todo/todo-action/todoAction";
import { setTodoDetailAction } from "@/reduxToolkit/todo/todo-action/detailAction";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { ITask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	task: ITask;
	index: number;
}

const TodoItem: React.FC<propsType> = ({ task, index }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
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
	const todoDetailHandler = (id: string) => {
		dispatch(setTodoDetailAction(id));
		router.push(`/n/${id}`);
	};

	let summaryName = task.name;
	if (task.name.length > 15) {
		summaryName = task.name.substring(0, 15) + "...";
	}
	let detailsTotal = task.details.length || 0;

	return (
		<li
			key={task._id}
			className='flex px-2 w-full justify-between items-center '
		>
			<section className='flex items-center'>
				<input
					type='checkbox'
					name=''
					id=''
					checked={task.isDone ? true : false}
					onChange={() => setIsDoneHandler(task._id)}
				/>

				<h3
					className={`${setDone} px-2`}
					onClick={() => todoDetailHandler(task._id)}
				>
					<span>{index + 1 + ". "}</span>
					{summaryName}
					<span>{`(${detailsTotal})`}</span>
				</h3>
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