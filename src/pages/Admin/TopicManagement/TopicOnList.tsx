import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../../store/Store";
import { DeleteTopicFromDb } from "../../../store/features/topic/CollectionsTopicSlice";

import { Button } from "react-bootstrap";

export default function TopicOnList({
	t,
}: {
	t: { _id?: string; topic: string };
}) {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);
	const dispatch = useStoreDispatch();

	return (
		<tr>
			<td>
				<Button
					variant={theme}
					onClick={() => {
						dispatch(DeleteTopicFromDb(t._id ? t._id : ""));
					}}
				>
					❌
				</Button>
			</td>
			<td>{t.topic}</td>
		</tr>
	);
}
