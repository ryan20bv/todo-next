import React from "react";
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

interface PropsType {
	categoryList: ICategory[];
	onToggle: () => void;
}

const CategoryList: React.FC<PropsType> = ({ categoryList, onToggle }) => {
	const dispatch = useAppDispatch();

	const selectNewCategory = (category: ICategory) => {
		console.log(category);
		dispatch(setCurrentCategoryAction(category));
		onToggle();
	};
	return (
		<section className='w-[93%] text-center bg-white  border-b-2 border-black absolute  top-20'>
			<ul>
				{categoryList.map((category: ICategory) => (
					<li
						key={category._id}
						onClick={() => selectNewCategory(category)}
						className='py-1'
					>
						{category.categoryName}
					</li>
				))}
			</ul>
		</section>
	);
};

export default CategoryList;
