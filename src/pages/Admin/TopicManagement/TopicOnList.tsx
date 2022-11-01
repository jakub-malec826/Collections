import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../../store/Store";
import { DeleteTopicFromDb } from "../../../store/features/topic/CollectionsTopicSlice";

import { Button } from "react-bootstrap";

interface propsIF {
	t: { _id?: string; topic: string };
}

export default function TopicOnList({ t }: propsIF) {
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
