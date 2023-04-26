import React from "react";
import { useAppDispatch } from "@/reduxToolkit/indexStore/indexStore";
import {
	toggleDetailIsDoneAction,
	deleteDetailAction,
	selectDetailToEditAction,
} from "@/reduxToolkit/todo/todo-action/detailAction";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { ITodoDetails } from "@/DUMMY_DATA/MODEL";

interface propsTypes {
	detail: ITodoDetails;
}

const DetailItem: React.FC<propsTypes> = ({ detail }) => {
	const dispatch = useAppDispatch();
	const setDone: string = detail.isDone ? "line-through" : "";

	const isDoneDetailHandler = (detail_id: string) => {
		dispatch(toggleDetailIsDoneAction(detail_id));
	};
	const deleteDetailHandler = (detail_id: string) => {
		dispatch(deleteDetailAction(detail_id));
	};
	const setIsEditingHandler = (details: ITodoDetails) => {
		dispatch(selectDetailToEditAction(details));
	};
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
					checked={detail.isDone ? true : false}
					onChange={() => isDoneDetailHandler(detail._id)}
				/>
				<li className={`${setDone} px-2`}>
					<p>{detail.item}</p>
				</li>
			</section>

			<section>
				<button onClick={() => setIsEditingHandler(detail)}>
					<PencilSquareIcon className='text-blue-600 h-6' />
				</button>
				<button onClick={() => deleteDetailHandler(detail._id)}>
					<TrashIcon className='text-red-600 h-6' />
				</button>
			</section>
		</main>
	);
};

export default DetailItem;
