import { ThunkAction, Action } from '@reduxjs/toolkit'
import { store } from 'utils/store'

export interface UserState {
  id: string
  password: string
  username: string
  city: string
  country: string
}

export interface CityState {
  lat: number
  lon: number
  name: string
  country: string
}

export interface WeatherState {
  coord: Object
  weather: Object[]
  main: Object
}

export interface RegisteredUsers {
  users: UserState[]
}

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
