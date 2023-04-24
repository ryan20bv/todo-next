import React from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { ITodoDetails } from "@/DUMMY_DATA/MODEL";

interface propsTypes {
	detail: ITodoDetails;
}

const DetailItem: React.FC<propsTypes> = ({ detail }) => {
	return (
		<div
			key={detail._id}
			className='flex px-4 w-full justify-between items-center '
		>
			<li className=''>
				<p>{detail.item}</p>
			</li>
			<section>
				<button>
					<PencilSquareIcon className='text-blue-600 h-6' />
				</button>
				<button>
					<TrashIcon className='text-red-600 h-6' />
				</button>
			</section>
		</div>
	);
};

export default DetailItem;
