import React, { useState } from "react";
import SubItem from "./SubItem";
import Summary from "@/components/ui/Summary";

const SubList = () => {
	const [selectedTab, setSelectedTab] = useState<string>("all");
	const updateSelectedTabHandler = (tabName: string) => {
		setSelectedTab(tabName);
	};
	const deleteAllDetailDoneHandler = () => {
		console.log("deleteAll");
	};

	return (
		<div className=''>
			<div className='h-96  bg-white   mb-4 border border-black p-2 overflow-y-scroll'>
				{/* {isLoading && <h1>Loading...</h1>}
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
				)} */}
				<div>
					<h3>
						{length > 0 ? "Details" : "No Details"} - {selectedTab}
					</h3>
					<ul className='py-2 px-2 list-disc h-full'>
						<SubItem />
					</ul>
				</div>
			</div>
			<Summary
				length={3}
				onSelectTab={updateSelectedTabHandler}
				selectedTab={selectedTab}
				onDeleteAllDone={deleteAllDetailDoneHandler}
			/>
		</div>
	);
};

export default SubList;
