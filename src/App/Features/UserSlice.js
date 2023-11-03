import { createSlice } from '@reduxjs/toolkit'
import ImgNoImg from "../../Assets/Images/img_no_img.png"
import perfil from "../../Assets/Images/perfil.jpg"
const userLoguedo = true
let userDefault = {
    nombre: null,
    ap_paterto: null,
    ap_materno: null,
    numEmpleado: null,
    email: null,
    photo: ImgNoImg,
    puesto: null
}
if (userLoguedo){
    userDefault = {
        nombre: "Javier",
        ap_paterto: "Hernandez",
        ap_materno: "Martinez",
        numEmpleado: "139P0294",
        emai: "javier_9509@hotmail.com",
        photo: perfil,
        puesto: "Front End Deb"
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