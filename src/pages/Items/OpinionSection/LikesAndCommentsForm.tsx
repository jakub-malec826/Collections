import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../../store/Store";

import { Badge, Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";

import ItemSchemaIF from "../../../interfaces/ItemDataIF";
import { AddCommentToDb } from "../../../store/features/items/ItemsSlice";
import {
	AddLikeToDb,
	UnLikeFromDb,
} from "../../../store/features/items/ItemsSlice";

interface CommentsIF {
	actualItem: ItemSchemaIF;
}

export default function LikesAndCommentsForm({ actualItem }: CommentsIF) {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	const fieldsLenght = useSelector(
		(state: StoreState) => state.CollectionFieldsReducer.fields.length
	);

	const loginUser = useSelector(
		(state: StoreState) => state.LoginUserReducer.loginUser.userName
	);

	const dispatch = useStoreDispatch();

	const [comment, setComment] = useState<string>("");

	return (
		<>
			<td>
				<Button
					className="w-auto"
					variant={
						actualItem.likes?.includes(loginUser)
							? "primary"
							: "outline-primary"
					}
					onClick={() => {
						!actualItem.likes?.includes(loginUser)
							? dispatch(
									AddLikeToDb({
										itemId: actualItem._id
											? actualItem._id
											: "",
										loginUser,
									})
							  )
							: dispatch(
									UnLikeFromDb({
										itemId: actualItem._id
											? actualItem._id
											: "",
										loginUser,
									})
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
			<td
				colSpan={fieldsLenght + 4}
			>
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
						dispatch(
							AddCommentToDb({
								itemId: actualItem._id ? actualItem._id : "",
								comment: {
									user: loginUser,
									comment,
								},
							})
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
