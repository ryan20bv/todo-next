import React from "react";
import { useRouter } from "next/router";
import { IMainTask, ISubTask } from "@/DUMMY_DATA/MODEL";
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
import { setSelectedMainTaskAction } from "@/reduxToolkit/personal/personal-action/personalTodoAction";
import { setSelectedTodoAction } from "@/reduxToolkit/todo/todo-action/todoAction";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

interface propsType {
	mainTask: IMainTask;
	index: number;
	onEditing: (task: IMainTask) => void;
	onDeleteMainTask: (mainTaskId: string) => void;
	onSeeSubTaskPage: (mainTask: IMainTask) => void;
}

const MainItem: React.FC<propsType> = ({
	mainTask,
	index,
	onEditing,
	onDeleteMainTask,
	onSeeSubTaskPage,
}) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	// console.log(router);
	const { isAuthenticated } = useAppSelector(
		(state: RootState) => state.authReducer
	);
	// !checkedHome
	const setIsEditingHandler = (task: IMainTask) => {
		onEditing(task);
	};
	const seeSubTaskHandler = (selectedTask: IMainTask) => {
		onSeeSubTaskPage(selectedTask);
		// if (!isAuthenticated) {
		// 	dispatch(setSelectedTodoAction(selectedTask));
		// 	router.push(`/n/${selectedTask.mainTaskId}`);
		// } else {
		// 	dispatch(setSelectedMainTaskAction(selectedTask));
		// 	let str = selectedTask.mainTaskName;
		// 	str = str.replace(/\s+/g, "-").toLowerCase();
		// 	router.push(`${router.asPath}/${str}`);
		// }
	};
	const deleteHandler = (id: string) => {
		onDeleteMainTask(id);
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
