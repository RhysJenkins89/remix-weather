import { Link, useNavigate } from "@remix-run/react";
import { useState } from "react";
import Button from '@mui/material/Button';

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    // Handle user login
    const handleSubmit = (event) => {
        event.preventDefault()
        if (
            username === 'ipgautomotive' &&
            password === 'carmaker'
        ) {
            console.log('it\'s working')
            navigate('/main')
        }
    }

    return (
        <div>
            <h1>This is the login page.</h1>
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom: '20px'}}>
                    <input 
                        onChange={(event) => setUsername(event.target.value)} 
                        value={username} 
                        type='text' 
                        placeholder="username" 
                    />
                </div>
                <div style={{marginBottom: '20px'}}>
                    <input 
                        onChange={(event) => setPassword(event.target.value)} 
                        value={password} 
                        type='password' 
                        placeholder="password" 
                    />
                </div>
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}

export default Login