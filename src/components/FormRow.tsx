import { Row, Form } from "react-bootstrap";

interface FormRowIF {
    type: string;
    name: string;
    value: string;
    placeholder: string;
    onChange: React.ChangeEventHandler;
}

export default function FormRow({
    type,
    name,
    value,
    placeholder,
    onChange,
}: FormRowIF) {
    return (
        <Row className="mx-auto w-50 m-1">
            <Form.Floating>
                <Form.Control
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required
                    autoComplete="off"
                />
                <Form.Label>{placeholder}</Form.Label>
            </Form.Floating>
        </Row>
    );
}
