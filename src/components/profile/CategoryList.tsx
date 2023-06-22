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
import SendingData from "../ui/SendingData";
import CategoryItem from "./CategoryItem";

interface PropsType {
	categoryList: ICategory[];
	onToggle: () => void;
}

const CategoryList: React.FC<PropsType> = ({ categoryList, onToggle }) => {
	const dispatch = useAppDispatch();
	const { isSendingData } = useAppSelector(
		(state: RootState) => state.personalTodoReducer
	);
	const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
	const selectNewCategory = (category: ICategory) => {
		dispatch(setCurrentCategoryAction(category));
		onToggle();
	};

	const toggleAddingCategoryHandler = () => {
		setIsAddingCategory(true);
	};

	const addNewCategoryHandler = async (newCategoryName: string) => {
		const result = await dispatch(addNewCategoryAction(newCategoryName));
		if (result && result.status === "done") {
			setIsAddingCategory(false);
		}
	};

	const closeAddNewCategoryHandler = () => {
		setIsAddingCategory(false);
	};

	return (
		<section className='w-[97%] text-center bg-white  border-b-2 border-black absolute  top-20 p-2 h-[60%]  '>
			<div className='mb-4'>
				{!isAddingCategory && (
					<h1
						className='text-white bg-green-400 w-3/5 m-auto border border-green-800 rounded-2xl'
						onClick={toggleAddingCategoryHandler}
					>
						ADD New Category +
					</h1>
				)}
				{isSendingData && <SendingData />}

				{isAddingCategory && !isSendingData && (
					<AddForm
						onAddHandler={addNewCategoryHandler}
						placeHolder='Add new category'
					/>
				)}
			</div>
			<ul className='border border-black overflow-y-scroll h-[85%]'>
				{categoryList.map((category: ICategory, index) => (
					<CategoryItem
						key={category._id}
						category={category}
						selectNewCategory={selectNewCategory}
						index={index}
						closeAddNewCategoryHandler={closeAddNewCategoryHandler}
					/>
				))}
			</ul>
		</section>
	);
};

export default CategoryList;
