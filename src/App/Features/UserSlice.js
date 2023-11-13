import { createSlice } from '@reduxjs/toolkit'
import ImgNoImg from "../../Assets/Images/img_no_img.png"
import perfil from "../../Assets/Images/perfil.jpg"
const userLoguedo = false
let userDefault = null
if (userLoguedo){
    userDefault = {
        NOMBRE: "Javier",
        AP_PATERNO: "Hernandez",
        AP_MATERNO: "Martinez",
        NUM_EMPLEADO: "139P0294",
        EMAIL: "javier_9509@hotmail.com",
        PHOTO: perfil,
        PUESTO: "Front End Deb"
    }
}
export const userSlice = createSlice({
    name: 'user',
    initialState: userDefault,
    reducers: {
        setUser: (state, action) => {
            return action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions
export default userSlice.reducer