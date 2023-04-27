import React, { useState } from "react";
import DetailItem from "./DetailItem";
import Summary from "../ui/Summary";
import { useAppDispatch } from "@/reduxToolkit/indexStore/indexStore";
import { deleteAllDoneDetailAction } from "@/reduxToolkit/todo/todo-action/detailAction";

import { ITodoDetails } from "@/DUMMY_DATA/MODEL";
interface propsTypes {
	details: ITodoDetails[];
	isLoading: boolean;
}

const DetailsLists: React.FC<propsTypes> = ({ details, isLoading }) => {
	const dispatch = useAppDispatch();
	const [selectedTab, setSelectedTab] = useState<string>("all");

	const updateSelectedTabHandler = (tabName: string) => {
		setSelectedTab(tabName);
	};
	const deleteAllDetailDoneHandler = () => {
		dispatch(deleteAllDoneDetailAction());
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
		<div className=''>
			<div className='h-96  bg-white   mb-4 border border-black p-2 overflow-y-scroll'>
				{isLoading && <h1>Loading...</h1>}
				{!isLoading && (
					<div>
						<h3>
							{length > 0 ? "Details" : "No Details"} - {selectedTab}
						</h3>
						{length > 0 && (
							<ul className='py-2 px-2 list-disc h-full'>
								{filteredList.map((detail) => (
									<DetailItem
										key={detail._id}
										detail={detail}
									/>
								))}
							</ul>
						)}
					</div>
				)}
			</div>
			<Summary
				length={length}
				onSelectTab={updateSelectedTabHandler}
				selectedTab={selectedTab}
				onDeleteAllDone={deleteAllDetailDoneHandler}
			/>
		</div>
	);
};

export default DetailsLists;
