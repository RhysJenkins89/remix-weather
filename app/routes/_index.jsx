import { useNavigate } from "@remix-run/react";
import { useState } from "react";

// MUI components
import {
    Container,
    Button,
    Input,
    Typography,
    Box,
    FormControl
} from '@mui/material';


function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setShowError] = useState(false)

    const navigate = useNavigate()

    // Handle user login
    const handleSubmit = (event) => {
        event.preventDefault()
        if (
            username === 'ipgautomotive' &&
            password === 'carmaker'
        ) {
            navigate('/main')
        } else {
            setShowError(true)
            setUsername('')
            setPassword('')
        }
    }

    const handleUserInput = (event) => {
        setShowError(false)
        setUsername(event.target.value)
    }

    return (
        <Container>
            <Typography variant="h2" sx={{ my: 4, textAlign: 'center' }}>Remixing the Weather</Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ mt: 20, mx: 'auto', width: 250, display: 'flex', flexDirection: 'column' }}>
                    <FormControl>
                        <Input
                            sx={{ mb: 2 }}
                            onChange={(event) => handleUserInput(event)}
                            value={username}
                            type='text'
                            placeholder="Username"
                        />
                    </FormControl>
                    <FormControl>
                        <Input
                            sx={{ mb: 6 }}
                            onChange={(event) => setPassword(event.target.value)}
                            value={password}
                            type='password'
                            placeholder="Password"
                        />
                    </FormControl>
                    <Button variant="outlined" type="submit">Log in</Button>
                    {showError ?
                        <Typography sx={{ mt: 6, color: 'error.main' }}>Please enter the correct login details.</Typography>
                        :
                        null
                    }
                </Box>
            </form>
        </Container>
    )
}

export default Login