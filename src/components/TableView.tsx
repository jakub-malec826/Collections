import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MarkdownEditor from "@uiw/react-markdown-editor";
import { Button } from "react-bootstrap";

import ItemsDataIF from "../interfaces/ItemsDataIF";
import CollectionsDataIF from "../interfaces/CollectionsDataIF";
import UserDataIF from "../interfaces/UserDataIF";

import OperationsOnColl from "../connectWithServer/OperationsOnColl";

import { showCollectionForm } from "../store/features/collections/CollectionFormSlice";
import { StoreState } from "../store/Store";
import { showItemsForm } from "../store/features/forms/ItemFormSlice";
import OperationsOnItem from "../connectWithServer/OperationsOnItem";
import CommentsView from "./CommentsAndLikes/CommentsView";
import { useState, useEffect } from "react";
import CommentsForm from "./CommentsAndLikes/CommentsForm";

interface UserColViewIF {
	userOnView: UserDataIF;
	type: string;
	collectionToShow?: CollectionsDataIF;
	itemsToShow?: ItemsDataIF;
	collectionName?: string;
}

export default function TableView({
	userOnView,
	type,
	collectionToShow,
	itemsToShow,
	collectionName,
}: UserColViewIF) {
	const actualUser = useSelector(
		(state: StoreState) => state.LoginUserReducer.loginUser
	);
	const fields = useSelector(
		(state: StoreState) => state.CollectionFieldsReducer.fields
	);

	const [showComments, setShowComments] = useState(true);

	const nav = useNavigate();

	const dispatch = useDispatch();
	return (
		<>
			<tr>
				<td
					hidden={
						userOnView.userName === actualUser.userName
							? false
							: !actualUser.isAdmin
					}
				>
					<Button
						className="m-0"
						variant="light"
						onClick={() => {
							type === "collection" &&
								dispatch(
									showCollectionForm([collectionToShow, true])
								);
							type === "items" &&
								dispatch(showItemsForm([itemsToShow, true]));
						}}
					>
						✍🏼
					</Button>
					<Button
						className="m-0"
						variant="light"
						onClick={async () => {
							type === "collection" &&
								collectionToShow &&
								(await OperationsOnColl(
									userOnView.userName,
									collectionToShow,
									"delcoll"
								));
							type === "items" &&
								itemsToShow &&
								(await OperationsOnItem(
									userOnView.userName,
									collectionName ? collectionName : "",
									"deleteitem",
									itemsToShow
								));
						}}
					>
						❌
					</Button>
				</td>

				{type === "collection" && collectionToShow && (
					<>
						<td onClick={() => nav(`${collectionToShow.name}`)}>
							<strong className="text-primary">
								{collectionToShow.name}
							</strong>
						</td>
						<td data-color-mode="light">
							<MarkdownEditor.Markdown
								source={collectionToShow.description}
							/>
						</td>
						<td>{collectionToShow.topic}</td>
						<td>
							<img
								src={collectionToShow.image.url}
								alt="No image uploaded"
								width={150}
							/>
						</td>
					</>
				)}

				{type === "items" && itemsToShow && (
					<>
						<td onClick={() => setShowComments((show) => !show)}>
							<strong className="text-primary">
								{itemsToShow._id?.slice(-6)}
							</strong>
						</td>
						<td>{itemsToShow.name}</td>
						<td>
							{itemsToShow.tag.map(
								(t) =>
									t +
									(itemsToShow.tag.indexOf(t) <
									itemsToShow.tag.length - 1
										? ", "
										: "")
							)}
						</td>
						{fields.map((f) => (
							<td key={fields.indexOf(f)}>
								{typeof itemsToShow[
									f.fieldName.toLowerCase()
								] !== "boolean"
									? itemsToShow[f.fieldName.toLowerCase()]
									: itemsToShow[f.fieldName.toLowerCase()] ===
									  true
									? "✅"
									: "❌"}
							</td>
						))}
					</>
				)}
			</tr>
			<tr hidden={showComments}>
				<CommentsForm
					actualItem={
						itemsToShow ? itemsToShow : { tag: [], name: "" }
					}
				/>
			</tr>
			{itemsToShow?.comments?.map((com) => (
				<CommentsView
					key={itemsToShow.comments?.indexOf(com)}
					showComments={showComments}
					fieldsLength={fields.length}
					actualItem={com}
				/>
			))}
		</>
	);
}
