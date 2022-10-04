import { Form, Row, Col, Button } from "react-bootstrap";

interface FormsIF {
    formType: string;
}

export default function Forms({ formType }: FormsIF) {
    return (
        <Form>
            <Row className="text-center m-1">
                <h4>{formType === "signin" ? "Sign In" : "Sign Up"}</h4>
            </Row>
            {formType === "signup" && (
                <Row className="mx-auto w-50 m-1">
                    <Form.Floating>
                        <Form.Control type="email" placeholder="email" />
                        <Form.Label>Email</Form.Label>
                    </Form.Floating>
                </Row>
            )}
            <Row className="mx-auto w-50 m-1">
                <Form.Floating>
                    <Form.Control type="text" placeholder="userName" />
                    <Form.Label>User Name</Form.Label>
                </Form.Floating>
            </Row>
            <Row className="mx-auto w-50 m-1">
                <Form.Floating>
                    <Form.Control type="password" placeholder="Password" />
                    <Form.Label>Password</Form.Label>
                </Form.Floating>
            </Row>
        </Form>
    );
}
