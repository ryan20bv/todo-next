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
	const setDone: string = task.isDone ? "line-through" : "";

	// const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	// const value = e.currentTarget.checked;

	// 	onSetToDone();
	// };
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
					onChange={onSetToDone}
				/>

				<h3 className={`${setDone} px-2`}>{summaryName}</h3>
			</section>
			<section>
				{!task.isDone && (
					<button onClick={onEditTodo}>
						<PencilSquareIcon className='text-blue-600 h-6' />
					</button>
				)}
				<button onClick={onDeleteTodo}>
					<TrashIcon className='text-red-600 h-6' />
				</button>
			</section>
		</li>
	);
};

export default TodoItem;
