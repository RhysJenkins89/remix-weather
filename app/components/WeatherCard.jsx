import {useState} from 'react'

// MUI components
import { 
	Typography, 
	Input,
	Button,
    Paper,
    Box 
} from "@mui/material";

function WeatherCard({city, lat, long, deleteItem}) {
    const [currentWeather, setCurrentWeather] = useState(null)
    const [dataVisible, setDataVisible] = useState(false)

    const showWeather = async (latitude, longitude) => {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m&hourly=precipitation`)
        const currentData = await response.json()
        setCurrentWeather(currentData)
        setDataVisible(!dataVisible)
        console.log(currentWeather)
    }
    
    return (
        <Paper elevation={3} width={{ xl: 1, md: 350 }}>
            <Box sx={{m: 2}}>
                <Typography onClick={() => showWeather(lat, long)}>{dataVisible ? 'Hide' : 'Show'} the weather in {city}</Typography>
                <Typography onClick={() => deleteItem(city, 'delete')}>Delete {city}</Typography>
                {currentWeather ?
                    <div style={{display: dataVisible ? 'block' : 'none'}}>
                        <Typography>Temperature: {currentWeather.current_weather.temperature}</Typography>
                        <Typography>Precipitation: {currentWeather.hourly.precipitation[0]}</Typography>
                        <Typography>Humidity: {currentWeather.hourly.relativehumidity_2m[0]}</Typography>
                    </div>
                : null}
            </Box>
        </Paper>
    )
}

export default WeatherCard