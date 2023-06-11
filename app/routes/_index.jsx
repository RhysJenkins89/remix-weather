import { Link, useNavigate } from "@remix-run/react";
import { useState } from "react";

// MUI components
import { Container, Button, Input, Typography, Box, FormControl } from '@mui/material';


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
        <Container>
            <Typography variant="h2" sx={{ my: 4, textAlign: 'center' }}>Remixing the Weather</Typography>
            <Box sx={{ width: 1, display: 'flex', justifyContent: 'center' }}>
                <FormControl onSubmit={handleSubmit} sx={{ width: 250 }}>
                    <Input
                        sx={{ mb: 2 }}
                        onChange={(event) => setUsername(event.target.value)}
                        value={username}
                        type='text'
                        placeholder="username"
                    />
                    <Input
                        sx={{ mb: 6 }}
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        type='password'
                        placeholder="password"
                    />
                    <Button variant="outlined" type="submit">Log in</Button>
                </FormControl>
            </Box>
        </Container>
    )
}

export default Login