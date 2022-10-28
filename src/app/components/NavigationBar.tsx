import { useEffect, useState } from "react";
import {
	Navbar,
	Nav,
	Button,
	Form,
	Dropdown,
	Container,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../store/Store";

import SignForms from "./SignForms";
import {
	deleteloginUser,
	getUserData,
} from "../../store/features/oneUser/LoginUserSlice";
import { changeTheme } from "../../store/features/theme/ThemeSlice";
import {
	searchInputChange,
	SearchInBase,
	deleteSearching,
} from "../../store/features/searching/SearchBarSlice";
import { useTranslation } from "react-i18next";
import i18n from "../../translations/i18n";

export default function NavigationBar() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	const { t } = useTranslation();

	const localStorageLang = localStorage.getItem("language");

	const [language, setLanguage] = useState(
		localStorageLang ? localStorageLang : "en"
	);

	const searchInput = useSelector(
		(state: StoreState) => state.SearchBarReducer.searchInput
	);

	const searchOutput = useSelector(
		(state: StoreState) => state.SearchBarReducer.searchOutput
	);

	document.body.style.backgroundColor =
		theme === "dark" ? "rgb(12,20,29)" : "white";
	document.body.style.color = theme === "dark" ? "rgb(230,230,230)" : "black";

	const [isHidden, setIsHidden] = useState(true);
	const nav = useNavigate();

	const dispatch = useStoreDispatch();

	const [signFormState, setSignFormState] = useState({
		show: false,
		formType: "",
	});

	const user = useSelector(
		(state: StoreState) => state.LoginUserReducer.loginUser
	);

	const sessUser = sessionStorage.getItem("user");

	useEffect(() => {
		localStorage.setItem("language", language);
		i18n.changeLanguage(language);
	}, [language]);

	useEffect(() => {
		if (searchInput !== "") dispatch(SearchInBase(searchInput));
	}, [searchInput, dispatch]);

	useEffect(() => {
		if (sessUser === null) {
			setIsHidden(true);
		} else {
			setIsHidden(false);
			dispatch(getUserData(sessUser));
		}
	}, [sessUser, dispatch]);

	return (
		<>
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

				<div style={{ width: "7rem" }}>
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

					<Dropdown.Menu show={searchInput !== ""}>
						{searchOutput.map((o) => (
							<Dropdown.Item
								onClick={() => {
									dispatch(deleteSearching());
									o.tag
										? nav(`/items/${searchInput}`)
										: o.userName
										? nav(`/${o.userName}`)
										: nav(`/${o.owner}/${o.name}`);
								}}
								key={searchOutput.indexOf(o)}
							>
								<strong>
									{o.tag
										? (t("item") as string) + o.name
										: o.userName
										? (t("user") as string) + o.userName
										: (t("collection") as string) + o.name}
								</strong>
							</Dropdown.Item>
						))}
					</Dropdown.Menu>
				</div>
				<div>
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
				<Navbar.Collapse id="navbar-collapse-id">
					<Nav
						onSelect={(selectedKey) =>
							selectedKey &&
							nav(selectedKey, {
								state: { name: sessUser },
							})
						}
					>
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
