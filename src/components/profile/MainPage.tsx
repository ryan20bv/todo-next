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
	deleteAllDoneMainTaskAction,
	cancelDeleteAllDoneMainTaskAction,
	confirmDeleteAllSubTaskIsDoneAction,
	cancelMainTaskToDeleteAction,
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
import DeleteAllDoneModal from "../ui/DeleteAllDoneModal";
import CategoryList from "./CategoryList";

// types
import { ICategory, IMainTask } from "@/DUMMY_DATA/MODEL";

const MainPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [showConfirmationModal, setShowConfirmationModal] =
		useState<boolean>(false);
	const [showListOfCategories, setShowListOfCategories] =
		useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [showDeleteAllDoneModal, setShowDeleteAllDoneModal] =
		useState<boolean>(false);
	const {
		currentCategory,
		categoryList,
		mainTaskList,
		isSendingData,
		mainTaskToEdit,
		mainTaskToDelete,
		isDeletingData,
		isUpdatingData,
		updateMessage,
	} = useAppSelector((state: RootState) => state.personalTodoReducer);

	const toggleShowCategoryList = () => {
		setShowListOfCategories((prevState) => !prevState);
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
		setShowConfirmationModal(true);
		dispatch(setMainTaskToDeleteAction(selectedMainTask));
	};
	// checked
	const cancelDeleteMainTaskHandler = () => {
		dispatch(cancelMainTaskToDeleteAction());
		setShowConfirmationModal(false);
	};
	// checked
	const confirmDeleteMainTaskHandler = async () => {
		const data = await dispatch(confirmDeleteMainTaskAction());

		if (data && data.message === "success") {
			setShowConfirmationModal(false);
		}
	};

	// checked
	const deleteAllDoneMainTaskHandler = async () => {
		setShowDeleteAllDoneModal(true);
		dispatch(deleteAllDoneMainTaskAction());
	};
	const cancelDeleteAllDoneMainTaskHandler = async () => {
		setShowDeleteAllDoneModal(false);
		dispatch(cancelDeleteAllDoneMainTaskAction());
	};

	const confirmDeleteAllMainTaskIsDoneHandler = async () => {
		const data = await dispatch(confirmDeleteAllSubTaskIsDoneAction());

		if (data && data.message === "done") {
			setShowDeleteAllDoneModal(false);
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
				<CategoryList
					categoryList={categoryList}
					onToggle={toggleShowCategoryList}
				/>
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
					onDeleteAllDone={deleteAllDoneMainTaskHandler}
				/>
			</ListContainer>
			{showConfirmationModal && (
				<ConfirmationModal
					message={`Are you sure you want to delete ${mainTaskToDelete.mainTaskName}`}
					onCloseModal={cancelDeleteMainTaskHandler}
					onConfirm={confirmDeleteMainTaskHandler}
					isDeletingData={isDeletingData}
					isUpdatingData={isUpdatingData}
					updateMessage={updateMessage}
				/>
			)}
			{showDeleteAllDoneModal && (
				<DeleteAllDoneModal
					message={`Are you sure you want to delete All Done Main Tasks?`}
					onCloseModal={cancelDeleteAllDoneMainTaskHandler}
					isDeletingData={isDeletingData}
					onConfirm={confirmDeleteAllMainTaskIsDoneHandler}
					// isToggleUpdating={isToggleUpdating}
					isUpdatingData={isUpdatingData}
					updateMessage={updateMessage}
				/>
			)}
		</Card>
	);
};

export default MainPage;
