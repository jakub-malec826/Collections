import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../store/Store";
import { useEffect } from "react";
import { GetLastItems } from "../../store/features/items/ItemsSlice";
import { Table } from "react-bootstrap";
import LastItemsView from "./LastItemsView";

export default function HomePage() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);
	const lastItems = useSelector(
		(state: StoreState) => state.ItemsReducer.lastItems
	);

	const dispatch = useStoreDispatch();

	useEffect(() => {
		dispatch(GetLastItems());
	}, [dispatch]);

	return (
		<div className="mx-auto text-center m-3">
			<div>
				<h4>Last added items</h4>
				<Table
					variant={theme}
					responsive="sm"
					striped
					className="w-75 mx-auto m-3"
				>
					<thead>
						<tr>
							<th>Name</th>
							<th>Collection</th>
							<th>Author</th>
						</tr>
					</thead>
					<tbody>
						{lastItems.length !== 0 &&
							lastItems.map((lI) => (
								<LastItemsView
									key={lastItems.indexOf(lI)}
									itemElement={lI}
								/>
							))}
					</tbody>
				</Table>
			</div>
			<div>
				<h4>Top 5 biggest collections</h4>
				<Table
					variant={theme}
					responsive="sm"
					striped
					className="w-75 mx-auto m-3"
				>
					<thead>
						<tr>
							<th>Name</th>
							<th>Owner</th>
							<th>Description</th>
							<th>Topic</th>
							<th>Image</th>
						</tr>
					</thead>
					<tbody></tbody>
				</Table>
			</div>
			<div>tag cloud</div>
		</div>
	);
}
