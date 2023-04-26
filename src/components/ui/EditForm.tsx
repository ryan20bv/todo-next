import React, { useRef } from "react";
import { useAppDispatch } from "@/reduxToolkit/indexStore/indexStore";
import {
	confirmEditAction,
	cancelEditTodoAction,
} from "@/reduxToolkit/todo/todo-action/todoAction";
import { ITask, ITodoDetails } from "@/DUMMY_DATA/MODEL";
import { CheckIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface propsTypes {
	todoToEdit?: ITask;
	onEditing: (input: string) => void;
	isEditing?: boolean;
	detailToEdit?: ITodoDetails;
	isDetailEditing?: boolean;
	onCancel: () => void;
}

const EditForm: React.FC<propsTypes> = ({
	todoToEdit,
	onEditing,
	isEditing,
	isDetailEditing,
	detailToEdit,
	onCancel,
}) => {
	const dispatch = useAppDispatch();
	const inputRef = useRef<HTMLInputElement>(null);

	const submitTodoEditHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const enteredInput = inputRef.current?.value;

		if (!enteredInput || enteredInput?.trim() === "") {
			console.log("no value");
			return;
		}
		onEditing(enteredInput);
		inputRef.current.value = "";
	};

	const cancelEditHandler = () => {
		onCancel();
	};
	return (
		<section className=' my-4  w-[90%] flex '>
			<form
				action=''
				onSubmit={submitTodoEditHandler}
				className=' w-full flex justify-between '
			>
				<input
					type='text'
					placeholder='edit todo'
					required
					defaultValue={
						isEditing ? todoToEdit?.name : isDetailEditing ? detailToEdit?.item : ""
					}
					ref={inputRef}
					className='py-2 px-2 focus:outline-none w-[85%] border border-black '
				/>

				<button>
					<CheckIcon className='text-green-600 h-8' />
				</button>
			</form>
			<button onClick={cancelEditHandler}>
				<XCircleIcon className='text-red-600 h-8 mx-2' />
			</button>
		</section>
	);
};

export default EditForm;
