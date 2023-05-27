import React from "react";
import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/CardHeader";
import AddForm from "@/components/ui/AddForm";
import ListContainer from "@/components/ui/ListContainer";
import SubList from "./SubList";

const SubPage = () => {
	return (
		<Card>
			<CardHeader
				title='Sub Page'
				onIconHandler={() => {}}
				from='Sub Page'
			/>
			<AddForm
				onAddHandler={() => {}}
				placeHolder='add details'
			/>
			<ListContainer>
				<SubList />
			</ListContainer>
		</Card>
	);
};

export default SubPage;
