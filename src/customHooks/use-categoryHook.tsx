import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
//  types / interfaces
import { ICategory } from "@/DUMMY_DATA/MODEL";
// import from category Action
import {
	addNewCategoryAction,
	setDeleteCategoryAction,
	cancelDeleteCategoryAction,
	confirmDeleteCategoryAction,
} from "@/reduxToolkit/personal/category/categoryAction";
// import from personalTodoAction
import { setCurrentCategoryAction } from "@/reduxToolkit/personal/personal-action/personalTodoAction";

const useCategoryHook = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { categoryList } = useAppSelector(
		(state: RootState) => state.personalTodoReducer
	);
	const {
		isCategorySendingData,
		isDeletingCategory,
		categoryToDelete,
		isUpdatingCategory,
		categoryMessage,
	} = useAppSelector((state: RootState) => state.categoryTodoReducer);
	const { currentCategory } = useAppSelector(
		(state: RootState) => state.personalTodoReducer
	);
	const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
	const [idOfToggleToOpenMoreAction, setIdOfToggleToOpenMoreAction] =
		useState<string>("");
	const toggleAddingCategoryHandler = () => {
		setIsAddingCategory(true);
	};
	const addNewCategoryHandler = async (newCategoryName: string) => {
		const result = await dispatch(addNewCategoryAction(newCategoryName));
		if (result && result.status === "done") {
			setIsAddingCategory(false);
		}
	};
	const selectNewCategory = (category: ICategory) => {
		dispatch(setCurrentCategoryAction(category));

		if (Object.keys(category).length !== 0) {
			let str = category.categoryName;
			str = str.replace(/\s+/g, "-").toLowerCase();
			router.push(`/t/${str}`);
		}
	};
	const closeAddNewCategoryHandler = () => {
		setIsAddingCategory(false);
	};
	const toggleMoreActionHandler = (id: string) => {
		setIdOfToggleToOpenMoreAction(id);
	};
	const deleteCategoryHandler = (selectedCategory: ICategory) => {
		dispatch(setDeleteCategoryAction(selectedCategory));
	};
	const cancelDeleteOnConfirmationModal = () => {
		dispatch(cancelDeleteCategoryAction());
	};
	const confirmDeleteCategoryHandler = async () => {
		const result = await dispatch(confirmDeleteCategoryAction());
		if (result === "done") {
			dispatch(cancelDeleteCategoryAction());
			toggleMoreActionHandler("");
		}
	};
	return {
		categoryList: categoryList,
		toggleAddingCategoryHandler: toggleAddingCategoryHandler,
		isAddingCategory: isAddingCategory,
		isSendingData: isCategorySendingData,
		addNewCategoryHandler: addNewCategoryHandler,
		selectNewCategory: selectNewCategory,
		closeAddNewCategoryHandler: closeAddNewCategoryHandler,
		toggleMoreActionHandler: toggleMoreActionHandler,
		idOfToggleToOpenMoreAction: idOfToggleToOpenMoreAction,
		deleteCategoryHandler: deleteCategoryHandler,
		isDeletingCategory: isDeletingCategory,
		categoryToDelete: categoryToDelete,
		cancelDeleteOnConfirmationModal: cancelDeleteOnConfirmationModal,
		confirmDeleteCategoryHandler: confirmDeleteCategoryHandler,
		isUpdatingCategory: isUpdatingCategory,
		categoryMessage: categoryMessage,
		currentCategory: currentCategory,
	};
};
export default useCategoryHook;
