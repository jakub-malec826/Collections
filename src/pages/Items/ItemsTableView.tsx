import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../store/Store";

import ButtonsInTableView from "../../app/components/ButtonsInTableView";
import CommentsView from "./OpinionSection/CommentsView";
import LikesAndCommentsForm from "./OpinionSection/LikesAndCommentsForm";

import ItemSchemaIF from "../../interfaces/ItemSchemaIF";
import { useParams, useNavigate } from "react-router-dom";

interface propsIF {
	itemElement: ItemSchemaIF;
	setItemFormState?: Function;
	hideComments: boolean;
	fieldsList?: { fieldName: string; fieldType: string }[];
}

export default function ItemsTableView({
	itemElement,
	setItemFormState,
	hideComments,
	fieldsList,
}: propsIF) {
	const loginUser = useSelector(
		(state: StoreState) => state.LoginUserReducer.loginUser.userName
	);

	const dispatch = useStoreDispatch();

	const nav = useNavigate();

	const { itemName, tagName } = useParams();

	const [showCommentForm, setShowCommentForm] = useState(true);

	let hideComment = true;

	useEffect(() => {
		setShowCommentForm(
			loginUser === undefined || loginUser === "" ? true : false
		);
	}, [loginUser, dispatch]);

	return (
		<>
			<tr
				className={
					itemName === itemElement.name
						? "border border-3 border-primary fw-semibold"
						: ""
				}
				onClick={() =>
					tagName === undefined &&
					hideComment &&
					nav(`/items/${itemElement.name}`)
				}
			>
				{hideComments && (
					<ButtonsInTableView
						tableType="item"
						setFormState={setItemFormState || (() => {})}
						itemElement={itemElement}
						callback={(value: boolean) => (hideComment = value)}
					/>
				)}
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
						{fieldsList
							? fieldsList.map((f) => (
									<td key={fieldsList.indexOf(f)}>
										{itemElement[f.fieldName] === undefined
											? ""
											: typeof itemElement[
													f.fieldName.toLowerCase()
											  ] !== "boolean"
											? itemElement[
													f.fieldName.toLowerCase()
											  ]
											: itemElement[
													f.fieldName.toLowerCase()
											  ] === true
											? "✅"
											: "❌"}
									</td>
							  ))
							: itemElement.additionalField.map((f) => (
									<td
										key={itemElement.additionalField.indexOf(
											f
										)}
									>
										{itemElement[f.fieldName] === undefined
											? ""
											: typeof itemElement[
													f.fieldName.toLowerCase()
											  ] !== "boolean"
											? itemElement[
													f.fieldName.toLowerCase()
											  ]
											: itemElement[
													f.fieldName.toLowerCase()
											  ] === true
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
			{itemElement?.comments?.map((com) => (
				<tr
					key={itemElement.comments?.indexOf(com)}
					hidden={hideComments}
				>
					<CommentsView
						fieldsLength={itemElement.additionalField.length}
						actualComment={com}
					/>
				</tr>
			))}
		</>
	);
}
