import React, { useState } from "react";

const useSanitizeInputHook = (itemToEdit: string) => {
	const [inputStringValue, setInputStringValue] = useState<string>(
		itemToEdit ? itemToEdit : ""
	);

	const stringChangeHandler = (enteredValue: string) => {
		const regex = /^[_=-]+|[^a-zA-Z0-9-_ ]+$/g;
		const trimmedValue = enteredValue.trimStart().replace(regex, "");
		const capitalizeFirstCharacter = (str: string): string => {
			if (str.length === 0) {
				return str; // Return empty string if input is empty
			}
			const firstChar = str.charAt(0).toUpperCase(); // Get the first character and capitalize it
			const restOfString = str.slice(1); // Get the remaining characters of the string

			return firstChar + restOfString; // Return the capitalized string
		};

		const capitalizedString = capitalizeFirstCharacter(trimmedValue);
		setInputStringValue(capitalizedString);
	};
	const submitStringHandler = () => {
		const removeUnderscoreAndHyphen = (str: string): string => {
			const regex = /^[_-]+|[_-]+$/g;
			const cleanedStr = str.replace(regex, "");
			return cleanedStr;
		};
		const cleanedString = removeUnderscoreAndHyphen(inputStringValue).trim();
		setInputStringValue(cleanedString);
		return cleanedString;
	};

	const submitDoneInputHandler = () => {
		setInputStringValue("");
	};
	return {
		inputStringValue: inputStringValue,
		stringChangeHandler: stringChangeHandler,
		submitStringHandler: submitStringHandler,
		submitDoneInputHandler: submitDoneInputHandler,
	};
};

export default useSanitizeInputHook;
