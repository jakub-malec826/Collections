import { useSelector } from "react-redux";
import { StoreState } from "../../store/Store";

import { useNavigate } from "react-router-dom";

import MarkdownEditor from "@uiw/react-markdown-editor";

import CollectionSchemaIF from "../../interfaces/CollectionSchemaIF";
import ButtonsInTableView from "../../app/components/ButtonsInTableView";
import { useTranslation } from "react-i18next";

interface UserColViewIF {
	collectionElement: CollectionSchemaIF;
	setCollectionFormState?: Function;
	showButtons: boolean;
}

export default function CollectionTableView({
	collectionElement,
	setCollectionFormState,
	showButtons,
}: UserColViewIF) {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	const { t } = useTranslation();

	const nav = useNavigate();

	let showItem = true;

	return (
		<tr
			onClick={() => {
				console.log(collectionElement.owner);
				showItem &&
					nav(
						`/${collectionElement.owner}/${collectionElement.name}`
					);
			}}
		>
			{showButtons && (
				<ButtonsInTableView
					tableType="collection"
					setFormState={
						setCollectionFormState
							? setCollectionFormState
							: () => {}
					}
					collectionElement={collectionElement}
					callback={(value: boolean) => (showItem = value)}
				/>
			)}

			<td>{collectionElement.name}</td>
			{!showButtons && <td>{collectionElement.owner}</td>}
			<td data-color-mode={theme}>
				<MarkdownEditor.Markdown
					source={collectionElement.description}
				/>
			</td>
			<td>{collectionElement.topic}</td>
			<td>
				<img
					src={collectionElement.image.url}
					alt={t("collectionPage.noImage") as string}
					width={150}
					height={100}
				/>
			</td>
		</tr>
	);
}
