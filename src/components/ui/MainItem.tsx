import React from "react";
import { IMainTask } from "@/DUMMY_DATA/MODEL";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

interface propsType {
	mainTask: IMainTask;
	index: number;
}

const MainItem: React.FC<propsType> = ({ mainTask, index }) => {
	const setIsEditingHandler = (task: IMainTask) => {
		console.log("isEditingHandler");
	};
	const deleteHandler = (id: string) => {
		console.log("deleteHandler");
	};

	let summaryName = mainTask.mainTaskName;
	if (mainTask.mainTaskName.length > 10) {
		summaryName = mainTask.mainTaskName.substring(0, 10) + "...";
	}
	let detailsTotal = mainTask.subTaskList.length || 0;
	const setDone: string = mainTask.isAllSubTaskDone ? "line-through" : "";

	return (
		<li
			key={mainTask.mainTaskId}
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
					onClick={() => {}}
					data-testid={`task_${mainTask.mainTaskName}`}
				>
					<span>{index + 1 + "."}</span>
					{summaryName}
					<span className='text-red-600 ml-2'>{`(${detailsTotal})`}</span>
				</h3>
			</section>
			<section>
				{!mainTask.isAllSubTaskDone && (
					<button
						onClick={() => setIsEditingHandler(mainTask)}
						// data-testid={`task_edit_button_${task.name}`}
						// title={`task_edit_button_${task.name}`}
					>
						<PencilSquareIcon
							className='text-blue-600 h-6 hover:text-gray-400'
							data-testid={`task_edit_button_${mainTask.mainTaskName}`}
						/>
					</button>
				)}
				<button onClick={() => deleteHandler(mainTask.mainTaskId)}>
					<TrashIcon
						className='text-red-600 h-6 hover:text-gray-400'
						data-testid={`task_delete_button_${mainTask.mainTaskName}`}
					/>
				</button>
			</section>
		</li>
	);
};

export default MainItem;
