import React, { useState } from "react";
import SubItem from "./SubItem";
import Summary from "@/components/ui/Summary";
import { ISubTask } from "@/DUMMY_DATA/MODEL";

interface PropsType {
	subTaskList: ISubTask[];
	isDoneHandler: (id: string) => void;
	onDeleteSubTodo: (subTask: ISubTask) => void;
	onEditingSubTask: (subTask: ISubTask) => void;
	onDeleteAllDone: () => void;
}

const SubList: React.FC<PropsType> = ({
	subTaskList,
	isDoneHandler,
	onDeleteSubTodo,
	onEditingSubTask,
	onDeleteAllDone,
}) => {
	const [selectedTab, setSelectedTab] = useState<string>("all");
	const updateSelectedTabHandler = (tabName: string) => {
		setSelectedTab(tabName);
	};

	let filteredList = subTaskList;
	if (selectedTab === "active") {
		filteredList = subTaskList.filter(
			(subTask: ISubTask) => subTask.isDone === false
		);
	} else if (selectedTab === "done") {
		filteredList = subTaskList.filter(
			(subTask: ISubTask) => subTask.isDone === true
		);
	}
	let length: number = filteredList?.length || 0;
	return (
		<div className=''>
			<div className='h-96  bg-white   mb-4 border border-black p-2 overflow-y-scroll'>
				<div>
					<h3 className='text-center mt-1'>
						{length > 0 ? "SubTask/s" : "No Sub Task"} - {selectedTab}
					</h3>
					{length > 0 && (
						<ul className='py-2 px-2 list-disc h-full'>
							{filteredList.map((subTask) => (
								<SubItem
									key={subTask._id}
									subTask={subTask}
									isDoneHandler={isDoneHandler}
									onDeleteSubTodo={onDeleteSubTodo}
									onEditingSubTask={onEditingSubTask}
								/>
							))}
						</ul>
					)}
				</div>
			</div>
			<Summary
				length={length}
				onSelectTab={updateSelectedTabHandler}
				selectedTab={selectedTab}
				onDeleteAllDone={onDeleteAllDone}
			/>
		</div>
	);
};

export default SubList;
