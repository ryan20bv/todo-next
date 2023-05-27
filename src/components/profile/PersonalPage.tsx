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

import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import AddForm from "../ui/AddForm";
import EditForm from "../ui/EditForm";
import ListContainer from "../ui/ListContainer";
import Summary from "../ui/Summary";

import { ICategory } from "@/DUMMY_DATA/MODEL";

const PersonalPage = () => {
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
				<>
					<div className='h-96 bg-white  overflow-y-scroll mb-4 border border-black '>
						<ul className='p-3  h-full'>
							{mainTaskList.length === 0 && (
								<p className='text-center m-8'>Main Task is Empty!</p>
							)}
							{mainTaskList.length > 0 &&
								mainTaskList.map((mainTask) => (
									<li key={mainTask.mainTaskId}>{mainTask.mainTaskName}</li>
								))}
						</ul>
					</div>
					<Summary
						length={3}
						selectedTab='selectedTab'
						onSelectTab={() => console.log("here")}
						onDeleteAllDone={() => console.log("here")}
					/>
				</>
			</ListContainer>
		</Card>
	);
};

export default PersonalPage;
