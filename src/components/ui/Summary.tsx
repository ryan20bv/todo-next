import React, { useState } from "react";
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";

import { updateFilteredTodoListAction } from "@/reduxToolkit/todo/todo-action/todoAction";

interface propsTypes {
	onDeleteDone: () => void;
}

const Summary: React.FC<propsTypes> = ({ onDeleteDone }) => {
	const dispatch = useAppDispatch();
	const { filteredTodoList, selectedTab } = useAppSelector(
		(state: RootState) => state.todoReducer
	);
	let todoLength: number = filteredTodoList.length;

	const clickTabHandler = (e: React.MouseEvent<HTMLLIElement>) => {
		const tabName = e.currentTarget.id;
		// onUpdateTab(tabName);
		dispatch(updateFilteredTodoListAction(tabName));
	};
	let classAll = selectedTab === "all" ? "bg-[#E3E9FF]" : "";
	let classActive = selectedTab === "active" ? "bg-[#E3E9FF]" : "";
	let classDone = selectedTab === "done" ? "bg-[#E3E9FF]" : "";

	return (
		<main className='flex text-[10px] w-[90%] justify-between bg-white  '>
			<section className='border border-black p-2'>
				{todoLength} {todoLength > 1 ? "tasks" : "task"}
			</section>
			<ul className='flex '>
				<li
					className={`border border-black p-2 ${classAll}`}
					id='all'
					onClick={clickTabHandler}
				>
					All
				</li>
				<li
					className={`border border-black p-2 ${classActive}`}
					id='active'
					onClick={clickTabHandler}
				>
					Active
				</li>
				<li
					className={`border border-black p-2 ${classDone}`}
					id='done'
					onClick={clickTabHandler}
				>
					Done
				</li>
			</ul>

			<button
				className='border border-black p-2'
				onClick={onDeleteDone}
			>
				Delete All Done
			</button>
		</main>
	);
};

export default Summary;
