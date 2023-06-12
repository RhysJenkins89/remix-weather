import { useState, useEffect } from 'react'
import { BsSun, BsCloudFog, BsCloudRain, BsCloudSnow } from 'react-icons/bs'
import { AiOutlineCloud } from 'react-icons/ai'
import { IoThunderstormOutline } from 'react-icons/io5'

// MUI components
import {
    Typography,
    Input,
    Button,
    Paper,
    Box
} from "@mui/material";

function WeatherCard({ city, lat, long, deleteItem }) {
    const [currentWeather, setCurrentWeather] = useState(null)

    useEffect(() => {
        showWeather(lat, long)
    }, [])

    const showWeather = async (latitude, longitude) => {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=d148431d019249b1b9f63254231206&q=${latitude},${longitude}&aqi=no`)
        const currentData = await response.json()
        setCurrentWeather(currentData)
    }

    const getWeathericon = (weatherCode, size) => {
        switch (weatherCode) {
            case 1000:
                return <BsSun className='icon' size={size} color='white' />
            case 1003: case 1006: case 1009:
                return <AiOutlineCloud className='icon' size={size} color='white' />
            case 1030: case 1135: case 1147:
                return <BsCloudFog className='icon' size={size} color='white' />
            case 1063: case 1072: case 1150: case 1153: case 1168: case 1171: case 1180: case 1183: case 1186: case 1189: case 1192: case 1195: case 1198: case 1201: case 1204: case 1207: case 1240: case 1243: case 1246: case 1249: case 1252:  
                return <BsCloudRain className='icon' size={size} color='white' />
            case 1066: case 1069: case 1114: case 1117: case 1210: case 1213: case 1216: case 1219: case 1222: case 1225: case 1237: case 1255: case 1258: case 1261: case 1264:
                return <BsCloudSnow className='icon' size={size} color='white' />
            case 1087: case 1273: case 1276: case 1279: case 1282:
                return <IoThunderstormOutline className='icon' size={size} color='white' />
            default:
                return <p>No data available</p>
        }
    }

    return (
        <Paper elevation={3} sx={{ width: 200, height: 'auto' }}>
            <Box sx={{ m: 2, display: 'flex', flexDirection: 'column', height: 1 }}>
                <Typography variant='h5' sx={{ mb: 1 }}>{city}</Typography>
                {currentWeather ?
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: 200 }}>
                        <Box sx={{ my: 'auto' }}>
                            {getWeathericon(currentWeather.current.condition.code, 50)}
                            <Typography>
                                {currentWeather.current.condition.text}
                            </Typography>
                        </Box>
                        <Typography>Temperature: {currentWeather.current.temp_c}&deg;C</Typography>
                        <Typography>Precipitation: {currentWeather.current.precip_mm}mm</Typography>
                        <Typography>Humidity: {currentWeather.current.humidity}%</Typography>
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