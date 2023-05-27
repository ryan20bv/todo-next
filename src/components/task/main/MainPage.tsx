import React, { useEffect, useState } from "react";

import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
import {
	authDataAction,
	clearAuthDataAction,
} from "@/reduxToolkit/auth/auth-action/authAction";
import { setCurrentCategoryAction } from "@/reduxToolkit/personal/personal-action/personalTodoAction";

import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/CardHeader";
import AddForm from "@/components/ui/AddForm";
import EditForm from "@/components/ui/EditForm";
import ListContainer from "@/components/ui/ListContainer";
import Summary from "@/components/ui/Summary";
import MainList from "./MainList";

import { ICategory } from "@/DUMMY_DATA/MODEL";

const MainPage = () => {
	const dispatch = useAppDispatch();
	const [showListOfCategories, setShowListOfCategories] =
		useState<boolean>(false);
	const { currentCategory, categoryList, mainTaskList } = useAppSelector(
		(state: RootState) => state.personalTodoReducer
	);
	// console.log(mainTaskList);

	// mainTaskList.forEach((mainTask) => console.log(mainTask));

	const toggleShowCategoryList = () => {
		setShowListOfCategories((prevState) => !prevState);
	};

	const selectNewCategory = (category: ICategory) => {
		console.log(category);
		dispatch(setCurrentCategoryAction(category));
		toggleShowCategoryList();
		// setCategoryTitle({
		// 	categoryName: name,
		// 	categoryId: categoryId,
		// });
	};

	// const title = <h1>{categoryTitle.categoryName}</h1>;
	return (
		<Card>
			<CardHeader
				title={currentCategory.categoryName}
				from='category'
				iconFunction={toggleShowCategoryList}
				showListOfCategories={showListOfCategories}
			/>
			{showListOfCategories && (
				<section className='w-[93%] text-center bg-white  border-b-2 border-black absolute  top-20'>
					<ul>
						{categoryList.map((category) => (
							<li
								key={category.categoryId}
								onClick={() => selectNewCategory(category)}
								className='py-1'
							>
								{category.categoryName}
							</li>
						))}
					</ul>
				</section>
			)}
			<AddForm
				onAddHandler={() => console.log("here")}
				placeHolder='add todo'
			/>
			<ListContainer>
				<MainList mainTaskList={mainTaskList} />
			</ListContainer>
		</Card>
	);
};

export default MainPage;
