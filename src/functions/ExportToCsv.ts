import ItemSchemaIF from "../interfaces/ItemSchemaIF";

export default async function ExportToCsv(
	collectionName: string,
	items: ItemSchemaIF[]
) {
	let i = -1;
	const csv =
		"data:text/csv;charset=utf-8," +
		[
			[
				"_id",
				"name",
				"tags",
				...items[0].additionalField.map((f) => f.fieldName),
			],
			...items.map((item) => {
				if (
					i < item.additionalField.length - 1 &&
					item.additionalField.length < items.length
				)
					i = i + 1;
				let tempTags: string = "";
				item.tag.map((tag) => (tempTags += tag + "."));
				if (item.additionalField.length !== 0)
					return [
						item._id,
						item.name,
						tempTags.slice(0, -1),
						item[item.additionalField[i].fieldName],
					];
				else return [item._id, item.name, tempTags.slice(0, -1)];
			}),
		]
			.map((e) => e.join(","))
			.join("\n");

	const encodedUri = encodeURI(csv);

	const link = document.createElement("a");

	link.setAttribute("href", encodedUri);
	link.setAttribute("download", `${collectionName}.csv`);

	document.body.appendChild(link);

	link.click();
}
