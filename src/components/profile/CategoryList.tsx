import React, { useState } from "react";
// import type/interface from model
import { ICategory } from "@/DUMMY_DATA/MODEL";
// import from indexStore
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";

// import from personalTodoAction
import { setCurrentCategoryAction } from "@/reduxToolkit/personal/personal-action/personalTodoAction";

// import from categoryAction
import { addNewCategoryAction } from "@/reduxToolkit/personal/category/categoryAction";

// import component
import AddForm from "../ui/AddForm";

interface PropsType {
	categoryList: ICategory[];
	onToggle: () => void;
}

const CategoryList: React.FC<PropsType> = ({ categoryList, onToggle }) => {
	const dispatch = useAppDispatch();
	const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
	const selectNewCategory = (category: ICategory) => {
		console.log(category);
		dispatch(setCurrentCategoryAction(category));
		onToggle();
	};

	const toggleAddingCategoryHandler = () => {
		setIsAddingCategory((prevState) => !prevState);
	};

	const addNewCategoryHandler = (newCategoryName: string) => {
		dispatch(addNewCategoryAction(newCategoryName));
	};

	return (
		<section className='w-[97%] text-center bg-white  border-b-2 border-black absolute  top-20 p-2'>
			<div className='mb-4'>
				{!isAddingCategory && (
					<h1
						className='text-white bg-green-400 w-3/5 m-auto border border-green-800 rounded-2xl'
						onClick={toggleAddingCategoryHandler}
					>
						ADD New Category +
					</h1>
				)}
				{isAddingCategory && (
					<AddForm
						onAddHandler={addNewCategoryHandler}
						placeHolder='Add new category'
					/>
				)}
			</div>
			<ul>
				{categoryList.map((category: ICategory) => (
					<li
						key={category._id}
						onClick={() => selectNewCategory(category)}
						className='py-1 border-0 border-gray-400 border-b-2'
					>
						{category.categoryName}
					</li>
				))}
			</ul>
		</section>
	);
};

export default CategoryList;
