import React, { useState } from "react";
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
	confirmDeleteMainTaskAction,
} from "@/reduxToolkit/personal/mainTask-action/mainTaskAction";

// component import
import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/CardHeader";
import AddForm from "@/components/ui/AddForm";
import EditForm from "@/components/ui/EditForm";
import ListContainer from "@/components/ui/ListContainer";

import MainList from "../task/main/MainList";
import SendingData from "../ui/SendingData";

import ConfirmationModal from "../ui/ConfirmationModal";

// types
import { ICategory, IMainTask } from "@/DUMMY_DATA/MODEL";

const MainPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showListOfCategories, setShowListOfCategories] =
		useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const {
		currentCategory,
		categoryList,
		mainTaskList,

		isSendingData,
		mainTaskToEdit,
		mainTaskToDelete,
	} = useAppSelector((state: RootState) => state.personalTodoReducer);

	const toggleShowCategoryList = () => {
		setShowListOfCategories((prevState) => !prevState);
	};

	const selectNewCategory = (category: ICategory) => {
		console.log(category);
		dispatch(setCurrentCategoryAction(category));
		toggleShowCategoryList();
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

	// checked
	const selectMainTaskToDeleteHandler = (selectedMainTask: IMainTask) => {
		dispatch(setMainTaskToDeleteAction(selectedMainTask));
		setShowModal(true);
	};
	// checked
	const cancelDeleteMainTaskHandler = () => {
		dispatch(setMainTaskToDeleteAction({} as IMainTask));
		setShowModal(false);
	};
	// !working
	const confirmDeleteMainTaskHandler = async () => {
		const data = await dispatch(confirmDeleteMainTaskAction());

		if (data && data.message === "success") {
			setShowModal(false);
		}
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
			{showModal && (
				<ConfirmationModal
					message={`Are you sure you want to delete ${mainTaskToDelete.mainTaskName}`}
					onCloseModal={cancelDeleteMainTaskHandler}
					onConfirm={confirmDeleteMainTaskHandler}
					isSendingData={isSendingData}
				/>
			)}
		</Card>
	);
};

export default MainPage;
