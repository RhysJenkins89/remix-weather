import { Link, useNavigate } from "@remix-run/react";
import { useState } from "react";
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import Typography from '@mui/material/Typography'; // The typography component isn't playing ball at the moment. I have time, I'll bug fix when the app is finished. 


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
            navigate('/main')
        }
    }

    return (
        <div>
            <h1>This is the login page.</h1>
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom: '20px'}}>
                    <Input 
                        onChange={(event) => setUsername(event.target.value)} 
                        value={username} 
                        type='text' 
                        placeholder="username" 
                    />
                </div>
                <div style={{marginBottom: '20px'}}>
                    <Input 
                        onChange={(event) => setPassword(event.target.value)} 
                        value={password} 
                        type='password' 
                        placeholder="password" 
                    />
                </div>
                <Button variant="outlined" type="submit">Log in</Button>
            </form>
        </div>
    )
}

export default Login