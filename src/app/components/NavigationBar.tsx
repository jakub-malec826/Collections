import { useEffect, useState } from "react";
import { Navbar, Nav, Button, Form, Dropdown } from "react-bootstrap";
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

export default function NavigationBar() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	const searchInput = useSelector(
		(state: StoreState) => state.SearchBarReducer.searchInput
	);

	const searchOutput = useSelector(
		(state: StoreState) => state.SearchBarReducer.searchOutput
	);

	document.body.style.backgroundColor = theme === "dark" ? "black" : "white";
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
			<Navbar expand="sm" bg={theme} variant={theme}>
				<Navbar.Brand onClick={() => nav("/")}>Home</Navbar.Brand>

				<div style={{ width: "8rem" }}>
					<Form.Control
						size="sm"
						type="text"
						name="search"
						value={searchInput}
						onChange={(e) => {
							dispatch(searchInputChange(e.target.value));
						}}
						placeholder="Search..."
						autoComplete="off"
					/>

					<Dropdown.Menu show={searchInput !== ""}>
						{searchOutput.map((o) => (
							<Dropdown.Item
								onClick={() => {
									dispatch(deleteSearching());
									o.tag
										? nav(
												`/items/${searchInput}`
										  )
										: o.userName
										? nav(`/${o.userName}`)
										: nav(`/${o.owner}/${o.name}`);
								}}
								key={searchOutput.indexOf(o)}
							>
								<strong>
									{o.tag
										? "Item " + o.name
										: o.userName
										? "User " + o.userName
										: "Collection " + o.name}
								</strong>
							</Dropdown.Item>
						))}
					</Dropdown.Menu>
				</div>
				<div>
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
								Admin Panel
							</Nav.Link>
						</Nav.Item>
					</Nav>

					<Nav
						className="ms-auto me-1"
						onSelect={(selectedKey) =>
							selectedKey && nav(selectedKey)
						}
					>
						{sessUser && (
							<Navbar.Text>
								Hi{" "}
								<Link to={`/${sessUser}`}>{user.userName}</Link>
							</Navbar.Text>
						)}
						<Nav.Item>
							<Nav.Link
								onClick={() =>
									setSignFormState({
										show: true,
										formType: "signin",
									})
								}
								hidden={!isHidden}
							>
								Sign in
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link
								onClick={() =>
									setSignFormState({
										show: true,
										formType: "signup",
									})
								}
								hidden={!isHidden}
							>
								Sign up
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
								Log out
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}
