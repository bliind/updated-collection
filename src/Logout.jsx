import { useEffect } from "react";
import { useUser } from "./hooks/useUser";
import { Link } from "react-router";

function Logout() {
    const { username, logout } = useUser();

    useEffect(() => {
        logout();
    }, [])

    return (
        <div className="container py-3">
            <div className="row">
                <div className="col text-center">
                    <h2>{username ? 'You are still logged in...' : 'You have been logged out!'}</h2>
                    <Link to="/collection/" className="link-light link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Go Home</Link>
                </div>
            </div>
        </div>
    )
}

export default Logout;
