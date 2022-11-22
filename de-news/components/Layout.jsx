import AppBar from "./appBar";

export default function Layout({ children, user, loggedIn, setLoggedIn }) {

    return (
        <main>
            <AppBar user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            {children}
        </main>
    )
}