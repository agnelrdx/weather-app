import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  currentWeather: {} as any,
  isLoading: false,
}

export const fetchWeatherThunk = createAsyncThunk('weather/fetchWeather', async (props: { latitiude: number; longitude: number }) => {
  const { latitiude, longitude } = props
  await new Promise(resolve => setTimeout(resolve, 1500))
  const cities = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitiude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`)
  const response = await cities.json()
  return response
})

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clear: () => {
      return initialState
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeatherThunk.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchWeatherThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentWeather = action.payload
      })
  },
})

export const { clear } = weatherSlice.actions

export default weatherSlice.reducer
