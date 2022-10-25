import { useEffect, useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../store/Store";

import SignForms from "./SignForms";
import {
	deleteloginUser,
	getUserData,
} from "../../store/features/oneUser/LoginUserSlice";
import { changeTheme } from "../../store/features/theme/ThemeSlice";

export default function NavigationBar() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

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
		if (sessUser === null) {
			setIsHidden(true);
		} else {
			setIsHidden(false);
			dispatch(getUserData(sessUser));
		}
	}, [sessUser, dispatch]);

	return (
		<Navbar expand="sm" bg={theme} variant={theme} className="ms-1">
			<Nav
				onSelect={(selectedKey) =>
					selectedKey &&
					nav(selectedKey, {
						state: { name: sessUser },
					})
				}
			>
				<Nav.Link eventKey={`/`}>
					<Navbar.Brand>Collections</Navbar.Brand>
				</Nav.Link>
				<Nav.Link eventKey={`/${sessUser}`} hidden={isHidden}>
					Your Site
				</Nav.Link>
				<Nav.Link
					eventKey={`/${sessUser}/admin`}
					hidden={user ? !user.isAdmin : false}
				>
					Admin Panel
				</Nav.Link>
			</Nav>

			<Nav
				className="ms-auto me-1"
				onSelect={(selectedKey) => selectedKey && nav(selectedKey)}
			>
				<Button
					className="me-3"
					variant={theme}
					onClick={() =>
						dispatch(
							changeTheme(theme === "light" ? "dark" : "light")
						)
					}
				>
					{theme === "light" ? "🌕" : "🌑"}
				</Button>
				{sessUser && (
					<Navbar.Text>
						Hi <strong>{user.userName}</strong>
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
			<SignForms
				signFormState={signFormState}
				setSignFormState={setSignFormState}
			/>
		</Navbar>
	);
}
