import { useEffect } from "react";

import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../store/Store";
import { GetLastItems } from "../../store/features/items/ItemsThunk";

import { Spinner, Table, Container } from "react-bootstrap";
import { TagCloud } from "react-tagcloud";

import LastItemsView from "./LastItemsView";

import { GetTagsList } from "../../store/features/tags/TagsSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CollectionTableView from "../Collections/CollectionTableView";
import { GetBiggestCollectionsData } from "../../store/features/collections/CollectionsThunks";

interface tag {
	value: string;
	count: number;
}

export default function HomePage() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);
	const lastItems = useSelector(
		(state: StoreState) => state.ItemsReducer.lastItems
	);
	const status = useSelector(
		(state: StoreState) => state.ItemsReducer.status
	);

	const { t } = useTranslation();

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

	if (status === "loading")
		return (
			<Container className="text-center" style={{ marginTop: "50vh" }}>
				<Spinner animation="grow" variant="primary" />
			</Container>
		);
	else
		return (
			<div className="mx-auto text-center mx-3">
				<div>
					<h4>{t("homePage.last5") as string}</h4>
					<Table variant={theme} striped className="w-75 mx-auto m-3">
						<thead>
							<tr>
								<th>{t("name") as string}</th>
								<th>{t("collection") as string}</th>
								<th>{t("itemPage.author") as string}</th>
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
					<h4>{t("homePage.top5") as string}</h4>
					<Table variant={theme} striped className="w-75 mx-auto m-3">
						<thead>
							<tr>
								<th>{t("name") as string}</th>
								<th>{t("collectionPage.owner") as string}</th>
								<th>
									{t("collectionPage.description") as string}
								</th>
								<th>{t("collectionPage.topic") as string}</th>
								<th>{t("collectionPage.image") as string}</th>
							</tr>
						</thead>
						<tbody>
							{biggestCollections.length !== 0 &&
								biggestCollections.map((bC) => (
									<CollectionTableView
										key={biggestCollections.indexOf(bC)}
										collectionElement={bC}
										showButtons={false}
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
