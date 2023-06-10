import React from "react";

import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { ISubTask } from "@/DUMMY_DATA/MODEL";

interface PropsType {
	subTask: ISubTask;
	isDoneHandler: (id: string) => void;
	onDeleteSubTodo: (subTask: ISubTask) => void;
	onEditingSubTask: (subTask: ISubTask) => void;
}

const SubItem: React.FC<PropsType> = ({
	subTask,
	isDoneHandler,
	onDeleteSubTodo,
	onEditingSubTask,
}) => {
	const setDone: string = subTask.isDone ? "line-through" : "";

	const isDoneDetailHandler = (subTaskId: string) => {
		isDoneHandler(subTaskId);
	};
	const deleteDetailHandler = (subTask: ISubTask) => {
		onDeleteSubTodo(subTask);
	};
	const onEditingSubTaskHandler = (subTask: ISubTask) => {
		onEditingSubTask(subTask);
	};

	return (
		<main className='flex px-1 w-full justify-between items-center '>
			<section className='flex w-4/5 whitespace-normal'>
				<input
					className='mr-6'
					type='checkbox'
					// name={`detail_input_button${detail.item}`}
					id={`detail_input_button_${subTask._id}`}
					checked={subTask.isDone ? true : false}
					onChange={() => isDoneDetailHandler(subTask._id)}
					// data-testid={`detail_input_button${detail.item}`}
				/>
				<li className={`${setDone} pl-0 pr-1`}>
					<p data-testid={`detail_${subTask._id}`}>{subTask.subTaskName}</p>
				</li>
			</section>

			<section>
				{!subTask.isDone && (
					<button onClick={() => onEditingSubTaskHandler(subTask)}>
						<PencilSquareIcon
							className='text-blue-600 h-6 hover:text-gray-400'
							data-testid={`detail_edit_button_${subTask._id}`}
						/>
					</button>
				)}

				<button onClick={() => deleteDetailHandler(subTask)}>
					<TrashIcon
						className='text-red-600 h-6 hover:text-gray-400'
						data-testid={`detail_delete_button_${subTask._id}`}
					/>
				</button>
			</section>
		</main>
	);
};

export default SubItem;
