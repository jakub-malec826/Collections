import { Button, Form, Offcanvas, OffcanvasHeader, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "../../store/Store";
import { useState, useEffect } from "react";
import CollectionsDataIF from "../../interfaces/CollectionsDataIF";
import HandleChange from "../../functions/HandleChange";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { hideCollectionForm } from "../../store/features/Forms/CollectionFormSlice";
import OperationsOnColl from "../../connectWithServer/OperationsOnColl";

const topicList = ["books", "cars", "whiskey", "animals"];

interface CollectionFormIF {
    userName: string;
}

export default function CollectionForm({ userName }: CollectionFormIF) {
    const formState = useSelector((state: StoreState) => state.FormsVisReducer);
    const dispatch = useDispatch();

    const [coll, setColl] = useState<CollectionsDataIF>(formState.collection);

    useEffect(() => {
        setColl({ ...formState.collection, owner: userName });
    }, [formState]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formState.forEdit
            ? await OperationsOnColl(coll.owner, coll, "editcoll", () =>
                  console.log("edit")
              )
            : await OperationsOnColl(coll.owner, coll, "newcoll", () =>
                  console.log("new")
              );
        dispatch(hideCollectionForm());
    };

    return (
        <Offcanvas
            show={formState.formVis}
            onHide={() => dispatch(hideCollectionForm())}
        >
            <OffcanvasHeader closeButton>
                {formState.forEdit ? "Edit collection" : "Add new collection"}
            </OffcanvasHeader>
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
                        onChange={(e) => {
                            HandleChange(e, setColl, coll);
                        }}
                        required
                    />
                </Row>
                <Row className="m-1">
                    <Form.Select
                        placeholder="Topic"
                        name="topic"
                        required
                        value={coll.topic}
                        onChange={(e) => HandleChange(e, setColl, coll)}
                    >
                        <option>Topic</option>
                        {topicList.map((t) => (
                            <option key={topicList.indexOf(t)} value={t}>
                                {t}
                            </option>
                        ))}
                    </Form.Select>
                </Row>
                <Row className="m-1">
                    <Form.Control
                        type="file"
                        name="image"
                        id="sendImage"
                        value={coll.image}
                        accept="image/*"
                        onChange={(e) => HandleChange(e, setColl, coll)}
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

                <Button variant="success" type="submit">
                    Send
                </Button>
            </Form>
        </Offcanvas>
    );
}
