import {useState, useEffect} from 'react'
import { BsSun, BsCloudFog, BsCloudRain, BsCloudSnow } from 'react-icons/bs'
import { AiOutlineCloud } from 'react-icons/ai'
import { IoThunderstormOutline } from 'react-icons/io5'
import wmoCodes from '../data/wmo-weather-codes'

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

    useEffect(() => {
        showWeather(lat, long)
    }, [])

    const showWeather = async (latitude, longitude) => {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m,precipitation_probability`)
        const currentData = await response.json()
        setCurrentWeather(currentData)
    }

    const getWeathericon = (weatherCode, size) => {
        switch (weatherCode) {
            case 0: case 1:
                return <BsSun className='icon' size={size} color='white' />
            case 2: case 3:
                return <AiOutlineCloud className='icon' size={size} color='white' /> 
            case 45: case 48:
                return <BsCloudFog className='icon' size={size} color='white' />   
            case 51: case 53: case 55: case 56: case 57: case 61: case 63: case 65: case 66: case 67: case 80: case 81: case 82:      
                return <BsCloudRain className='icon' size={size} color='white' />
            case 71: case 73: case 75: case 77: case 85: case 86: 
                return <BsCloudSnow className='icon' size={size} color='white' />
            case 95: case 96: case 99:
                return <IoThunderstormOutline className='icon' size={size} color='white' />      
            default: 
                return <p>No data available</p>
        }
    }
    
    return (
        <Paper elevation={3} sx={{ width: 200, height: 'auto' }}>
            <Box sx={{m: 2, display: 'flex', flexDirection: 'column', height: 1}}>
                <Typography variant='h5' sx={{ mb: 1 }}>{city}</Typography>
                {currentWeather ?
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: 200 }}>
                        <Box sx={{ my: 'auto' }}>
                            {getWeathericon(currentWeather.current_weather.weathercode, 50)}
                            <Typography>
                                {wmoCodes.hasOwnProperty(currentWeather.current_weather.weathercode) ? wmoCodes[currentWeather.current_weather.weathercode] : null}
                            </Typography>
                        </Box>
                        {/* <Typography>Temperature: {currentWeather.current_weather.temperature}</Typography>
                        <Typography>Precipitation: {currentWeather.hourly.precipitation[0]}</Typography>
                        <Typography>Humidity: {currentWeather.hourly.relativehumidity_2m[0]}%</Typography> */}
                        <Typography>Temperature: 20</Typography>
                        <Typography>Precipitation: 50%</Typography>
                        <Typography>Humidity: 70%</Typography>
                    </Box>
                : null}
                <Button 
                    sx={{ mt: 2 }}
                    onClick={() => deleteItem(city, 'delete')} 
                    variant='outlined'
                    color='error'
                >
                    Delete
                </Button>
            </Box>
        </Paper>
    )
}

export default WeatherCard