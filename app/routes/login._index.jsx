import { Link } from "@remix-run/react";
import Button from '@mui/material/Button';

function Login() {
    return (
        <div>
            <h1>This is the login page.</h1>
            <Link to='/'>
                <Button variant="contained">Home page</Button>
            </Link>
        </div>
    )
}

export default Login