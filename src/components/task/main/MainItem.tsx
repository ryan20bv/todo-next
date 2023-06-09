import React from "react";

import { IMainTask, ISubTask } from "@/DUMMY_DATA/MODEL";

import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

interface propsType {
	mainTask: IMainTask;
	index: number;
	onEditing: (task: IMainTask) => void;
	onDeleteMainTask: (mainTask: IMainTask) => void;
	onSeeSubTaskPage: (mainTask: IMainTask) => void;
}

const MainItem: React.FC<propsType> = ({
	mainTask,
	index,
	onEditing,
	onDeleteMainTask,
	onSeeSubTaskPage,
}) => {
	const setIsEditingHandler = (task: IMainTask) => {
		onEditing(task);
	};
	const seeSubTaskHandler = (selectedTask: IMainTask) => {
		onSeeSubTaskPage(selectedTask);
	};
	const deleteHandler = (mainTask: IMainTask) => {
		onDeleteMainTask(mainTask);
	};

	let summaryName = mainTask.mainTaskName;
	if (mainTask.mainTaskName.length > 10) {
		summaryName = mainTask.mainTaskName.substring(0, 10) + "...";
	}
	let subTaskThatIsDoneTotal: number = 0;
	mainTask.subTaskList.forEach((subTask: ISubTask) => {
		if (subTask.isDone) {
			subTaskThatIsDoneTotal++;
		}
	});

	let subTaskTotal = mainTask.subTaskList.length || 0;
	const setDone: string = mainTask.isAllSubTaskDone ? "line-through" : "";
	let taskDataToShow = `(${subTaskThatIsDoneTotal}/${subTaskTotal})`;
	if (subTaskTotal === 0) {
		taskDataToShow = "(0)";
	}
	return (
		<li
			key={mainTask.mainTaskId}
			className='flex px-1 w-full justify-between items-center '
		>
			<section className='flex items-center'>
				<h3
					className={`${setDone} pl-2 pr-1 cursor-pointer `}
					onClick={() => seeSubTaskHandler(mainTask)}
					data-testid={`task_${mainTask.mainTaskName}`}
				>
					<span>{index + 1 + "."}</span>
					{summaryName}
					<span className='text-red-600 ml-2 '>{taskDataToShow}</span>
				</h3>
			</section>
			<section>
				{!mainTask.isAllSubTaskDone && (
					<button onClick={() => setIsEditingHandler(mainTask)}>
						<PencilSquareIcon
							className='text-blue-600 h-6 hover:text-gray-400'
							data-testid={`task_edit_button_${mainTask.mainTaskName}`}
						/>
					</button>
				)}
				<button onClick={() => deleteHandler(mainTask)}>
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
