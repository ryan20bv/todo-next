import { useRouter } from "next/router";
import LoadingPage from "@/components/ui/LoadingPage";

import { Roboto } from "next/font/google";
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";

const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
});

const HomePage = () => {
	const router = useRouter();

	const { isAuthenticated } = useAppSelector(
		(state: RootState) => state.authReducer
	);

	if (!isAuthenticated) {
		router.push("/n");
	} else if (isAuthenticated) {
		router.push("/t");
	}

	return <LoadingPage status='Loading...' />;
};

export default HomePage;
