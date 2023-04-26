import React, { useState } from "react";
import DetailItem from "./DetailItem";
import Summary from "../ui/Summary";

import { ITodoDetails } from "@/DUMMY_DATA/MODEL";
interface propsTypes {
	details: ITodoDetails[];
	isLoading: boolean;
}

const DetailsLists: React.FC<propsTypes> = ({ details, isLoading }) => {
	const [selectedTab, setSelectedTab] = useState<string>("all");

	const updateSelectedTabHandler = (tabName: string) => {
		setSelectedTab(tabName);
	};

	let filteredList = details;
	if (selectedTab === "active") {
		filteredList = details.filter(
			(detail: ITodoDetails) => detail.isDone === false
		);
	} else if (selectedTab === "done") {
		filteredList = details.filter(
			(detail: ITodoDetails) => detail.isDone === true
		);
	}

	let length: number = filteredList?.length;
	return (
		<>
			<div className='h-96 bg-white  overflow-y-scroll mb-4 border border-black p-2'>
				{isLoading && <h1>Loading...</h1>}
				{!isLoading && (
					<>
						<h3>Details</h3>
						<ul className='py-2 px-2 list-disc h-full'>
							{filteredList.map((detail) => (
								<DetailItem
									key={detail._id}
									detail={detail}
								/>
							))}
						</ul>
					</>
				)}
			</div>
			<Summary
				length={length}
				onSelectTab={updateSelectedTabHandler}
				selectedTab={selectedTab}
			/>
		</>
	);
};

export default DetailsLists;
