import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../store/Store";

import ButtonsInTableView from "../../app/components/ButtonsInTableView";
import CommentsView from "./OpinionSection/CommentsView";
import LikesAndCommentsForm from "./OpinionSection/LikesAndCommentsForm";

import ItemSchemaIF from "../../interfaces/ItemDataIF";
import { useParams } from "react-router-dom";

interface propsIF {
	itemElement: ItemSchemaIF;
	setItemFormState: Function;
}

export default function ItemsTableView({
	itemElement,
	setItemFormState,
}: propsIF) {
	const fields = useSelector(
		(state: StoreState) => state.CollectionFieldsReducer.fields
	);

	const loginUser = useSelector(
		(state: StoreState) => state.LoginUserReducer.loginUser.userName
	);

	const dispatch = useStoreDispatch();

	const [hideComments, setHideComments] = useState(true);

	const [showCommentForm, setShowCommentForm] = useState(true);

	const { itemName } = useParams();

	let showComment = true;

	useEffect(() => {
		setShowCommentForm(
			loginUser === undefined || loginUser === "" ? true : false
		);
	}, [loginUser, dispatch]);

	return (
		<>
			<tr
				onClick={() => showComment && setHideComments((show) => !show)}
				className={
					itemName === itemElement.name
						? "border border-3 border-primary fw-semibold"
						: ""
				}
			>
				<ButtonsInTableView
					tableType="item"
					setFormState={setItemFormState}
					itemElement={itemElement}
					callback={(value: boolean) => (showComment = value)}
				/>

				{itemElement && (
					<>
						<td>{itemElement._id?.slice(-6)}</td>
						<td>{itemElement.name}</td>
						<td>
							{itemElement.tag.map(
								(t) =>
									t +
									(itemElement.tag.indexOf(t) <
									itemElement.tag.length - 1
										? ", "
										: "")
							)}
						</td>
						{fields.map((f) => (
							<td key={fields.indexOf(f)}>
								{typeof itemElement[
									f.fieldName.toLowerCase()
								] !== "boolean"
									? itemElement[f.fieldName.toLowerCase()]
									: itemElement[f.fieldName.toLowerCase()] ===
									  true
									? "✅"
									: "❌"}
							</td>
						))}
					</>
				)}
			</tr>
			<tr hidden={showCommentForm ? true : hideComments}>
				<LikesAndCommentsForm actualItem={itemElement} />
			</tr>
			<tr hidden={hideComments}>
				{itemElement?.comments?.map((com) => (
					<CommentsView
						key={itemElement.comments?.indexOf(com)}
						fieldsLength={fields.length}
						actualComment={com}
					/>
				))}
			</tr>
		</>
	);
}
