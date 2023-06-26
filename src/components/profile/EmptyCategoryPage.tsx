import React, { useState } from "react";
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import CategoryList from "./CategoryList";

const EmptyCategoryPage = () => {
	const { categoryList } = useAppSelector(
		(state: RootState) => state.personalTodoReducer
	);
	const [showListOfCategories, setShowListOfCategories] =
		useState<boolean>(false);
	const toggleShowCategoryList = () => {
		setShowListOfCategories((prevState) => !prevState);
	};
	return (
		<Card>
			<CardHeader
				title={"Empty Category"}
				from='category'
				iconFunction={toggleShowCategoryList}
				showListOfCategories={showListOfCategories}
			/>

			<CategoryList
				categoryList={categoryList}
				onToggle={toggleShowCategoryList}
			/>
		</Card>
	);
};

export default EmptyCategoryPage;
