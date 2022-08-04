import { useEffect } from 'react'
import { Heading, Divider, Avatar, CircularProgress, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { batch } from 'react-redux'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { fetchCityThunk, clear as clearCity } from 'slices/citySlice'
import { fetchWeatherThunk, clear as weatherCity } from 'slices/weatherSlice'
import { clear as clearUser } from 'slices/userSlice'
import Stats from 'components/Stats'
import styles from './dashboard.module.css'

const Dashboard = () => {
  const user = useAppSelector(state => state.user)
  const city = useAppSelector(state => state.city)
  const weather = useAppSelector(state => state.weather)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user.current.city === '') {
      batch(() => {
        dispatch(clearCity())
        dispatch(weatherCity())
      })
      return navigate('/')
    }
  }, [user, navigate, dispatch])

  useEffect(() => {
    if (user.current.city !== '') {
      dispatch(fetchCityThunk(user.current.city) as any)
    }
  }, [user, dispatch])

  useEffect(() => {
    const { lat, lon } = city.userCity
    if (lat && lon) {
      dispatch(fetchWeatherThunk({ latitiude: lat, longitude: lon }) as any)
    }
  }, [city, dispatch])

  const handleLogout = () => dispatch(clearUser())

  return (
    <div className={styles.wrapper}>
      <Heading as="h1" size="xl" marginBottom="20px" display="flex" alignItems="center" justifyContent="space-between">
        Hello Agnel <Avatar marginLeft="10px" name={user.current.username} size="sm" />
        <Button colorScheme="teal" onClick={handleLogout}>
          Logout
        </Button>
      </Heading>
      <Divider marginBottom="20px" />

      {city.isLoading && (
        <>
          <CircularProgress marginRight="10px" isIndeterminate color="green.300" /> Fetching city details...
        </>
      )}

      {weather.isLoading && (
        <>
          <CircularProgress marginRight="10px" isIndeterminate color="green.300" /> Fetching weather details...
        </>
      )}

      {weather.currentWeather.coord && <Stats styles={styles} weather={weather} city={city} />}
    </div>
  )
}

export default Dashboard
