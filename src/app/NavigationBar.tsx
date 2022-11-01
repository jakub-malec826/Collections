import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../store/Store";
import {
	deleteloginUser,
	getUserData,
} from "../store/features/oneUser/LoginUserSlice";
import { changeTheme } from "../store/features/theme/ThemeSlice";
import {
	searchInputChange,
	SearchInBase,
	deleteSearching,
} from "../store/features/searching/SearchBarSlice";

import { useTranslation } from "react-i18next";
import i18n from "../translations/i18n";

import { Navbar, Nav, Button, Form, Dropdown } from "react-bootstrap";

import SignForms from "./SignForms";
import WarningModal from "../components/WarningModal";

export default function NavigationBar() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);
	const searchInput = useSelector(
		(state: StoreState) => state.SearchBarReducer.searchInput
	);
	const searchOutput = useSelector(
		(state: StoreState) => state.SearchBarReducer.searchOutput
	);
	const user = useSelector(
		(state: StoreState) => state.LoginUserReducer.loginUser
	);

	const localStorageLang = localStorage.getItem("language");
	const sessUser = sessionStorage.getItem("user");

	const [language, setLanguage] = useState(
		localStorageLang ? localStorageLang : "en"
	);
	const [isHidden, setIsHidden] = useState(true);
	const [signFormState, setSignFormState] = useState({
		show: false,
		formType: "",
	});
	const [showModal, setShowModal] = useState(false);

	const dispatch = useStoreDispatch();
	const nav = useNavigate();
	const { t } = useTranslation();

	document.body.style.backgroundColor =
		theme === "dark" ? "rgb(12,20,29)" : "white";
	document.body.style.color = theme === "dark" ? "rgb(230,230,230)" : "black";

	const handleCloseModal = () => {
		setShowModal(false);
		sessionStorage.clear();
		nav("/");
		dispatch(deleteloginUser());
	};

	useEffect(() => {
		localStorage.setItem("language", language);
		i18n.changeLanguage(language);
	}, [language]);

	useEffect(() => {
		const timer = setInterval(() => {
			sessUser !== null && dispatch(getUserData(sessUser));
		}, 200);
		return () => {
			clearInterval(timer);
		};
	});

	useEffect(() => {
		if (user.status === "blocked") {
			setShowModal(true);
		}
		if (sessUser !== null && user && user.userName === undefined) {
			handleCloseModal();
		}
	}, [user]);

	useEffect(() => {
		if (searchInput !== "") dispatch(SearchInBase(searchInput));
	}, [searchInput, dispatch]);

	useEffect(() => {
		if (sessUser === null) {
			setIsHidden(true);
		} else {
			setIsHidden(false);
		}
	}, [sessUser]);

	return (
		<>
			<WarningModal
				type="Status"
				showModal={showModal}
				handleHide={handleCloseModal}
			/>

			<SignForms
				signFormState={signFormState}
				setSignFormState={setSignFormState}
			/>

			<Navbar
				collapseOnSelect
				fixed="top"
				expand="md"
				bg={theme}
				variant={theme}
			>
				<Navbar.Brand onClick={() => nav("/")}>
					{t("navigationBar.home") as string}
				</Navbar.Brand>

				<div className="ms-auto">
					<Button
						variant={theme}
						onClick={() =>
							setLanguage((old) => (old === "en" ? "pl" : "en"))
						}
					>
						{language === "en" ? "EN" : "PL"}
					</Button>
					<Button
						className="w-auto mx-1"
						variant={theme}
						onClick={() =>
							dispatch(
								changeTheme(
									theme === "light" ? "dark" : "light"
								)
							)
						}
					>
						{theme === "light" ? "🌕" : "🌑"}
					</Button>

					<Navbar.Toggle aria-controls="navbar-collapse-id" />
				</div>

				<Navbar.Collapse
					id="navbar-collapse-id"
					className="text-center me-2 mt-2"
				>
					<Nav
						onSelect={(selectedKey) =>
							selectedKey &&
							nav(selectedKey, {
								state: { name: sessUser },
							})
						}
					>
						<div
							style={{
								width: "50vw",
								maxWidth: "12rem",
								position: "relative",
							}}
							className="mx-auto"
						>
							<Form.Control
								size="sm"
								type="text"
								name="search"
								value={searchInput}
								onChange={(e) => {
									dispatch(searchInputChange(e.target.value));
								}}
								placeholder={t("navigationBar.searchBar")}
								autoComplete="off"
							/>

							<Dropdown.Menu
								style={{
									position: "absolute",
									overflow: "auto",
									maxWidth: "12rem",
								}}
								show={searchInput !== ""}
							>
								{searchOutput.map((o) => (
									<Dropdown.Item
										eventKey={
											o.tag
												? `/items/${o.name}`
												: o.userName
												? `/${o.userName}`
												: `/${o.owner}/${o.name}`
										}
										onClick={() =>
											dispatch(deleteSearching())
										}
										key={searchOutput.indexOf(o)}
									>
										<strong>
											{o.tag
												? (t("item") as string) + o.name
												: o.userName
												? (t("user") as string) +
												  o.userName
												: (t("collection") as string) +
												  o.name}
										</strong>
									</Dropdown.Item>
								))}
							</Dropdown.Menu>
						</div>

						<Nav.Item>
							<Nav.Link
								eventKey={`/${sessUser}/admin`}
								hidden={user ? !user.isAdmin : false}
							>
								{t("navigationBar.adminPage") as string}
							</Nav.Link>
						</Nav.Item>
					</Nav>

					<Nav
						className="ms-auto"
						onSelect={(selectedKey) =>
							selectedKey &&
							nav(selectedKey, {
								state: { name: sessUser },
							})
						}
					>
						{sessUser && (
							<Nav.Item>
								<Nav.Link eventKey={`/${sessUser}`}>
									{i18n.language === "pl"
										? (t(
												"navigationBar.userPage"
										  ) as string) + sessUser
										: ((sessUser +
												t(
													"navigationBar.userPage"
												)) as string)}
								</Nav.Link>
							</Nav.Item>
						)}

						<Nav.Item>
							<Nav.Link
								eventKey="/"
								onClick={() =>
									setSignFormState({
										show: true,
										formType: "signin",
									})
								}
								hidden={!isHidden}
							>
								{t("signIn") as string}
							</Nav.Link>
						</Nav.Item>

						<Nav.Item>
							<Nav.Link
								eventKey="/"
								onClick={() =>
									setSignFormState({
										show: true,
										formType: "signup",
									})
								}
								hidden={!isHidden}
							>
								{t("signUp") as string}
							</Nav.Link>
						</Nav.Item>

						<Nav.Item>
							<Nav.Link
								eventKey="/"
								onClick={() => {
									sessionStorage.clear();
									dispatch(deleteloginUser());
									setIsHidden(true);
								}}
								hidden={isHidden}
							>
								{t("navigationBar.logOut") as string}
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}
