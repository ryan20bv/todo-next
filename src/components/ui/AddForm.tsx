import React, { useState } from "react";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import useSanitizeInputHook from "@/customHooks/use-sanitizeInput";

interface propsTypes {
	onAddHandler: (newTaskName: string) => void;
	placeHolder: string;
}

const AddForm: React.FC<propsTypes> = ({ onAddHandler, placeHolder }) => {
	const [hasError, setHasError] = useState<boolean>(false);

	const {
		inputStringValue,
		stringChangeHandler,
		submitStringHandler,
		submitDoneInputHandler,
	} = useSanitizeInputHook("");

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		stringChangeHandler(e.currentTarget.value);
	};

	const submitTodoHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const cleanedString = submitStringHandler();

		if (!cleanedString || cleanedString?.trim().length === 0) {
			setHasError(true);
			return;
		}

		onAddHandler(cleanedString);
		setHasError(false);

		submitDoneInputHandler();
	};

	const cancelAddHandler = () => {
		setHasError(false);

		submitDoneInputHandler();
	};

	return (
		<section className=' w-full px-3  mt-2 '>
			<div className='flex'>
				<form
					action=''
					onSubmit={submitTodoHandler}
					className=' w-full flex justify-between '
				>
					<input
						type='text'
						placeholder={placeHolder}
						className='py-1 px-2 focus:outline-none w-[85%] border border-black '
						id={`add_input`}
						onChange={changeHandler}
						value={inputStringValue}
						// data-testid={`filter_active`}
					/>

					<button>
						<PlusCircleIcon
							className='text-green-600 h-8 '
							data-testid={`add_confirm_button`}
						/>
					</button>
				</form>
				<button onClick={cancelAddHandler}>
					<XCircleIcon
						className='text-red-600 h-8 mx-1'
						data-testid={`add_cancel_button`}
					/>
				</button>
			</div>
			{hasError && (
				<p className='text-red-500 text-xs pl-4'>*Please enter a value</p>
			)}
		</section>
	);
};

export default AddForm;
