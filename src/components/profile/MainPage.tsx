import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";

// import from personalTodoAction
import {
	setCurrentCategoryAction,
	setSelectedMainTaskAction,
} from "@/reduxToolkit/personal/personal-action/personalTodoAction";

// import from mainTaskAction
import {
	addMainTaskAction,
	selectedMainTaskToEditAction,
	cancelEditMainTaskNameAction,
	confirmEditMainTaskNameAction,
	setMainTaskToDeleteAction,
} from "@/reduxToolkit/personal/mainTask-action/mainTaskAction";

// component import
import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/CardHeader";
import AddForm from "@/components/ui/AddForm";
import EditForm from "@/components/ui/EditForm";
import ListContainer from "@/components/ui/ListContainer";
import Summary from "@/components/ui/Summary";
import MainList from "../task/main/MainList";
import SendingData from "../ui/SendingData";

// types
import { ICategory, IMainTask } from "@/DUMMY_DATA/MODEL";

const MainPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [showListOfCategories, setShowListOfCategories] =
		useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const {
		currentCategory,
		categoryList,
		mainTaskList,
		selectedMainTask,
		isSendingData,
		mainTaskToEdit,
	} = useAppSelector((state: RootState) => state.personalTodoReducer);
	const { authData } = useAppSelector((state: RootState) => state.authReducer);
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
	// checked
	const goToSubTaskPageHandler = (mainTask: IMainTask) => {
		dispatch(setSelectedMainTaskAction(mainTask));
		let formattedName = mainTask.mainTaskName;
		formattedName = formattedName.replace(/\s+/g, "-").toLowerCase();
		router.push(`${router.asPath}/${formattedName}`);
	};
	// checked
	const addNewMainTaskHandler = (enteredMainTaskName: string) => {
		dispatch(addMainTaskAction(enteredMainTaskName));
	};

	// checked
	const selectMainTaskToEditHandler = (selectedMainTask: IMainTask) => {
		setIsEditing(true);
		dispatch(selectedMainTaskToEditAction(selectedMainTask));
	};

	// checked
	const cancelEditingMainTaskNameHandler = () => {
		setIsEditing(false);
		dispatch(cancelEditMainTaskNameAction());
	};

	// checked
	const confirmEditMainTaskNameHandler = (newTaskName: string) => {
		dispatch(confirmEditMainTaskNameAction(newTaskName));
		setIsEditing(false);
	};
	// !working on

	const selectMainTaskToDeleteHandler = (selectedMainTask: IMainTask) => {
		// console.log(selectedMainTask);
		dispatch(setMainTaskToDeleteAction(selectedMainTask));
	};

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
			{/* <SendingData /> */}
			{isSendingData && <SendingData />}
			{!isSendingData && !isEditing && (
				<AddForm
					onAddHandler={addNewMainTaskHandler}
					placeHolder='add todo'
				/>
			)}
			{!isSendingData && isEditing && (
				<EditForm
					itemToEdit={mainTaskToEdit.mainTaskName}
					confirmEditing={confirmEditMainTaskNameHandler}
					onCancelEditing={cancelEditingMainTaskNameHandler}
				/>
			)}
			<ListContainer>
				<MainList
					mainTaskList={mainTaskList}
					onSeeSubTaskPage={goToSubTaskPageHandler}
					onEditing={selectMainTaskToEditHandler}
					onDeleteMainTask={selectMainTaskToDeleteHandler}
					onDeleteAllDone={() => {}}
				/>
			</ListContainer>
		</Card>
	);
};

export default MainPage;
