import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UserState } from 'utils/types'

const initialState = {
  current: {
    id: '',
    username: '',
    password: '',
    city: '',
    country: '',
  },
  isLoading: false,
}

export const addUserThunk = createAsyncThunk('user/addUser', async (user: UserState) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return user
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clear: () => {
      return initialState
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addUserThunk.pending, state => {
        state.isLoading = true
      })
      .addCase(addUserThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.current = action.payload
      })
  },
})

export const { clear } = userSlice.actions

export default userSlice.reducer
