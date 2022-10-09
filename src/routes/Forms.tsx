import { Form, Row, Button, Alert } from "react-bootstrap";
import { useState } from "react";

import ValidateFormWithDb from "../connectWithServer/ValidateFormWithDb";
import { useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow";

interface FormsIF {
    formType: string;
}
interface valuesIF {
    email: string;
    userName: string;
    password: string;
}

export default function Forms({ formType }: FormsIF) {
    const [err, setErr] = useState("");
    const stateObj: valuesIF = {
        email: "",
        userName: "",
        password: "",
    };
    const [state, setState] = useState<valuesIF>({ ...stateObj });
    const nav = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const SetErrMessCallback = (data: string) => {
        if (data !== "OK") setErr(data);
        else {
            setErr("");
            sessionStorage.setItem("user", state.userName);
            nav(`/${state.userName}`, {
                state: { name: sessionStorage.getItem("user") },
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await ValidateFormWithDb(state, formType, SetErrMessCallback);
        setState({ ...stateObj });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="text-center m-1">
                <h4>{formType === "signin" ? "Sign In" : "Sign Up"}</h4>
            </Row>

            {err !== "" && (
                <Row className="mx-auto w-25 m-1 text-center">
                    <Alert variant="danger">{err}</Alert>
                </Row>
            )}

            {formType === "signup" && (
                <FormRow
                    type="email"
                    name="email"
                    value={state.email}
                    placeholder="Email"
                    onChange={handleChange}
                />
            )}
            <FormRow
                type="text"
                name="userName"
                value={state.userName}
                placeholder="User Name"
                onChange={handleChange}
            />
            <FormRow
                type="password"
                name="password"
                value={state.password}
                placeholder="Password"
                onChange={handleChange}
            />

            <Row className="mx-auto w-50 m-1">
                <Button type="submit" variant="primary" className="w-auto m-1">
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
                    className="w-auto ms-auto m-1"
                >
                    {formType === "signin" ? "Sign Up" : "Sign In"}
                </Button>
            </Row>
        </Form>
    );
}
