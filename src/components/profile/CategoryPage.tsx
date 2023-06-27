import React from "react";
// Types / Interface
import { ICategory } from "@/DUMMY_DATA/MODEL";
// import Component
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import AddForm from "../ui/AddForm";
import CategoryItem from "./CategoryItem";
import ConfirmationModal from "../ui/ConfirmationModal";
import SendingData from "../ui/SendingData";
import EditForm from "../ui/EditForm";

// import category custom hook
import useCategoryHook from "@/customHooks/use-categoryHook";
const CategoryPage = () => {
	const {
		categoryList,
		toggleAddingCategoryHandler,
		isAddingCategory,
		isSendingData,
		addNewCategoryHandler,
		selectNewCategory,
		closeAddNewCategoryHandler,
		toggleMoreActionHandler,
		idOfToggleToOpenMoreAction,
		deleteCategoryHandler,
		isDeletingCategory,
		categoryToDelete,
		cancelDeleteOnConfirmationModal,
		confirmDeleteCategoryHandler,
		isUpdatingCategory,
		categoryMessage,
		currentCategory,
		editCategoryHandler,
		isEditingCategory,
		categoryToEdit,
		cancelEditCategoryHandler,
		confirmEditCategoryHandler,
	} = useCategoryHook();

	return (
		<Card>
			<CardHeader
				title='Select a Category'
				from='category page'
				iconFunction={() => {}}
				showListOfCategories={false}
			/>

			<section className='bg-white w-full h-full px-2 text-center'>
				{!isEditingCategory && (
					<div className='my-2'>
						{!isAddingCategory && (
							<h1
								className='text-white bg-green-400 w-3/5 m-auto border border-green-800 rounded-2xl '
								onClick={toggleAddingCategoryHandler}
							>
								ADD New Category +
							</h1>
						)}
						{/* <SendingData /> */}
						{isSendingData && <SendingData />}
						{isAddingCategory && !isSendingData && (
							<AddForm
								onAddHandler={addNewCategoryHandler}
								placeHolder='Add new category'
							/>
						)}
					</div>
				)}
				{isEditingCategory && (
					<div className='my-2'>
						{isUpdatingCategory && <SendingData />}
						{!isUpdatingCategory && (
							<EditForm
								itemToEdit={categoryToEdit.categoryName}
								confirmEditing={confirmEditCategoryHandler}
								onCancelEditing={cancelEditCategoryHandler}
							/>
						)}
					</div>
				)}
				<ul className='border border-black overflow-y-scroll h-[85%]'>
					{!categoryList ||
						(categoryList.length === 0 && (
							<div className='text-center pt-4'>Category List is Empty!</div>
						))}
					{categoryList.length > 0 &&
						categoryList.map((category: ICategory, index) => (
							<CategoryItem
								key={category._id}
								category={category}
								selectNewCategory={selectNewCategory}
								index={index}
								closeAddNewCategoryHandler={closeAddNewCategoryHandler}
								onToggleMoreAction={toggleMoreActionHandler}
								idOfToggleToOpenMoreAction={idOfToggleToOpenMoreAction}
								onSetToDelete={deleteCategoryHandler}
								currentCategory={currentCategory}
								onSetToEdit={editCategoryHandler}
							/>
						))}
				</ul>
				{isDeletingCategory && (
					<ConfirmationModal
						message={`Are you sure you want to delete ${categoryToDelete.categoryName}`}
						onCloseModal={cancelDeleteOnConfirmationModal}
						onConfirm={confirmDeleteCategoryHandler}
						isDeletingData={isDeletingCategory}
						isUpdatingData={isUpdatingCategory}
						updateMessage={categoryMessage}
					/>
				)}
			</section>
		</Card>
	);
};

export default CategoryPage;
