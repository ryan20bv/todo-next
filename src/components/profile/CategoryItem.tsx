import React, { useState } from "react";
// import types
import { ICategory } from "@/DUMMY_DATA/MODEL";
// import hero Icon
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

interface PropsType {
	category: ICategory;
	selectNewCategory: (selectedCategory: ICategory) => void;
}

const CategoryItem: React.FC<PropsType> = ({ category, selectNewCategory }) => {
	const [isOtherOptionOpen, setIsOtherOptionOpen] = useState<boolean>(false);

	const openMoreOptionHandler = () => {
		console.log("more option handler", category.categoryName);
		setIsOtherOptionOpen(true);
	};
	const closeMoreOptionHandler = () => {
		setIsOtherOptionOpen(false);
	};

	let addedClass: string = "absolute right-2";
	return (
		<li
			key={category._id}
			className='py-1  border-gray-400 border-b-2 flex items-center justify-center relative'
		>
			<div onClick={() => selectNewCategory(category)}>
				{category.categoryName}
			</div>
			<div className='absolute right-2  h-full  flex items-center'>
				{!isOtherOptionOpen && (
					<button
						className=' flex items-center justify-center px-1 py-2 '
						onClick={openMoreOptionHandler}
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
						<button>
							<TrashIcon className='text-red-600 h-5 m-2' />
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
