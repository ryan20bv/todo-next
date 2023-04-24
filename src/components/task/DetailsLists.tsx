import React from "react";
import DetailItem from "./DetailItem";

import { ITodoDetails } from "@/DUMMY_DATA/MODEL";
interface propsTypes {
	details: ITodoDetails[];
}

const DetailsLists: React.FC<propsTypes> = ({ details }) => {
	return (
		<>
			<h3>Details</h3>
			<ul className='py-2 px-4 list-disc'>
				{details.map((detail) => (
					<DetailItem
						key={detail._id}
						detail={detail}
					/>
				))}
			</ul>
		</>
	);
};

export default DetailsLists;
