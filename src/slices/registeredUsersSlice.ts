import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserState } from 'utils/types'

const initialState: UserState[] = []

export const registeredUsersSlice = createSlice({
  name: 'registeredUsers',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<UserState>) => {
      return [...state, action.payload]
    },
  },
})

export const { add } = registeredUsersSlice.actions

export default registeredUsersSlice.reducer
