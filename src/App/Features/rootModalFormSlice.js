import {combineReducers, createSlice} from '@reduxjs/toolkit'

export const rootModalFormSlice = createSlice({
    name: 'modalForm',
    initialState: false,
    reducers: {
        openModalForm: () => {
            console.log("open modal")
            return true
        },
        closeModalForm: () => {
            return false
        }
    }
})

// Action creators are generated for each case reducer function
export const rootModalFormReducer = combineReducers({
    modalFormReducer: rootModalFormSlice.reducer
})

export const {openModalForm, closeModalForm} = rootModalFormSlice.actions

