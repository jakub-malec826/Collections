export default function HomePage() {
    return <div>{sessionStorage.getItem("user")}</div>;
}
