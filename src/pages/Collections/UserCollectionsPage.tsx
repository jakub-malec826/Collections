import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../store/Store";
import { emptyColl, GetCollectionData } from "../../store/features/collections/CollectionsSlice";

import { useParams } from "react-router-dom";

import { Button, Form, Table } from "react-bootstrap";

import CollectionForm from "./CollectionForm";
import CollectionTableView from "./CollectionTableView";

import CollectionSchemaIF from "../../interfaces/CollectionSchemaIF";


export default function UserCollectionsPage() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	const collections = useSelector(
		(state: StoreState) => state.CollectionsReducer.collections
	);

	const actualUser = useSelector(
		(state: StoreState) => state.LoginUserReducer.loginUser
	);

	const [sortMethod, setSortMethod] = useState("Name");

	const collectionField = ["Name", "Description", "Topic", "Image"];

	let sortedCollections = [...collections].sort((a, b) =>
		a[sortMethod.toLowerCase()].toLowerCase() <
		b[sortMethod.toLowerCase()].toLowerCase()
			? -1
			: 1
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

	const dispatch = useStoreDispatch();

	const { userName } = useParams();

	useEffect(() => {
		dispatch(GetCollectionData(userName ? userName : ""));
	}, [dispatch, userName]);

	return (
		<div className="mx-auto text-center">
			<CollectionForm
				collectionFormState={collectionFormState}
				setCollectionsFormState={setCollectionFormState}
			/>

			<h4 className="m-3">Hey "{userName}"</h4>

			<Button
				className="mb-3"
				hidden={
					userName === actualUser.userName
						? false
						: !actualUser.isAdmin
				}
				variant="primary"
				onClick={() =>
					setCollectionFormState({
						show: true,
						forEdit: false,
						collection: emptyColl,
					})
				}
			>
				Create new collection
			</Button>

			<Table
				hover
				responsive="sm"
				variant={theme}
				className="mx-auto w-75 rounded"
			>
				<thead>
					<tr>
						<th>
							<p className="d-inline">Sort by: </p>
							<Form.Select
								className="d-inline w-auto"
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
											{cf}
										</option>
									))}
							</Form.Select>
						</th>
						{collectionField.map((cf) => (
							<th key={collectionField.indexOf(cf)}>{cf}</th>
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
							/>
						))
					) : (
						<tr>
							<td colSpan={5}>No collections found 😏</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	);
}
