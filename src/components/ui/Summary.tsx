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
		onSelectTab(tabName);
	};
	let classAll = selectedTab === "all" ? "bg-[#AF7EEB] text-white" : "";
	let classActive = selectedTab === "active" ? "bg-[#AF7EEB] text-white" : "";
	let classDone = selectedTab === "done" ? "bg-[#AF7EEB] text-white" : "";

	return (
		<main className='flex text-[10px]  justify-between  '>
			<section className='border border-black p-2 bg-white '>
				{length} {length > 1 ? "tasks" : "task"}
			</section>
			<ul className='flex bg-white '>
				<li
					className={`border border-black p-2 ${classAll} cursor-pointer`}
					id='all'
					onClick={clickTabHandler}
					data-testid={`filter_all`}
				>
					All
				</li>
				<li
					className={`border border-black p-2 ${classActive} cursor-pointer`}
					id='active'
					onClick={clickTabHandler}
					data-testid={`filter_active`}
				>
					Active
				</li>
				<li
					className={`border border-black p-2 ${classDone} cursor-pointer`}
					id='done'
					onClick={clickTabHandler}
					data-testid={`filter_done`}
				>
					Done
				</li>
			</ul>

			<button
				className='border border-black p-2 bg-white cursor-pointer'
				onClick={deleteAllDoneHandler}
				data-testid={`delete_all_done_button`}
			>
				Delete All Done
			</button>
		</main>
	);
};

export default Summary;
