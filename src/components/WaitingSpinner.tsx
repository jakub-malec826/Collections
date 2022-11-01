import { Container, Spinner } from "react-bootstrap";

interface propsIF {
	margin: string;
}

export default function WaitingSpinner({ margin }: propsIF) {
	return (
		<Container className="text-center" style={{ marginTop: margin }}>
			<Spinner animation="grow" variant="primary" role="status" />
		</Container>
	);
}
