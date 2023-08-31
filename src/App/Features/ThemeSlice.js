import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
    name: 'counter',
    initialState: false,
    reducers: {
        toogleTheme: (state, action) => {
            return action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { toogleTheme } = themeSlice.actions

export default themeSlice.reducer