import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { StoreState } from "../../store/Store";

import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { Button } from "react-bootstrap";

import UserManagement from "./UserManagement/UserManagement";
import CollectionsTopicManagement from "./TopicManagement/CollectionsTopicManagement";
import WarningModal from "../../components/WarningModal";

export default function AdminPanel() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);
	const activeUser = useSelector(
		(state: StoreState) => state.LoginUserReducer.loginUser
	);

	const sess = sessionStorage.getItem("user");

	const [showModal, setShowModal] = useState(false);
	const [showItem, setShowItem] = useState(false);

	const { t } = useTranslation();
	const nav = useNavigate();

	const handleHide = () => {
		setShowModal(false);
		nav("/");
	};

	useEffect(() => {
		if (sess === null || activeUser.isAdmin === false) setShowModal(true);
	});

	if (showModal)
		return (
			<WarningModal
				type="Admin"
				showModal={showModal}
				handleHide={handleHide}
			/>
		);
	else
		return (
			<div className="mx-auto text-center">
				<Button
					onClick={() => setShowItem((old) => !old)}
					variant={theme}
					className="mt-3"
				>
					{showItem
						? (t("adminPage.userManagementButton") as string)
						: (t("adminPage.topicButton") as string)}
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
