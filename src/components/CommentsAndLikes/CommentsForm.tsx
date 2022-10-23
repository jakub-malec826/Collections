import { Badge, Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import ItemsDataIF from "../../interfaces/ItemsDataIF";
import { useState } from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../store/Store";
import OperationsOnComments from "../../connectWithServer/OperationsOnComments";

interface CommentsIF {
	actualItem: ItemsDataIF;
}

export default function CommentsForm({ actualItem }: CommentsIF) {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	const fieldsLenght = useSelector(
		(state: StoreState) => state.CollectionFieldsReducer.fields.length
	);

	const user = useSelector((state: StoreState) => state.UserOnViewReducer);

	const loginUser = useSelector(
		(state: StoreState) => state.LoginUserReducer.loginUser
	);

	const [comment, setComment] = useState<string>("");

	return (
		<>
			<td>
				<Button
					className="w-auto"
					variant={
						actualItem.likes?.includes(loginUser.userName)
							? "primary"
							: "outline-primary"
					}
					onClick={() => {
						!actualItem.likes?.includes(loginUser.userName)
							? OperationsOnComments(
									user.userOnView.userName,
									user.collectionOnView?.name
										? user.collectionOnView.name
										: "",
									"addlike",
									loginUser.userName,
									user.collectionOnView?.items.findIndex(
										(i) => i._id === actualItem._id
									)
							  )
							: OperationsOnComments(
									user.userOnView.userName,
									user.collectionOnView?.name
										? user.collectionOnView.name
										: "",
									"unlike",
									loginUser.userName,
									user.collectionOnView?.items.findIndex(
										(i) => i._id === actualItem._id
									)
							  );
					}}
				>
					Like{" "}
					<OverlayTrigger
						placement="bottom"
						delay={{ show: 250, hide: 400 }}
						overlay={
							<Tooltip id="tooltip-id">
								<ul
									style={{
										listStyle: "none",
										marginLeft: "-2rem",
										marginBottom: "0",
									}}
								>
									{actualItem.likes?.map((likes) => (
										<li
											key={actualItem.likes?.indexOf(
												likes
											)}
											className="ms-0"
										>
											{likes}
										</li>
									))}
								</ul>
							</Tooltip>
						}
					>
						<Badge bg="info">{actualItem.likes?.length}</Badge>
					</OverlayTrigger>
				</Button>
			</td>
			<td colSpan={fieldsLenght + 4}>
				<Form.Control
					className="d-block"
					type="text"
					name="comment"
					placeholder="Type your comment..."
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
				<Button
					variant={theme}
					className="w-auto d-block me-auto"
					onClick={() => {
						OperationsOnComments(
							user.userOnView.userName,
							user.collectionOnView?.name
								? user.collectionOnView.name
								: "",
							"addcomment",
							undefined,
							user.collectionOnView?.items.findIndex(
								(i) => i._id === actualItem._id
							),
							{ user: loginUser.userName, comment }
						);
						setComment("");
					}}
				>
					Comment
				</Button>
			</td>
		</>
	);
}
