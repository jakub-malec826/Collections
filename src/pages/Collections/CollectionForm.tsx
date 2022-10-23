declare var REACT_APP_UPLOAD_PRESET: string;
declare var REACT_APP_CLOUD_NAME: string;

import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { StoreState, useStoreDispatch } from "../../store/Store";
import { hideCollectionForm } from "../../store/features/collections/CollectionFormSlice";

import { Button, Form, Offcanvas, OffcanvasHeader, Row } from "react-bootstrap";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { FileUploader } from "react-drag-drop-files";

import CollectionsDataIF from "../../interfaces/CollectionsDataIF";
import HandleChange from "../../functions/HandleChange";
import OperationsOnColl from "../../connectWithServer/OperationsOnColl";
import { getTopicListFromDb } from "../../store/features/collections/CollectionsTopicSlice";

interface CollectionFormIF {
	userName: string;
}

export default function CollectionForm({ userName }: CollectionFormIF) {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	const topicList = useSelector(
		(state: StoreState) => state.CollectionsTopicReducer.topicsList
	);
	const formState = useSelector((state: StoreState) => state.FormsVisReducer);

	const dispatch = useDispatch();
	const storeDispatch = useStoreDispatch();

	const [coll, setColl] = useState<CollectionsDataIF>(formState.collection);

	useEffect(() => {
		storeDispatch(getTopicListFromDb());
	}, [topicList.length]);

	useEffect(() => {
		setColl({ ...formState.collection, owner: userName });
	}, [formState]);

	const sendImage = async (image: File) => {
		const imageData = new FormData();

		imageData.append("file", image);
		imageData.append("upload_preset", `${REACT_APP_UPLOAD_PRESET}`);

		await fetch(
			`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload/`,
			{
				method: "post",
				body: imageData,
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data.url);
				setColl({
					...coll,
					image: { ...image, url: data.url, id: data.public_id },
				});
			})
			.catch((err) => console.error(err));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		formState.forEdit
			? await OperationsOnColl(coll.owner, coll, "editcoll")
			: await OperationsOnColl(coll.owner, coll, "newcoll");
		dispatch(hideCollectionForm());
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
			show={formState.formVis}
			onHide={() => dispatch(hideCollectionForm())}
		>
			<OffcanvasHeader className="border-bottom border-secondary m-3">
				<h3 className="d-inline">
					{formState.forEdit
						? "Edit collection"
						: "Add new collection"}
				</h3>
				<Button
					className="d-inline mb-2"
					variant={theme}
					onClick={() => dispatch(hideCollectionForm())}
				>
					ｘ
				</Button>
			</OffcanvasHeader>
			<Form onSubmit={handleSubmit} className="text-center">
				<Form.Group
					className=" w-auto mx-auto m-3"
					data-color-mode={theme}
				>
					<Form.Label className="mx-auto w-auto m-2" htmlFor="desc">Description</Form.Label>
					<MarkdownEditor
						className="m-3"
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
							"olist",
							"ulist",
							"quote",
						]}
						toolbarsMode={["preview", "fullscreen"]}
					/>
				</Form.Group>
				<Form.Group className="m-1">
					<Form.Control
						className="mx-auto w-auto m-2"
						type="text"
						name="name"
						value={coll.name}
						placeholder="Name"
						onChange={(e) => {
							HandleChange(e, setColl, coll);
						}}
						required
					/>
				</Form.Group>
				<Form.Group className="m-1">
					<Form.Select
						className="mx-auto w-auto m-2"
						placeholder="Topic"
						name="topic"
						required
						value={coll.topic}
						onChange={(e) => HandleChange(e, setColl, coll)}
					>
						<option>Topic</option>
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
						label="Upload/drop image here"
						hoverTitle="Drop here"
						types={["JPG", "JPEG", "PNG", "GIF", "HEIF"]}
						handleChange={async (e: File) => {
							await sendImage(e);
						}}
					/>
				</Form.Group>

				<Button variant={theme} type="submit">
					Send
				</Button>
			</Form>
		</Offcanvas>
	);
}
