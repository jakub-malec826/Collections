import { useEffect } from "react";

import { useSelector } from "react-redux";
import { GetTagItems } from "../../store/features/items/ItemsThunk";
import { deleteTagItems } from "../../store/features/items/ItemsSlice";
import { StoreState, useStoreDispatch } from "../../store/Store";

import { useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { Container, Spinner, Table } from "react-bootstrap";

import ItemsTableView from "./ItemsTableView";
import WaitingSpinner from "../../components/WaitingSpinner";

export default function ItemPage() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);
	const tagItems = useSelector(
		(state: StoreState) => state.ItemsReducer.tagItems
	);

	const { t } = useTranslation();
	const { tagName } = useParams();
	const dispatch = useStoreDispatch();

	let fieldList: { fieldName: string; fieldType: string }[] = [];

	tagItems.map((t) => {
		t.additionalField.map((tF) => {
			!fieldList.find((f) => f.fieldName === tF.fieldName) &&
				fieldList.push(tF);
		});
	});

	useEffect(() => {
		dispatch(deleteTagItems());
	}, [tagName]);

	useEffect(() => {
		const timer = setInterval(() => {
			dispatch(GetTagItems(tagName || ""));
		}, 500);
		return () => {
			clearInterval(timer);
		};
	});

	if (tagItems.length === 0) return <WaitingSpinner margin="50vh" />;

	return (
		<Table
			size="sm"
			striped
			variant={theme}
			responsive="sm"
			hover
			className="mx-auto w-75 m-3"
		>
			<thead>
				<tr>
					<th>Id</th>
					<th>{t("name") as string}</th>
					<th>{t("itemPage.tags") as string}</th>
					{fieldList.map((f) => (
						<th key={fieldList.indexOf(f)}>{f.fieldName}</th>
					))}
				</tr>
			</thead>

			<tbody>
				{tagItems.map((t) => (
					<ItemsTableView
						key={tagItems.indexOf(t)}
						itemElement={t}
						hideComments={false}
						fieldsList={fieldList}
					/>
				))}
			</tbody>
		</Table>
	);
}
