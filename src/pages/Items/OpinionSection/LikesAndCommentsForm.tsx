import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../../store/Store";

import { Badge, Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";

import ItemSchemaIF from "../../../interfaces/ItemSchemaIF";
import { useTranslation } from "react-i18next";
import {
	AddCommentToDb,
	AddLikeToDb,
	UnLikeFromDb,
} from "../../../store/features/items/ItemsThunk";

interface CommentsIF {
	actualItem: ItemSchemaIF;
}

export default function LikesAndCommentsForm({ actualItem }: CommentsIF) {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);
	const { t } = useTranslation();

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
					size="sm"
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
										itemId: actualItem._id || "",
										loginUser,
									})
							  )
							: dispatch(
									UnLikeFromDb({
										itemId: actualItem._id || "",
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
			<td colSpan={fieldsLenght + 4}>
				<Form
					onSubmit={(e) => {
						e.preventDefault();
						dispatch(
							AddCommentToDb({
								itemId: actualItem._id || "",
								comment: {
									user: loginUser,
									comment,
								},
							})
						);
						setComment("");
					}}
				>
					<Form.Control
						size="sm"
						className="d-inline w-auto"
						type="text"
						name="comment"
						placeholder={t("itemPage.comments.input") as string}
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<Button
						size="sm"
						variant={theme}
						className="w-auto d-inline me-auto"
						type="submit"
					>
						{t("itemPage.comments.comment") as string}
					</Button>
				</Form>
			</td>
		</>
	);
}
