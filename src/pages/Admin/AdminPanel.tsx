import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { StoreState } from "../../store/Store";

import { useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";

import UserManagement from "./UserManagement/UserManagement";
import CollectionsTopicManagement from "./TopicManagement/CollectionsTopicManagement";

export default function AdminPanel() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	const activeUser = useSelector(
		(state: StoreState) => state.LoginUserReducer.loginUser
	);
	const sess = sessionStorage.getItem("user");
	const nav = useNavigate();

	const [showItem, setShowItem] = useState(false);

	// useEffect(() => {
	// 	if (sess === null || !activeUser.isAdmin) {
	// 		alert("Nope");
	// 		nav("/");
	// 	}
	// }, [activeUser]);

	return (
		<div className="mx-auto text-center">
			<Button
				onClick={() => setShowItem((old) => !old)}
				variant={theme}
				className="mt-3"
			>
				{showItem ? "User Management" : "Collection's Topic Management"}
			</Button>
			<div hidden={showItem}>
				<UserManagement />
			</div>
			<div hidden={!showItem}>
				<CollectionsTopicManagement />
			</div>
		</div>
	);
}
