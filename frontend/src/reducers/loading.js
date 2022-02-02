import { createSlice } from '@reduxjs/toolkit'

//this is for the loader/spinner:
export const loading = createSlice({
    name:'loading',
    initialState: {
        loading: false
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})