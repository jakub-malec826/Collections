import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../store/Store";
import { DeleteCollectionFromDb } from "../../store/features/collections/CollectionsSlice";

import { useNavigate } from "react-router-dom";

import MarkdownEditor from "@uiw/react-markdown-editor";

import CollectionSchemaIF from "../../interfaces/CollectionSchemaIF";
import ButtonsInTableView from "../../app/components/ButtonsInTableView";
import { useState } from "react";

interface UserColViewIF {
	collectionElement: CollectionSchemaIF;
	setCollectionFormState: Function;
}

export default function CollectionTableView({
	collectionElement,
	setCollectionFormState,
}: UserColViewIF) {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	const nav = useNavigate();

	let showItem = true;

	return (
		<tr onClick={() => showItem && nav(`${collectionElement.name}`)}>
			<ButtonsInTableView
				tableType="collection"
				setFormState={setCollectionFormState}
				collectionElement={collectionElement}
				callback={(value: boolean) => (showItem = value)}
			/>

			<td>{collectionElement.name}</td>
			<td data-color-mode={theme}>
				<MarkdownEditor.Markdown
					source={collectionElement.description}
				/>
			</td>
			<td>{collectionElement.topic}</td>
			<td>
				<img
					src={collectionElement.image.url}
					alt="No image uploaded"
					width={150}
					height={100}
				/>
			</td>
		</tr>
	);
}
