import React, { useEffect } from "react";
import { useRouter } from "next/router";
// import type/interface from model
import { ICategory } from "@/DUMMY_DATA/MODEL";
// import from indexStore

// import component
import AddForm from "../ui/AddForm";
import SendingData from "../ui/SendingData";
import CategoryItem from "./CategoryItem";
import ConfirmationModal from "../ui/ConfirmationModal";
import EditForm from "../ui/EditForm";

// import category custom hooks
import useCategoryHook from "@/customHooks/use-categoryHook";

interface PropsType {
	onToggle: () => void;
}

const CategoryList: React.FC<PropsType> = ({ onToggle }) => {
	const router = useRouter();

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

	useEffect(() => {
		if (categoryList.length === 0) {
			router.replace("/t/category");
		}
	}, [categoryList, router]);

	const selectCategoryHandler = (category: ICategory) => {
		selectNewCategory(category);
		onToggle();
	};

	return (
		<section className='w-[97%] text-center bg-white  border-b-2 border-black absolute  top-20 p-2 h-[60%]  '>
			{!isEditingCategory && (
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
					(categoryList.length === 0 && <div>Category List is Empty!</div>)}
				{categoryList.length > 0 &&
					categoryList.map((category: ICategory, index) => (
						<CategoryItem
							key={category._id}
							category={category}
							selectNewCategory={() => selectCategoryHandler(category)}
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
	);
};

export default CategoryList;
