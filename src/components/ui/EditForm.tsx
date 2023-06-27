import React, { useRef } from "react";
import { CheckIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface propsTypes {
	itemToEdit: string;
	confirmEditing: (input: string) => void;
	onCancelEditing: () => void;
}

const EditForm: React.FC<propsTypes> = ({
	itemToEdit,
	confirmEditing,
	onCancelEditing,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const submitTodoEditHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const enteredInput = inputRef.current?.value;

		if (!enteredInput || enteredInput?.trim() === "") {
			console.log("no value");
			return;
		}
		confirmEditing(enteredInput);
		inputRef.current.value = "";
	};

	const cancelEditHandler = () => {
		onCancelEditing();
	};
	return (
		<section className=' w-full px-1 flex my-2 items-center'>
			<h3 className='text-green-600 mr-1'>Edit</h3>
			<form
				action=''
				onSubmit={submitTodoEditHandler}
				className=' w-full flex justify-between '
			>
				<input
					type='text'
					placeholder='edit todo'
					required
					defaultValue={itemToEdit}
					ref={inputRef}
					className='py-1 px-2 focus:outline-none w-[85%] border border-black '
					id={`edit_input`}
				/>

				<button>
					<CheckIcon
						className='text-green-600 h-8'
						data-testid={`edit_confirm_button`}
					/>
				</button>
			</form>
			<button onClick={cancelEditHandler}>
				<XCircleIcon
					className='text-red-600 h-7 mx-1'
					data-testid={`edit_cancel_button`}
				/>
			</button>
		</section>
	);
};

export default EditForm;
