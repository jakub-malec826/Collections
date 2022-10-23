import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../store/Store";
import { getTopicListFromDb } from "../../store/features/collections/CollectionsTopicSlice";

import { Button, OverlayTrigger, Popover, Form, Table } from "react-bootstrap";

import AddTopicToList from "../../connectWithServer/topic/AddTopicToList";
import DeleteTopicFromList from "../../connectWithServer/topic/DeleteTopicFromList";

export default function CollectionsTopicManagement() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	const topicList = useSelector(
		(state: StoreState) => state.CollectionsTopicReducer.topicsList
	);
	const storeDispatch = useStoreDispatch();

	useEffect(() => {
		storeDispatch(getTopicListFromDb());
	}, [topicList]);

	const [topic, setTopic] = useState("");

	return (
		<div>
			<OverlayTrigger
				placement="bottom"
				trigger="click"
				overlay={
					<Popover id="popover-id">
						<Popover.Header
							as="h3"
							style={
								theme === "dark"
									? {
											backgroundColor: "rgb(32,35,38)",
											color: "rgb(240,240,240)",
									  }
									: {}
							}
						>
							Add new Topic
						</Popover.Header>
						<Popover.Body
							style={
								theme === "dark"
									? {
											backgroundColor: "rgb(21,25,29)",
											color: "rgb(245,245,245)",
									  }
									: {}
							}
						>
							<Form.Control
								type="text"
								value={topic}
								onChange={(e) => setTopic(e.target.value)}
								placeholder="Type topic"
							/>
							<Button
								variant={theme}
								onClick={() => {
									AddTopicToList(topic);
									setTopic("");
								}}
							>
								Add
							</Button>
						</Popover.Body>
					</Popover>
				}
			>
				<Button className="m-3" variant={theme}>
					Add new Topic
				</Button>
			</OverlayTrigger>
			<Table
				hover
				responsive="sm"
				variant={theme}
				className="w-25 mx-auto m-3"
			>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{topicList.map((t) => (
						<tr key={topicList.indexOf(t)}>
							<td>
								<Button
									variant={theme}
									onClick={() => DeleteTopicFromList(t.topic)}
								>
									❌
								</Button>
							</td>
							<td>{t.topic}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}
