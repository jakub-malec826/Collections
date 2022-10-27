import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../store/Store";
import { getTopicListFromDb } from "../../store/features/topic/CollectionsTopicSlice";
import {
	EditCollection,
	AddCollectionData,
} from "../../store/features/collections/CollectionsSlice";

import { useParams } from "react-router-dom";

import { Button, Form, Offcanvas, OffcanvasHeader } from "react-bootstrap";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { FileUploader } from "react-drag-drop-files";

import CollectionSchemaIF from "../../interfaces/CollectionSchemaIF";
import HandleChange from "../../functions/HandleChange";
import { sendImageToCloud } from "../../functions/SendImageToCloud";
import { useTranslation } from "react-i18next";

interface CollectionFormIF {
	collectionFormState: {
		collection: CollectionSchemaIF;
		forEdit: boolean;
		show: boolean;
	};
	setCollectionsFormState: Function;
}

export default function CollectionForm({
	collectionFormState,
	setCollectionsFormState,
}: CollectionFormIF) {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);
	const { t } = useTranslation();

	const topicList = useSelector(
		(state: StoreState) => state.CollectionsTopicReducer.topicsList
	);

	const { userName } = useParams();

	const dispatch = useStoreDispatch();

	const [coll, setColl] = useState<CollectionSchemaIF>({
		...collectionFormState.collection,
	});
	const [image, setImage] = useState<File>();

	useEffect(() => {
		dispatch(getTopicListFromDb());
	}, [dispatch]);

	useEffect(() => {
		setColl({
			...collectionFormState.collection,
			owner: userName ? userName : "",
		});
	}, [collectionFormState, setColl]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (image) {
			const collWithImage = await sendImageToCloud(image, coll);

			if (collWithImage !== undefined) {
				collectionFormState.forEdit
					? dispatch(EditCollection(collWithImage))
					: dispatch(AddCollectionData(collWithImage));
			}
		} else {
			collectionFormState.forEdit
				? dispatch(EditCollection(coll))
				: dispatch(AddCollectionData(coll));
		}

		setCollectionsFormState({ ...collectionFormState, show: false });
	};

	return (
		<Offcanvas
			style={
				theme === "dark"
					? {
							backgroundColor: "rgb(21,21,21)",
							color: "rgb(240,240,240)",
					  }
					: {}
			}
			show={collectionFormState.show}
			onHide={() =>
				setCollectionsFormState({ ...collectionFormState, show: false })
			}
		>
			<OffcanvasHeader className="border-bottom border-secondary m-3">
				<h3 className="d-inline">
					{collectionFormState.forEdit
						? (t("collectionPage.collectionForm.edit") as string)
						: (t("collectionPage.collectionForm.add") as string)}
				</h3>
				<Button
					size="sm"
					className="d-inline mb-2"
					variant={theme}
					onClick={() =>
						setCollectionsFormState({
							...collectionFormState,
							show: false,
						})
					}
				>
					ｘ
				</Button>
			</OffcanvasHeader>
			<Form onSubmit={handleSubmit} className="text-center">
				<Form.Group
					className=" w-auto mx-auto m-3"
					data-color-mode={theme}
				>
					<Form.Label className="mx-auto w-auto m-2" htmlFor="desc">
						{t("collectionPage.description") as string}
					</Form.Label>
					<MarkdownEditor
						className="m-3 mt-0"
						id="desc"
						value={coll.description}
						onChange={(v) =>
							v && setColl({ ...coll, description: v })
						}
						toolbars={[
							"codeBlock",
							"link",
							"header",
							"bold",
							"italic",
							"underline",
							"todo",
							"ulist",
							"olist",
							"quote",
						]}
						toolbarsMode={["preview", "fullscreen"]}
					/>
				</Form.Group>
				<Form.Group className="m-1">
					<Form.Control
						size="sm"
						className="mx-auto w-auto m-2"
						type="text"
						name="name"
						value={coll.name}
						placeholder={t("collectionPage.name") as string}
						onChange={(e) => {
							HandleChange(e, setColl, coll);
						}}
						required
					/>
				</Form.Group>
				<Form.Group className="m-1">
					<Form.Select
						size="sm"
						className="mx-auto w-auto m-2"
						name="topic"
						required
						value={coll.topic}
						onChange={(e) => HandleChange(e, setColl, coll)}
					>
						{topicList.map((t) => (
							<option key={topicList.indexOf(t)} value={t.topic}>
								{t.topic}
							</option>
						))}
					</Form.Select>
				</Form.Group>
				<Form.Group className="m-3">
					<FileUploader
						name="image"
						label={
							t(
								"collectionPage.collectionForm.uploadImage"
							) as string
						}
						hoverTitle="Drop here"
						types={["JPG", "JPEG", "PNG", "GIF", "HEIF"]}
						handleChange={(e: File) => {
							setImage(e);
						}}
					/>
				</Form.Group>

				<Button size="sm" variant={theme} type="submit">
					{collectionFormState.forEdit
						? (t("edit") as string)
						: (t("add") as string)}
				</Button>
			</Form>
		</Offcanvas>
	);
}
