import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CityState } from 'utils/types'

const initialState = {
  userCity: {} as CityState,
  isLoading: false,
}

export const fetchCityThunk = createAsyncThunk('city/fetchCity', async (city: string) => {
  await new Promise(resolve => setTimeout(resolve, 1500))
  const cities = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_API_KEY}`)
  const response = await cities.json()
  const selectedCity = response.find((v: CityState) => v.name.toLowerCase() === city.toLowerCase())
  return selectedCity
})

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    clear: () => {
      return initialState
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCityThunk.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchCityThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.userCity = action.payload
      })
  },
})

export const { clear } = citySlice.actions

export default citySlice.reducer
