import React, { useState } from "react";
import { CheckIcon, XCircleIcon } from "@heroicons/react/24/outline";
import useSanitizeInputHook from "@/customHooks/use-sanitizeInput";

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
	const [hasError, setHasError] = useState<boolean>(false);
	const {
		inputStringValue,
		stringChangeHandler,
		submitStringHandler,
		submitDoneInputHandler,
	} = useSanitizeInputHook(itemToEdit);

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		stringChangeHandler(e.currentTarget.value);
	};

	const submitTodoEditHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const cleanedString = submitStringHandler();

		if (!cleanedString || cleanedString?.trim().length === 0) {
			setHasError(true);
			return;
		}

		confirmEditing(cleanedString.trim());
		setHasError(false);
		submitDoneInputHandler();
	};

	const cancelEditHandler = () => {
		setHasError(false);
		submitDoneInputHandler();
		onCancelEditing();
	};
	return (
		<section className=' w-full px-1  mt-2 '>
			<div className='flex items-center'>
				<h3 className='text-green-600 mr-1'>Edit</h3>
				<form
					action=''
					onSubmit={submitTodoEditHandler}
					className=' w-full flex justify-between '
				>
					<input
						type='text'
						placeholder='edit todo'
						className='py-1 px-2 focus:outline-none w-[85%] border border-black '
						id={`edit_input`}
						onChange={changeHandler}
						value={inputStringValue}
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
			</div>
			{hasError && (
				<p className='text-red-500 text-xs pl-4'>*Please enter a value</p>
			)}
		</section>
	);
};

export default EditForm;
