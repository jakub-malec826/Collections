import { Form, Row, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useState } from "react";

interface FormsIF {
    formType: string;
}
interface stateIF {
    email: string;
    userName: string;
    password: string;
}

export default function Forms({ formType }: FormsIF) {
    const formik = useFormik({
        initialValues: {
            email: "",
            userName: "",
            password: "",
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Row className="text-center m-1">
                <h4>{formType === "signin" ? "Sign In" : "Sign Up"}</h4>
            </Row>
            {formType === "signup" && (
                <Row className="mx-auto w-50 m-1">
                    <Form.Floating>
                        <Form.Control
                            type="email"
                            placeholder="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        <Form.Label>Email</Form.Label>
                    </Form.Floating>
                </Row>
            )}
            <Row className="mx-auto w-50 m-1">
                <Form.Floating>
                    <Form.Control
                        type="text"
                        placeholder="userName"
                        name="userName"
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                    />
                    <Form.Label>User Name</Form.Label>
                </Form.Floating>
            </Row>
            <Row className="mx-auto w-50 m-1">
                <Form.Floating>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    <Form.Label>Password</Form.Label>
                </Form.Floating>
            </Row>
            <Row className="mx-auto w-25 m-1">
                <Button
                    type="submit"
                    variant="primary"
                    onClick={() =>
                        console.log(
                            formType === "signin" ? "Sign In" : "Sign up"
                        )
                    }
                >
                    {formType === "signin" ? "Sign In" : "Sign up"}
                </Button>
            </Row>
        </Form>
    );
}
