import { useState, useEffect } from "react";
import cloudinary from "cloudinary";

import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "../../store/Store";
import { hideCollectionForm } from "../../store/features/Forms/CollectionFormSlice";

import { Button, Form, Offcanvas, OffcanvasHeader, Row } from "react-bootstrap";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { FileUploader } from "react-drag-drop-files";

import CollectionsDataIF from "../../interfaces/CollectionsDataIF";
import HandleChange from "../../functions/HandleChange";
import OperationsOnColl from "../../connectWithServer/OperationsOnColl";

const topicList = ["books", "IT", "cars", "whiskey", "animals"];

interface CollectionFormIF {
	userName: string;
}

cloudinary.v2.config({
	cloud_name: "de0g0quc5",
});

export default function CollectionForm({ userName }: CollectionFormIF) {
	const formState = useSelector((state: StoreState) => state.FormsVisReducer);
	const dispatch = useDispatch();

	const [coll, setColl] = useState<CollectionsDataIF>(formState.collection);

	useEffect(() => {
        setColl({ ...formState.collection, owner: userName });

	}, [formState]);

	const sendImage = async (image: File) => {
		const imageData = new FormData();

		imageData.append("file", image);
		imageData.append("upload_preset", "projectCourse");

		await fetch("https://api.cloudinary.com/v1_1/de0g0quc5/image/upload", {
			method: "post",
			body: imageData,
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data.url);
				setColl({ ...coll, image: data.url });
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
			show={formState.formVis}
			onHide={() => dispatch(hideCollectionForm())}
		>
			<OffcanvasHeader closeButton>
				{formState.forEdit ? "Edit collection" : "Add new collection"}
			</OffcanvasHeader>
			<Form onSubmit={handleSubmit}>
				<Row className="m-1" data-color-mode="light">
					<Form.Label htmlFor="desc">Description</Form.Label>
					<MarkdownEditor
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
				</Row>
				<Row className="m-1">
					<Form.Control
						type="text"
						name="name"
						value={coll.name}
						placeholder="Name"
						onChange={(e) => {
							HandleChange(e, setColl, coll);
						}}
						required
					/>
				</Row>
				<Row className="m-1">
					<Form.Select
						placeholder="Topic"
						name="topic"
						required
						value={coll.topic}
						onChange={(e) => HandleChange(e, setColl, coll)}
					>
						<option>Topic</option>
						{topicList.map((t) => (
							<option key={topicList.indexOf(t)} value={t}>
								{t}
							</option>
						))}
					</Form.Select>
				</Row>
				<Row className="m-1">
					<FileUploader
						name="image"
						label="Upload/drop image here"
						hoverTitle="Drop here"
						types={["JPG", "JPEG", "PNG", "GIF", "HEIF"]}
						handleChange={async (e: File) => {
							await sendImage(e);
						}}
					/>
				</Row>

				<Button variant="light" type="submit">
					Send
				</Button>
			</Form>
		</Offcanvas>
	);
}
