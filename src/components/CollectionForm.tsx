import { Button, Form, Offcanvas, OffcanvasHeader, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "../store/Store";
import { useState } from "react";
import CollectionsDataIF from "../interfaces/CollectionsDataIF";
import HandleChange from "../functions/HandleChange";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { hideForms } from "../store/features/offcanvas/FormsVisSlice";
import AddNewColl from "../connectWithServer/AddNewColl";

const topicList = ["books", "cars", "whiskey", "animals"];

interface CollectionFormIF {
    userName: string;
}

export default function CollectionForm({ userName }: CollectionFormIF) {
    const formVis = useSelector(
        (state: StoreState) => state.formsVisReducer.formVis
    );
    const dispatch = useDispatch();

    const [coll, setColl] = useState<CollectionsDataIF>({
        _id: "",
        name: "",
        description: `Hello *world*


            Type something and try`,
        topic: "",
        image: "",
        owner: "",
        items: [],
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log(coll.owner);
        e.preventDefault();
        await AddNewColl(coll.owner, coll);
    };

    return (
        <Offcanvas show={formVis} onHide={() => dispatch(hideForms())}>
            <OffcanvasHeader closeButton>Add new collection</OffcanvasHeader>
            <Form onSubmit={handleSubmit}>
                <Row className="m-1" data-color-mode="light">
                    <Form.Label htmlFor="desc">Description</Form.Label>
                    <MarkdownEditor
                        id="desc"
                        value={coll.description}
                        onChange={(v) =>
                            v && setColl({ ...coll, description: v })
                        }
                        toolbars={[
                            "codeBlock",
                            "link",
                            "header",
                            "bold",
                            "italic",
                            "underline",
                            "todo",
                            "olist",
                            "ulist",
                            "quote",
                        ]}
                        toolbarsMode={["preview", "fullscreen"]}
                    />
                </Row>
                <Row className="m-1">
                    <Form.Control
                        type="text"
                        name="name"
                        value={coll.name}
                        placeholder="Name"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            HandleChange(e, setColl, coll);
                        }}
                        required
                    />
                </Row>
                <Row className="m-1">
                    <>
                        <Form.Select
                            placeholder="Topic"
                            name="topic"
                            required
                            onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>
                            ) => HandleChange(e, setColl, coll)}
                        >
                            <option>Topic</option>
                            {topicList.map((t) => (
                                <option key={topicList.indexOf(t)} value={t}>
                                    {t}
                                </option>
                            ))}
                        </Form.Select>
                    </>
                </Row>
                <Row className="m-1">
                    <Form.Control
                        type="file"
                        name="image"
                        id="sendImage"
                        value={coll.image}
                        accept="image/*"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            HandleChange(e, setColl, coll)
                        }
                        hidden
                    />
                    <Button
                        variant="secondary"
                        onClick={() =>
                            document.getElementById("sendImage")?.click()
                        }
                    >
                        Choose image
                    </Button>
                </Row>

                <Button
                    variant="success"
                    type="submit"
                    onClick={() => setColl({ ...coll, owner: userName })}
                >
                    Send
                </Button>
            </Form>
        </Offcanvas>
    );
}
