import { Link } from "@remix-run/react";

function Login() {
    return (
        <div>
            <h1>This is the login page.</h1>
            <Link to='/'>Home page</Link>
        </div>
    )
}

export default Login