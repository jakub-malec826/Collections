import { useEffect, useState, Dispatch } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { UsersState } from "../store/Store";
import { setUserToNull } from "../store/features/user/OneUserSlice";

export default function NavigationBar() {
    const [isHidden, setIsHidden] = useState(true);
    const nav = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: UsersState) => state.oneUserReducer.user);

    useEffect(() => {
        if (sessionStorage.getItem("user") === null) {
            setIsHidden(true);
        } else setIsHidden(false);
    }, [sessionStorage.getItem("user"), setIsHidden]);

    return (
        <Navbar expand="md" bg="light" variant="light">
            <Navbar.Brand className="ms-3" onClick={() => nav("/")}>
                Collections
            </Navbar.Brand>
            <Nav
                onSelect={(selectedKey) =>
                    selectedKey &&
                    nav(selectedKey, {
                        state: { name: sessionStorage.getItem("user") },
                    })
                }
                hidden={isHidden}
            >
                <Nav.Link eventKey={`/${sessionStorage.getItem("user")}`}>
                    Your Site
                </Nav.Link>
                <Nav.Link
                    eventKey={`/${sessionStorage.getItem("user")}/admin`}
                    hidden={!user.isAdmin}
                >
                    Admin Panel
                </Nav.Link>
            </Nav>
            <Nav
                className="ms-auto me-3"
                onSelect={(selectedKey) => selectedKey && nav(selectedKey)}
            >
                <Nav.Link eventKey="/auth/signin" hidden={!isHidden}>
                    Sign in
                </Nav.Link>
                <Nav.Link eventKey="/auth/signup" hidden={!isHidden}>
                    Sign up
                </Nav.Link>
                <Nav.Link
                    eventKey="/"
                    onClick={() => {
                        sessionStorage.clear();
                        dispatch(setUserToNull());
                    }}
                    hidden={isHidden}
                >
                    Log out
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}
