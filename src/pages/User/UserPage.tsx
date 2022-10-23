import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Form, Table } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { StoreState, useStoreDispatch } from "../../store/Store";

import CollectionForm from "../Collections/CollectionForm";
import {
	showCollectionForm,
	emptyColl,
} from "../../store/features/collections/CollectionFormSlice";
import { getUserOnViewData } from "../../store/features/oneUser/UserOnViewSlice";
import TableView from "../../components/TableView";

export default function UserPage() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	const userOnView = useSelector(
		(state: StoreState) => state.UserOnViewReducer.userOnView
	);

	const actualUser = useSelector(
		(state: StoreState) => state.LoginUserReducer.loginUser
	);

	const [sortMethod, setSortMethod] = useState("Name");
	const collectionField = ["Name", "Description", "Topic", "Image"];

	let sortedCollections = userOnView.collections
		? [...userOnView.collections].sort((a, b) =>
				a[sortMethod.toLowerCase()].toLowerCase() <
				b[sortMethod.toLowerCase()].toLowerCase()
					? -1
					: 1
		  )
		: [];

	const dispatch = useDispatch();
	const storeDispatch = useStoreDispatch();

	const { userName } = useParams();

	useEffect(() => {
		storeDispatch(getUserOnViewData(userName ? userName : ""));
	}, [userOnView, storeDispatch]);

	return (
		<div className="mx-auto text-center">
			<CollectionForm userName={userOnView.userName} />

			<h4 className="m-3">Hey "{userName}"</h4>

			<Button
				className="mb-3"
				hidden={
					userOnView.userName === actualUser.userName
						? false
						: !actualUser.isAdmin
				}
				variant="primary"
				onClick={() => dispatch(showCollectionForm([emptyColl, false]))}
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
					{sortedCollections ? (
						sortedCollections.map((c) => (
							<TableView
								key={sortedCollections.indexOf(c)}
								collectionToShow={c}
								userOnView={userOnView}
								type="collection"
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
