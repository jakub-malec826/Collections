import { Button, Table } from "react-bootstrap";

export default function Comments() {
	return (
		<Table striped bordered responsive>
			<tbody>
				<tr>
					<td>Likes: {}</td>
					<td>
						<Button variant="light">Like</Button>
					</td>
				</tr>
			</tbody>
		</Table>
	);
}
