import React, { useState } from "react";

interface propsTypes {
	selectedTab: string;
	onUpdateTab: (info: string) => void;
	todoLength: number;
	onDeleteDone: () => void;
}

const Summary: React.FC<propsTypes> = ({
	selectedTab,
	onUpdateTab,
	todoLength,
	onDeleteDone,
}) => {
	const clickTabHandler = (e: React.MouseEvent<HTMLLIElement>) => {
		console.log(e.currentTarget.id);
		onUpdateTab(e.currentTarget.id);
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
