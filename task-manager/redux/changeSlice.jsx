import { createSlice } from '@reduxjs/toolkit'

const changeSlice = createSlice({
    name: 'change',
    initialState: {value:false},
    reducers: {
        toggle: (state) =>{ state.value = ! state.value},
    }
})

export const { toggle } = changeSlice.actions
export default changeSlice.reducer;