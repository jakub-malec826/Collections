import { useEffect } from "react";

import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../store/Store";
import { GetLastItems } from "../../store/features/items/ItemsSlice";
import { GetBiggestCollectionsData } from "../../store/features/collections/CollectionsSlice";

import { Table } from "react-bootstrap";
import { TagCloud } from "react-tagcloud";

import LastItemsView from "./LastItemsView";

import BiggestCollectionsView from "./BiggestCollectionsView";
import { GetTagsList } from "../../store/features/tags/TagsSlice";
import { useNavigate } from "react-router-dom";

interface tag {
	value: string;
	count: number;
}

export default function HomePage() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);
	const lastItems = useSelector(
		(state: StoreState) => state.ItemsReducer.lastItems
	);

	const tagList = useSelector(
		(state: StoreState) => state.TagsReducer.tagsList
	);

	const biggestCollections = useSelector(
		(state: StoreState) => state.CollectionsReducer.biggestCollections
	);

	const nav = useNavigate();

	const dispatch = useStoreDispatch();

	useEffect(() => {
		dispatch(GetLastItems());
		dispatch(GetBiggestCollectionsData());
		dispatch(GetTagsList());
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
					<tbody>
						{biggestCollections.length !== 0 &&
							biggestCollections.map((bC) => (
								<BiggestCollectionsView
									key={biggestCollections.indexOf(bC)}
									collectionElement={bC}
								/>
							))}
					</tbody>
				</Table>
			</div>
			<div className="w-50 mx-auto">
				<TagCloud
					tags={tagList}
					maxSize={40}
					minSize={31}
					colorOptions={{
						luminosity: "dark",
						hue: "blue",
						format: "rgb",
					}}
					onClick={(tag: tag) => nav(`/items/${tag.value}`)}
				/>
			</div>
		</div>
	);
}
