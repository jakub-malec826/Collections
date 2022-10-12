import { valuesIF } from "../routes/SignForms";
import CollectionsDataIF from "../interfaces/CollectionsDataIF";
export default function HandleChange(
    e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    setState: Function,
    state: CollectionsDataIF | valuesIF
) {
    setState({ ...state, [e.target.name]: e.target.value });
}
