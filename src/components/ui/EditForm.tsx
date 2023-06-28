import React, { useRef, useState } from "react";
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
	const [inputValue, setInputValue] = useState<string>(itemToEdit);
	const [hasError, setHasError] = useState<boolean>(false);

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const regex = /[^a-zA-Z0-9-_ ]/g;
		const trimmedValue = e.currentTarget.value.trimStart().replace(regex, "");
		const capitalizeFirstCharacter = (str: string): string => {
			if (str.length === 0) {
				return str; // Return empty string if input is empty
			}
			const firstChar = str.charAt(0).toUpperCase(); // Get the first character and capitalize it
			const restOfString = str.slice(1); // Get the remaining characters of the string

			return firstChar + restOfString; // Return the capitalized string
		};

		const capitalizedString = capitalizeFirstCharacter(trimmedValue);

		setInputValue(capitalizedString);
	};

	const submitTodoEditHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const removeUnderscoreAndHyphen = (str: string): string => {
			const regex = /[_-](?!\w)/g;
			const cleanedStr = str.replace(regex, "");
			return cleanedStr;
		};
		const cleanedString = removeUnderscoreAndHyphen(inputValue);
		setInputValue(cleanedString);

		if (!cleanedString || cleanedString?.trim().length === 0) {
			setHasError(true);
			return;
		}

		confirmEditing(cleanedString.trim());
		setHasError(false);
		setInputValue("");
	};

	const cancelEditHandler = () => {
		setHasError(false);
		setInputValue("");
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
						value={inputValue}
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
