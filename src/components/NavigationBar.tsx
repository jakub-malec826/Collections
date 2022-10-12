import { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { StoreState, useStoreDispatch } from "../store/Store";

import {
    deleteUser,
    getUserData,
} from "../store/features/user/ActualUserSlice";
import { showForms } from "../store/features/Forms/FormsVisSlice";

export default function NavigationBar() {
    const [isHidden, setIsHidden] = useState(true);
    const nav = useNavigate();

    const storeDispatch = useStoreDispatch();
    const dispatch = useDispatch();

    const user = useSelector((state: StoreState) => state.oneUserReducer.user);

    useEffect(() => {
        if (sessionStorage.getItem("user") === null) {
            setIsHidden(true);
        } else setIsHidden(false);
        storeDispatch(getUserData());
    }, [sessionStorage.getItem("user"), setIsHidden]);

    return (
        <Navbar expand="sm" bg="light" variant="light">
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
                    hidden={user ? !user.isAdmin : false}
                >
                    Admin Panel
                </Nav.Link>
            </Nav>
            <Nav
                className="ms-auto me-3"
                onSelect={(selectedKey) => selectedKey && nav(selectedKey)}
            >
                <Nav.Item>
                    <Nav.Link
                        eventKey="/auth/signin"
                        onClick={() => dispatch(showForms())}
                        hidden={!isHidden}
                    >
                        Sign in
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey="/auth/signup"
                        onClick={() => dispatch(showForms())}
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
                            storeDispatch(deleteUser());
                        }}
                        hidden={isHidden}
                    >
                        Log out
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    );
}
