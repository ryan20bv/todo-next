import React, { useState } from "react";
// import types
import { ICategory } from "@/DUMMY_DATA/MODEL";
// import hero Icon
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

interface PropsType {
	category: ICategory;
	selectNewCategory: (selectedCategory: ICategory) => void;
	index: number;
	closeAddNewCategoryHandler: () => void;
	onToggleMoreAction: (id: string) => void;
	idOfToggleToOpenMoreAction: string;
	onSetToDelete: (selectedCategory: ICategory) => void;
	onCancelDelete: () => void;
}

const CategoryItem: React.FC<PropsType> = ({
	category,
	selectNewCategory,
	index,
	closeAddNewCategoryHandler,
	onToggleMoreAction,
	idOfToggleToOpenMoreAction,
	onSetToDelete,
	onCancelDelete,
}) => {
	// const [isOtherOptionOpen, setIsOtherOptionOpen] = useState<boolean>(false);

	const openMoreOptionHandler = (id: string) => {
		onToggleMoreAction(id);
		// setIsOtherOptionOpen(true);
		closeAddNewCategoryHandler();
	};
	const closeMoreOptionHandler = () => {
		onToggleMoreAction("");
		onCancelDelete();
		// setIsOtherOptionOpen(false);
		closeAddNewCategoryHandler();
	};

	const setDeleteCategoryHandler = (selectedCategory: ICategory) => {
		onSetToDelete(selectedCategory);
	};

	let addedClass: string = index % 2 !== 0 ? "bg-gray-200" : "";
	let isOtherOptionOpen: boolean =
		idOfToggleToOpenMoreAction === category._id ? true : false;

	return (
		<li
			key={category._id}
			className={`px-3 py-1 flex items-center justify-end relative ${addedClass}`}
		>
			<div
				onClick={() => selectNewCategory(category)}
				className='mx-4 w-9/12 underline'
			>
				{category.categoryName}
			</div>
			<div className='  h-full  flex  '>
				{!isOtherOptionOpen && (
					<button
						className=' flex items-center justify-center px-1 py-2 '
						onClick={() => openMoreOptionHandler(category._id)}
					>
						<div className='border border-black w-[5px] h-[5px] bg-gray-300 rounded-full '></div>
						<div className='border border-black  w-[5px] h-[5px] bg-gray-300 rounded-full mx-[2px]'></div>
						<div className='border border-black w-[5px] h-[5px] bg-gray-300 rounded-full '></div>
					</button>
				)}
				{isOtherOptionOpen && (
					<div className='flex items-center justify-center'>
						<button>
							<PencilSquareIcon className='text-blue-600 h-5' />
						</button>
						<button onClick={() => setDeleteCategoryHandler(category)}>
							<TrashIcon className='text-red-600 h-5 mx-2' />
						</button>
						<button
							className='text-red-600'
							onClick={closeMoreOptionHandler}
						>
							X
						</button>
					</div>
				)}
			</div>
		</li>
	);
};

export default CategoryItem;
