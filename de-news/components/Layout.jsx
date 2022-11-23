import AppBar from "./appBar";

export default function Layout({gun, children, user, loggedIn, setLoggedIn }) {

    return (
        <main>
            <AppBar gun={gun} user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            {children}
        </main>
    )
}