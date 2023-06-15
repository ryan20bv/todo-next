import React, { useState } from "react";
import Summary from "../../ui/Summary";
import MainItem from "./MainItem";
import { IMainTask } from "@/DUMMY_DATA/MODEL";

interface PropsTypes {
	mainTaskList: IMainTask[];
	onEditing: (mainTask: IMainTask) => void;
	onDeleteMainTask: (mainTask: IMainTask) => void;
	onSeeSubTaskPage: (mainTask: IMainTask) => void;
	onDeleteAllDone: () => void;
}

const MainList: React.FC<PropsTypes> = ({
	mainTaskList,
	onEditing,
	onDeleteMainTask,
	onSeeSubTaskPage,
	onDeleteAllDone,
}) => {
	const [selectedTab, setSelectedTab] = useState<string>("all");

	const updateSelectedTabHandler = (tabName: string) => {
		setSelectedTab(tabName);
	};

	let filteredTodoList = mainTaskList;
	if (selectedTab === "active") {
		filteredTodoList = mainTaskList.filter(
			(todo: IMainTask) => todo.isAllSubTaskDone === false
		);
	} else if (selectedTab === "done") {
		filteredTodoList = mainTaskList.filter(
			(todo: IMainTask) => todo.isAllSubTaskDone === true
		);
	}

	let todoLength: number = filteredTodoList.length;
	let haveDoneTask = mainTaskList.some(
		(mainTask: IMainTask) => mainTask.isAllSubTaskDone === true
	);
	return (
		<>
			<div className='h-96 bg-white  overflow-y-scroll mb-4 border border-black '>
				<ul className='p-3  h-full'>
					{todoLength === 0 && (
						<p className='text-center m-8'>Main Task is Empty!</p>
					)}
					{todoLength > 0 &&
						filteredTodoList.map((mainTask, index) => (
							<MainItem
								key={mainTask._id}
								mainTask={mainTask}
								index={index}
								onEditing={onEditing}
								onDeleteMainTask={onDeleteMainTask}
								onSeeSubTaskPage={onSeeSubTaskPage}
							/>
						))}
				</ul>
			</div>
			<Summary
				length={todoLength}
				selectedTab={selectedTab}
				onSelectTab={updateSelectedTabHandler}
				onDeleteAllDone={onDeleteAllDone}
				haveDoneTask={haveDoneTask}
			/>
		</>
	);
};

export default MainList;
