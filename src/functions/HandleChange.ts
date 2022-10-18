export default function HandleChange(
    e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    setState: Function,
    state: any
) {
    setState({ ...state, [e.target.name]: e.target.value });
}
