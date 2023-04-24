import React from "react";

import { ITask } from "@/DUMMY_DATA/MODEL";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

interface propsType {
	selectedTodo: {
		todoDetail: ITask;
		index: number;
	};
}

const TaskDetail: React.FC<propsType> = ({ selectedTodo }) => {
	const { todoDetail, index } = selectedTodo;
	console.log(todoDetail);
	return (
		<main className=' w-full  p-4'>
			<header>
				<span>{index + 1 + ". "}</span> {todoDetail.name}
			</header>
			<section className=' bg-white w-full h-96 border border-black p-4 overflow-y-scroll'>
				<h3>Details</h3>
				<ul className='py-2 px-4 list-disc'>
					{todoDetail.details.map((detail) => (
						<div key={detail._id}>
							<li className='pb-2'>
								<p>{detail.item}</p>
							</li>
							<button>
								<PencilSquareIcon className='text-blue-600 h-6' />
							</button>
							<button>
								<TrashIcon className='text-red-600 h-6' />
							</button>
						</div>
					))}
				</ul>
			</section>
			<form action=''>
				<input
					type='text'
					placeholder='add new detail'
				/>
				<button>Add</button>
			</form>
		</main>
	);
};

export default TaskDetail;
