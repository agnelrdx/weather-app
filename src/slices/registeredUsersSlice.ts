import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserState, RegisteredUsers } from 'utils/types'

const initialState: RegisteredUsers = {
  users: [],
}

export const registeredUsersSlice = createSlice({
  name: 'registeredUsers',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<UserState>) => {
      state.users = [...state.users, action.payload]
    },
  },
})

export const { add } = registeredUsersSlice.actions

export default registeredUsersSlice.reducer
