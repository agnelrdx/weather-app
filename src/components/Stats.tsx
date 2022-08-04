import { Stat, StatLabel, StatNumber, StatHelpText, StatGroup } from '@chakra-ui/react'
import { InfoIcon, StarIcon, SunIcon, WarningIcon, CalendarIcon } from '@chakra-ui/icons'

interface StatsProps {
  styles: {
    readonly [key: string]: string
  }
  weather: any
  city: any
}

const Stats = ({ styles, weather, city }: StatsProps) => {
  const date = new Date()

  return (
    <StatGroup>
      <Stat className={styles.stat}>
        <StatLabel>
          Temperatue Today <InfoIcon />
        </StatLabel>
        <StatNumber>{(weather.currentWeather.main.temp - 273.15).toFixed(2)}°C</StatNumber>
        <StatHelpText>{date.toISOString().split('T')[0]}</StatHelpText>
      </Stat>
      <Stat className={styles.stat}>
        <StatLabel>
          Minimum Temperatue Reached <StarIcon />
        </StatLabel>
        <StatNumber>{(weather.currentWeather.main.temp_min - 273.15).toFixed(2)}°C</StatNumber>
        <StatHelpText>{date.toISOString().split('T')[0]}</StatHelpText>
      </Stat>
      <Stat className={styles.stat}>
        <StatLabel>
          Maximum Temperatue Reached <WarningIcon />
        </StatLabel>
        <StatNumber>{(weather.currentWeather.main.temp_max - 273.15).toFixed(2)}°C</StatNumber>
        <StatHelpText>{date.toISOString().split('T')[0]}</StatHelpText>
      </Stat>
      <Stat className={styles.stat}>
        <StatLabel>
          Humidity <SunIcon />
        </StatLabel>
        <StatNumber>{weather.currentWeather.main.humidity}</StatNumber>
        <StatHelpText>{city.userCity.name}</StatHelpText>
      </Stat>
      <Stat className={styles.stat}>
        <StatLabel>
          Today's Forecast <CalendarIcon />
        </StatLabel>
        <StatNumber>{weather.currentWeather.weather[0].description.toUpperCase()}</StatNumber>
        <StatHelpText>{city.userCity.name}</StatHelpText>
      </Stat>
    </StatGroup>
  )
}

export default Stats
