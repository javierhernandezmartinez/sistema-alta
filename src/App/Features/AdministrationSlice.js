import { combineReducers, createSlice } from '@reduxjs/toolkit'

export const listDataTableSlice = createSlice({
    name: 'listdata',
    initialState: [],
    reducers: {
        listDataTable: (state, action) => {
            return action.payload
        },
        resetListDataTable:()=>{
            return []
        }
    }
})

export const empleadoSlice = createSlice({
    name: 'empleados',
    initialState: [],
    reducers: {
        arrayEmpleados: (state, action) => {
            //console.log(action)
            return action.payload
        },
        formatArrayEmpleado:()=>{
            return []
        }
    }
})

export const grupoSlice = createSlice({
    name: 'grupos',
    initialState: [],
    reducers: {
        arrayGrupos: (state, action) => {
            //console.log(action)
            return action.payload
        },
        formatArrayGrupos:()=>{
            return []
        }
    }
})

// Action creators are generated for each case reducer function
export const rootAdminReducer = combineReducers({
    listDataTableReducer: listDataTableSlice.reducer,
    empleadoReducer: empleadoSlice.reducer,
    grupoReducer: grupoSlice.reducer
})

export const {listDataTable, resetListDataTable} = listDataTableSlice.actions
export const {arrayEmpleados, formatArrayEmpleado} = empleadoSlice.actions
export const {arrayGrupos, formatArrayGrupos} = grupoSlice.actions