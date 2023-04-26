import React from "react";

interface propsTypes {
	length: number;
	onSelectTab: (tabName: string) => void;
	selectedTab: string;
	onDeleteAllDone: () => void;
}

const Summary: React.FC<propsTypes> = ({
	length,
	onSelectTab,
	selectedTab,
	onDeleteAllDone,
}) => {
	const deleteAllDoneHandler = () => {
		onDeleteAllDone();
	};

	const clickTabHandler = (e: React.MouseEvent<HTMLLIElement>) => {
		const tabName = e.currentTarget.id;
		console.log("here", tabName);
		onSelectTab(tabName);
	};
	let classAll = selectedTab === "all" ? "bg-[#E3E9FF]" : "";
	let classActive = selectedTab === "active" ? "bg-[#E3E9FF]" : "";
	let classDone = selectedTab === "done" ? "bg-[#E3E9FF]" : "";

	return (
		<main className='flex text-[10px]  justify-between bg-white  '>
			<section className='border border-black p-2'>
				{length} {length > 1 ? "tasks" : "task"}
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
				onClick={deleteAllDoneHandler}
			>
				Delete All Done
			</button>
		</main>
	);
};

export default Summary;
