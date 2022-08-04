import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import userReducer from 'slices/userSlice'
import registeredUsersReducer from 'slices/registeredUsersSlice'
import cityReducer from 'slices/citySlice'
import weatherReducer from 'slices/weatherSlice'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  user: userReducer,
  registeredUsers: registeredUsersReducer,
  city: cityReducer,
  weather: weatherReducer,
})

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    blacklist: ['city', 'weather'],
  },
  rootReducer
)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

export const persistor = persistStore(store)
