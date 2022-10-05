export default function HomePage() {
    return <div>{localStorage.getItem("user")}</div>;
}
