import React, { useEffect, useCallback } from "react";

import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
// imports from redux reducers
import { getRawDataAction } from "@/reduxToolkit/personal/personal-action/personalTodoAction";
const Category = () => {
	return <div>category Page</div>;
};

export default Category;
