import {
    Form,
    Row,
    Button,
    Alert,
    Offcanvas,
    OffcanvasHeader,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ValidateFormWithDb from "../connectWithServer/ValidateFormWithDb";

import { setUser } from "../store/features/user/ActualUserSlice";
import UserDataIF from "../interfaces/UserDataIF";
import HandleChange from "../functions/HandleChange";
import FormsVisSlice, {
    hideForms,
} from "../store/features/Forms/FormsVisSlice";
import { StoreState } from "../store/Store";
import { ButtonGroup } from "react-bootstrap";

interface FormsIF {
    formType: string;
}
export interface valuesIF {
    email: string;
    userName: string;
    password: string;
}

export default function Forms({ formType }: FormsIF) {
    const dispatch = useDispatch();
    const formsVis = useSelector(
        (state: StoreState) => state.formsVisReducer.formVis
    );

    const [err, setErr] = useState("");
    const stateObj: valuesIF = {
        email: "",
        userName: "",
        password: "",
    };
    const [state, setState] = useState<valuesIF>({ ...stateObj });
    const nav = useNavigate();

    const SetErrMessCallback = (data: {
        message: string;
        body: UserDataIF | null;
    }) => {
        if (data.message !== "OK") setErr(data.message);
        else {
            setErr("");
            sessionStorage.setItem("user", state.userName);
            nav(`/${state.userName}`, {
                state: { name: sessionStorage.getItem("user") },
            });
            dispatch(setUser(data.body));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await ValidateFormWithDb(state, formType, SetErrMessCallback);
        setState({ ...stateObj });
        dispatch(hideForms());
    };

    return (
        <Offcanvas
            show={formsVis}
            onHide={() => dispatch(hideForms())}
            placement="end"
        >
            <OffcanvasHeader closeButton>
                <h4>{formType === "signin" ? "Sign In" : "Sign Up"}</h4>
            </OffcanvasHeader>
            <Form onSubmit={handleSubmit}>
                {err !== "" && (
                    <Row className="mx-auto w-25 m-1 text-center">
                        <Alert variant="danger">{err}</Alert>
                    </Row>
                )}
                {formType === "signup" && (
                    <Form.Control
                        type="email"
                        name="email"
                        value={state.email}
                        placeholder="Email"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            HandleChange(e, setState, state)
                        }
                        required
                    />
                )}
                <Form.Control
                    type="text"
                    name="userName"
                    value={state.userName}
                    placeholder="UserName"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        HandleChange(e, setState, state)
                    }
                    required
                />
                <Form.Control
                    type="password"
                    name="password"
                    value={state.password}
                    placeholder="Password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        HandleChange(e, setState, state)
                    }
                    required
                />
                <div className="text-center">
                    <Button
                        type="submit"
                        variant="primary"
                        className="m-1 d-inline"
                    >
                        {formType === "signin" ? "Sign In" : "Sign up"}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() =>
                            nav(
                                `/auth/${
                                    formType === "signin" ? "signup" : "signin"
                                }`
                            )
                        }
                        className="m-1 d-inline"
                    >
                        {formType === "signin" ? "Sign Up" : "Sign In"}
                    </Button>
                </div>
            </Form>
        </Offcanvas>
    );
}
