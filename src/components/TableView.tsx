import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MarkdownEditor from "@uiw/react-markdown-editor";
import { Button } from "react-bootstrap";

import ItemsDataIF from "../interfaces/ItemsDataIF";
import CollectionsDataIF from "../interfaces/CollectionsDataIF";
import UserDataIF from "../interfaces/UserDataIF";

import OperationsOnColl from "../connectWithServer/OperationsOnColl";

import { showCollectionForm } from "../store/features/Forms/CollectionFormSlice";
import { StoreState } from "../store/Store";
import { showItemsForm } from "../store/features/Forms/ItemFormSlice";
import OperationsOnItem from "../connectWithServer/OperationsOnItem";

interface UserColViewIF {
  userOnView: UserDataIF;
  type: string;
  collectionToShow?: CollectionsDataIF;
  itemsToShow?: ItemsDataIF;
  collectionName?: string;
}

export default function TableView({
  userOnView,
  type,
  collectionToShow,
  itemsToShow,
  collectionName
}: UserColViewIF) {
  const actualUser = useSelector(
    (state: StoreState) => state.OneUserReducer.user
  );
  const fields = useSelector(
    (state: StoreState) => state.CollectionFieldsReducer.fields
  );

  const nav = useNavigate();

  const dispatch = useDispatch();
  return (
    <tr>
      <td>
        <div
          hidden={
            userOnView.userName === actualUser.userName
              ? false
              : !actualUser.isAdmin
          }
        >
          <Button
            variant="light"
            onClick={() => {
              type === "collection" &&
                dispatch(showCollectionForm([collectionToShow, true]));
              type === "items" && dispatch(showItemsForm([itemsToShow, true]));
            }}
          >
            ✍🏼
          </Button>
          <Button
            variant="light"
            onClick={async () => {
              type === "collection" &&
                collectionToShow &&
                (await OperationsOnColl(
                  userOnView.userName,
                  collectionToShow,
                  "delcoll"
                ));
              type === "items" &&
                itemsToShow &&
                (await OperationsOnItem(
                  userOnView.userName,
                  collectionName ? collectionName : "",
                  "deleteitem",
                  itemsToShow
                ));
            }}
          >
            ❌
          </Button>
        </div>
      </td>

      {type === "collection" && collectionToShow && (
        <>
          <td onClick={() => nav(`${collectionToShow.name}`)}>
            {collectionToShow.name}
          </td>
          <td data-color-mode="light">
            <MarkdownEditor.Markdown source={collectionToShow.description} />
          </td>
          <td>{collectionToShow.topic}</td>
          <td>
            {collectionToShow.image
              ? collectionToShow.image
              : "No image uploaded"}
          </td>
        </>
      )}

      {type === "items" && itemsToShow && (
        <>
          <td>{itemsToShow._id}</td>
          <td>{itemsToShow.name}</td>
          <td>
            {itemsToShow.tag.map(
              (t) =>
                t +
                (itemsToShow.tag.indexOf(t) < itemsToShow.tag.length - 1
                  ? ", "
                  : "")
            )}
          </td>
          {fields.map((f) => (
            <td key={fields.indexOf(f)}>
              {typeof itemsToShow[f.fieldName.toLowerCase()] !== "boolean"
                ? itemsToShow[f.fieldName.toLowerCase()]
                : itemsToShow[f.fieldName.toLowerCase()] === true
                ? "✅"
                : "❌"}
            </td>
          ))}
          <td></td>
        </>
      )}
    </tr>
  );
}
