import React, { useState } from "react";

const Summary = () => {
	const [selectedTab, setSelectedTab] = useState<string>("all");
	const clickTabHandler = (e: React.MouseEvent<HTMLLIElement>) => {
		console.log(e.currentTarget.id);
		setSelectedTab(e.currentTarget.id);
	};
	let classAll = "";
	let classActive = "";
	let classDone = "";
	if (selectedTab === "all") {
		classAll = "bg-[#E3E9FF]";
	} else if (selectedTab === "active") {
		classActive = "bg-[#E3E9FF]";
	} else {
		classDone = "bg-[#E3E9FF]";
	}

	return (
		<main className='flex text-[10px] w-[90%] justify-between bg-white  '>
			<section className='border border-black p-2'>10 task/s</section>
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

			<button className='border border-black p-2'>Delete All Done</button>
		</main>
	);
};

export default Summary;
