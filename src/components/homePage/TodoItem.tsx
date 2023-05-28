import React from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/reduxToolkit/indexStore/indexStore";
import {
	updateTodoIsDoneAction,
	deleteMainTodoAction,
	editSelectedTodoAction,
} from "@/reduxToolkit/todo/todo-action/todoAction";
import { setTodoDetailAction } from "@/reduxToolkit/todo/todo-action/detailAction";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { IMainTask } from "@/DUMMY_DATA/MODEL";

interface propsType {
	task: IMainTask;
	index: number;
}

const TodoItem: React.FC<propsType> = ({ task, index }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const setIsDoneHandler = (id: string) => {
		dispatch(updateTodoIsDoneAction(id));
	};
	const setIsEditingHandler = (todo: IMainTask) => {
		dispatch(editSelectedTodoAction(todo));
	};
	const deleteHandler = (id: string) => {
		dispatch(deleteMainTodoAction(id));
	};
	const todoDetailHandler = (id: string) => {
		dispatch(setTodoDetailAction(id));
		router.push(`/n/${id}`);
	};

	let summaryName = task.name;
	if (task.name.length > 10) {
		summaryName = task.name.substring(0, 10) + "...";
	}
	let detailsTotal = task.details.length || 0;
	const setDone: string = task.isDone ? "line-through" : "";
	return (
		<li
			key={task._id}
			className='flex px-1 w-full justify-between items-center '
		>
			<section className='flex items-center'>
				{/* <input
					type='checkbox'
					name=''
					id=''
					checked={task.isDone ? true : false}
					onChange={() => setIsDoneHandler(task._id)}
					className='cursor-pointer bg-black'
				/> */}

				<h3
					className={`${setDone} pl-2 pr-1 cursor-pointer `}
					onClick={() => todoDetailHandler(task._id)}
					data-testid={`task_${task.name}`}
				>
					<span>{index + 1 + "."}</span>
					{summaryName}
					<span className='text-red-600 ml-2'>{`(${detailsTotal})`}</span>
				</h3>
			</section>
			<section>
				{!task.isDone && (
					<button
						onClick={() => setIsEditingHandler(task)}
						// data-testid={`task_edit_button_${task.name}`}
						// title={`task_edit_button_${task.name}`}
					>
						<PencilSquareIcon
							className='text-blue-600 h-6 hover:text-gray-400'
							data-testid={`task_edit_button_${task.name}`}
						/>
					</button>
				)}
				<button onClick={() => deleteHandler(task._id)}>
					<TrashIcon
						className='text-red-600 h-6 hover:text-gray-400'
						data-testid={`task_delete_button_${task.name}`}
					/>
				</button>
			</section>
		</li>
	);
};

export default TodoItem;
