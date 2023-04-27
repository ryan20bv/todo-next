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
			className='flex px-1 w-full justify-between items-center '
		>
			<section className='flex w-4/5 whitespace-normal'>
				<input
					className='mr-6'
					type='checkbox'
					// name={`detail_input_button${detail.item}`}
					id={`detail_input_button_${detail.item}`}
					checked={detail.isDone ? true : false}
					onChange={() => isDoneDetailHandler(detail._id)}
					// data-testid={`detail_input_button${detail.item}`}
				/>
				<li className={`${setDone} pl-0 pr-1`}>
					<p data-testid={`detail_${detail.item}`}>{detail.item}</p>
				</li>
			</section>

			<section>
				{!detail.isDone && (
					<button onClick={() => setIsEditingHandler(detail)}>
						<PencilSquareIcon
							className='text-blue-600 h-6 hover:text-gray-400'
							data-testid={`detail_edit_button_${detail.item}`}
						/>
					</button>
				)}

				<button onClick={() => deleteDetailHandler(detail._id)}>
					<TrashIcon
						className='text-red-600 h-6 hover:text-gray-400'
						data-testid={`detail_delete_button_${detail.item}`}
					/>
				</button>
			</section>
		</main>
	);
};

export default DetailItem;
