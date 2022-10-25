import CollectionSchemaIF from "../interfaces/CollectionSchemaIF";
declare var REACT_APP_UPLOAD_PRESET: string;
declare var REACT_APP_CLOUD_NAME: string;

export const sendImageToCloud = async (
	image: File,
	coll: CollectionSchemaIF
) => {
	const imageData = new FormData();

	imageData.append("file", image);
	imageData.append("upload_preset", `${REACT_APP_UPLOAD_PRESET}`);

	const data = await fetch(
		`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload/`,
		{
			method: "post",
			body: imageData,
		}
	)
		.then((res) => res.json())
		.then((data: { url: string; id: string }) => data)
		.catch((err) => console.error(err));

	if (data) return { ...coll, image: { url: data.url, id: data.id } };
};
