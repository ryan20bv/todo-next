import React from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { ITodoDetails } from "@/DUMMY_DATA/MODEL";

interface propsTypes {
	detail: ITodoDetails;
}

const DetailItem: React.FC<propsTypes> = ({ detail }) => {
	return (
		<main
			key={detail._id}
			className='flex px-2 w-full justify-between items-center '
		>
			<section className='flex'>
				<input
					className='mr-6'
					type='checkbox'
					name=''
					id=''
					// checked={task.isDone ? true : false}
					// onChange={() => setIsDoneHandler(task._id)}
				/>
				<li className=''>
					<p>{detail.item}</p>
				</li>
			</section>

			<section>
				<button>
					<PencilSquareIcon className='text-blue-600 h-6' />
				</button>
				<button>
					<TrashIcon className='text-red-600 h-6' />
				</button>
			</section>
		</main>
	);
};

export default DetailItem;
