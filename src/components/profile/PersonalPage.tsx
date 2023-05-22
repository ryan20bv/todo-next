import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession, useSession, signOut } from "next-auth/react";
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
import {
	authDataAction,
	clearAuthDataAction,
} from "@/reduxToolkit/auth/auth-action/authAction";

import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";

interface ICategoryList {
	categoryId: string;
	categoryName: string;
}
interface Iitem {
	_id: string;
	creator_id: string;
	categoryName: string;
	mainTaskList: [];
}
interface IMainTask {
	taskName: string;
	taskId: string;
}

const PersonalPage = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { isAuthenticated, isSendingData, authError, authData } = useAppSelector(
		(state: RootState) => state.authReducer
	);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { data: session, status } = useSession();
	const { userId, apiToken } = authData;
	const [categoryList, setCategoryList] = useState<ICategoryList[]>([]);
	const [category, setCategory] = useState<ICategoryList>({} as ICategoryList);
	const [showCategoryList, setShowCategoryList] = useState<boolean>(false);
	const [mainTaskList, setMainTaskList] = useState<any[]>([]);
	const [rawData, setRawData] = useState([]);
	// console.log(session);
	// console.log(status);
	useEffect(() => {
		const checkForSession = async () => {
			const session = await getSession();
			// console.log(session);
			if (!session) {
				dispatch(clearAuthDataAction());
				router.push("/");
				// window.location.href = "/";
			} else {
				const data: any = session.user?.name;
				const newData = {
					userId: data.userData?.id,
					userName: data.userData?.fName + data.userData?.lName,
					userEmail: data.userData?.email,
					apiToken: data.token,
					expires: session.expires,
				};
				dispatch(authDataAction(newData));
				setIsLoading(false);
			}
		};
		checkForSession();
	}, [dispatch, router]);

	useEffect(() => {
		const getAllCategoryByUser = async (userId: string) => {
			let userCategory: ICategoryList[] = [];

			try {
				const url = "http://localhost:5000/api/category/user/" + userId;
				const options = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + apiToken,
					},
				};
				const response = await fetch(url, options);
				// console.log(response);
				const data = await response.json();

				// console.log(data);
				if (!response.ok) {
					console.log(data);
					if (data.message === "Authentication failed!") {
						// signOut({ callbackUrl: "http://localhost:3000" });
					}
					// return;
				}

				data.userCategories.forEach((item: Iitem) => {
					const newItem = {
						categoryId: item._id,
						categoryName: item.categoryName,
					};
					userCategory.push(newItem);
				});
				setRawData(data.userCategories);
				setCategory({
					categoryName: data.userCategories[0].categoryName,
					categoryId: data.userCategories[0].categoryId,
				});
				// console.log(data.userCategories[0].mainTaskList);
				const mainTasks: any[] = [];
				data.userCategories[0].mainTaskList.forEach((item: any) =>
					// console.log(item)
					mainTasks.push(item.mainTask_id)
				);
				// console.log(mainTasks);
				setMainTaskList([...mainTasks]);
			} catch (err) {
				console.log("userCategory", err);
			}
			// console.log(userCategory);

			setCategoryList([...userCategory]);
		};

		getAllCategoryByUser(userId);
	}, [userId]);
	// console.log(categoryList);
	useEffect(() => {
		const foundCategory: any = rawData.find(
			(item: any) => item._id === category.categoryId
		);
		console.log(foundCategory);
		if (foundCategory) {
			setMainTaskList([...foundCategory.mainTaskList]);
		}
	}, [category, rawData]);

	if (isLoading) {
		return <p>Loading...</p>;
	}
	// console.log(mainTaskList);

	// mainTaskList.forEach((mainTask) => console.log(mainTask));

	const toggleShowCategoryList = () => {
		setShowCategoryList((prevState) => !prevState);
	};

	const selectNewCategory = (categoryId: string, name: string) => {
		console.log(categoryId);
		setCategory({
			categoryName: name,
			categoryId: categoryId,
		});
	};

	const title = <h1>{category.categoryName}</h1>;
	return (
		<Card>
			<CardHeader
				title={title}
				from='category'
				iconFunction={toggleShowCategoryList}
				showCategoryList={showCategoryList}
			/>
			{showCategoryList && (
				<section className='w-[93%] text-center bg-white  border-b-2 border-black absolute  top-20'>
					<ul>
						{categoryList.map((category) => (
							<li
								key={category.categoryId}
								onClick={() =>
									selectNewCategory(category.categoryId, category.categoryName)
								}
								className='py-1'
							>
								{category.categoryName}
							</li>
						))}
					</ul>
				</section>
			)}
			<section>
				{mainTaskList.length === 0 && <p>Task is Empty!</p>}
				{mainTaskList.length > 0 && (
					<ul>
						{mainTaskList.map((mainTask) => (
							<li key={mainTask._id}>{mainTask.taskName}</li>
						))}
					</ul>
				)}
			</section>
		</Card>
	);
};

export default PersonalPage;
