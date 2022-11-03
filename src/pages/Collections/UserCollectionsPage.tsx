import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../store/Store";
import {
	deleteCollections,
	emptyColl,
} from "../../store/features/collections/CollectionsSlice";
import { GetCollectionData } from "../../store/features/collections/CollectionsThunks";

import { useParams } from "react-router-dom";

import i18n from "i18next";
import { useTranslation } from "react-i18next";

import { Button, Form, Table, Container } from "react-bootstrap";

import CollectionForm from "./CollectionForm";
import CollectionTableView from "./CollectionTableView";

import CollectionSchemaIF from "../../interfaces/CollectionSchemaIF";

const collectionField = ["Name", "Description", "Topic", "Image"];

export default function UserCollectionsPage() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);
	const collections = useSelector(
		(state: StoreState) => state.CollectionsReducer.collections
	);
	const user = useSelector(
		(state: StoreState) => state.LoginUserReducer.loginUser
	);

	const [collectionFormState, setCollectionFormState] = useState<{
		collection: CollectionSchemaIF;
		forEdit: boolean;
		show: boolean;
	}>({
		show: false,
		forEdit: false,
		collection: emptyColl,
	});
	const [filterText, setFilterText] = useState("");
	const [sortMethod, setSortMethod] = useState("Name");

	const dispatch = useStoreDispatch();
	const { t } = useTranslation();
	const { userName } = useParams();

	let sortedCollections = [...collections].sort((a, b) => {
		if (typeof a[sortMethod] !== "number")
			return a[sortMethod.toLowerCase()].toLowerCase() <
				b[sortMethod.toLowerCase()].toLowerCase()
				? -1
				: 1;
		else return a[sortMethod] - b[sortMethod];
	});

	useEffect(() => {
		dispatch(GetCollectionData({ userId: userName || "", filterText }));
		return () => {
			dispatch(deleteCollections());
		};
	}, [dispatch, userName, filterText]);

	return (
		<div className="mx-auto text-center">
			<CollectionForm
				collectionFormState={collectionFormState}
				setCollectionsFormState={setCollectionFormState}
			/>

			<h4 className="m-3">
				{i18n.language === "en"
					? userName + t("collectionPage.visit")
					: t("collectionPage.visit") + userName}
			</h4>
			<Container className="mb-3">
				<Button
					size="sm"
					className="d-inline w-auto mx-1"
					hidden={userName === user.userName ? false : !user.isAdmin}
					variant="primary"
					onClick={() =>
						setCollectionFormState({
							show: true,
							forEdit: false,
							collection: emptyColl,
						})
					}
				>
					{t("collectionPage.createNew") as string}
				</Button>
				<Form.Control
					size="sm"
					className="w-auto mx-1 d-inline"
					type="text"
					placeholder={t("filter") as string}
					value={filterText}
					onChange={(e) => setFilterText(e.target.value)}
				/>
			</Container>
			<Table
				size="sm"
				hover
				responsive
				variant={theme}
				className="mx-auto w-75 rounded"
			>
				<thead>
					<tr>
						<th>
							<Form.Select
								size="sm"
								className="w-auto"
								value={sortMethod}
								onChange={(e) => setSortMethod(e.target.value)}
							>
								{collectionField
									.slice(0, collectionField.length - 1)
									.map((cf) => (
										<option
											value={cf}
											key={collectionField.indexOf(cf)}
										>
											{
												t(
													`collectionPage.${cf.toLowerCase()}`
												) as string
											}
										</option>
									))}
							</Form.Select>
						</th>
						{collectionField.map((cf) => (
							<th key={collectionField.indexOf(cf)}>
								{
									t(
										`collectionPage.${cf.toLowerCase()}`
									) as string
								}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{sortedCollections.length !== 0 ? (
						sortedCollections.map((coll) => (
							<CollectionTableView
								key={collections.indexOf(coll)}
								collectionElement={coll}
								setCollectionFormState={setCollectionFormState}
								showButtons={true}
							/>
						))
					) : (
						<tr>
							<td colSpan={5}>
								{t("collectionPage.noCollections") as string}
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	);
}
