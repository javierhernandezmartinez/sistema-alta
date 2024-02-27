import axios, {post} from "axios";

const Services={}
const api = process.env.REACT_APP_ENDPOINT + '/api/app/system'

Services.getAreas = ()=>{
    return Services.axios('get',"/get/areas")
}
Services.addArea = (data) => {
    return Services.axios('post',"/add/area", data)
}
Services.updateArea = (data) => {
    return Services.axios('post',"/update/area", data)
}
Services.deleteArea = (data, toast, dispatch) => {
    return Services.axios('post',"/delete/area", data)
}

Services.getGrupos = ()=>{
    return Services.axios('get',"/get/grupos")
}
Services.addGrupo = (data) => {
    return Services.axios('post',"/add/grupo", data)
}
Services.updateGrupo = (data) => {
    return Services.axios('post',"/update/grupo", data)
}
Services.deleteGrupo = (data, toast, dispatch) => {
    return Services.axios('post',"/delete/grupo", data)
}

Services.getDepas=()=>{
    return Services.axios('get',"/get/departamentos")
}
Services.addDepa=(data)=>{
    return Services.axios('post',"/add/departamento", data)
}
Services.updateDepa=(data)=>{
    return Services.axios('post',"/update/departamento", data)
}
Services.deleteDepa = (data) => {
    return Services.axios('post',"/delete/departamento", data)
}

Services.getEmpleados = () => {
    return Services.axios('get',"/get/empleados")
}
Services.addEmpleado = (data) => {
    return Services.axios('post',"/add/empleado", data)
}
Services.updateEmpleado = (data) => {
    return Services.axios('post',"/update/empleado", data)
}
Services.deleteEmpleado = (data) => {
    return Services.axios('post',"/delete/empleado", data)
}
Services.getEmpleado = (data) => {
    return Services.axios('post',"/search/empleado", data)
}

Services.getUsuarios = () => {
    return Services.axios('get',"/get/usuarios")
}
Services.addUsuario = (data) => {
    return Services.axios('post',"/add/usuario", data)
}
Services.updateUsuario = (data) => {
    return Services.axios('post',"/update/usuario", data)
}
Services.deleteUsuario = (data) => {
    return Services.axios('post',"/delete/usuario", data)
}
Services.getUsuario = (data) => {
    return Services.axios('post',"/get/usuario", data)
}

Services.getCursos = () => {
    return Services.axios('get',"/get/cursos")
}
Services.addCurso = (data) => {
    return Services.axios('post',"/add/curso", data)
}
Services.updateCurso = (data) => {
    return Services.axios('post',"/update/curso", data)
}
Services.deleteCurso = (data) => {
    return Services.axios('post',"/delete/curso", data)
}

Services.getProgramaciones = () => {
    return Services.axios('get',"/get/programaciones")
}
Services.addProgramacion = (data) => {
    return Services.axios('post',"/add/programacion", data)
}
Services.updateProgramacion = (data) => {
    return Services.axios('post',"/update/programacion", data)
}
Services.deleteProgramacion = (data) => {
    return Services.axios('post',"/delete/programacion", data)
}
Services.getProgramacion = (data) => {
    return Services.axios('post',"/get/programacion", data)
}

Services.getLogin = (data) => {
    return Services.axios('post',"/login", data)
}
Services.searchEmpleado = (data) => {
    return Services.axios('post',"/search/id/empleado", data)
}
Services.searchUsuario = (data) => {
    return Services.axios('post',"/search/id/usuario", data)
}

Services.getIncripciones = () => {
    return Services.axios('get',"/get/inscripciones")
}
Services.addInscripcion = (data) => {
    console.log(data)
    return Services.axios('post',"/add/inscripcion", data)
}

Services.getMisCursos = (data) => {
    return Services.axios('post',"/perfil/mis_cursos", data)
}
Services.getCursosDisponibles = (data) => {
    return Services.axios('post',"/perfil/cursos/disponibles", data)
}

Services.updateFotoPerfil = (data) => {
    return Services.axios('post',"/perfil/update/foto/perfil", data)
}
Services.getFotoPerfil = (data) => {
    console.log(data)
    return Services.axios('post',"/perfil/get/foto/perfil", data)
}
Services.updatePassPerfil = (data) => {
    console.log(data)
    return Services.axios('post',"/perfil/update/pass", data)
}
Services.getSalaEspera = () => {
    return Services.axios('get',"/get/sala_espera")
}


Services.axios =(type, extension, data = null)=>{
    return axios[type](api + extension, data)
        .then(res=> {
            return res
        }).catch(err=>{
            console.log(err)
            return err
        })
}
export default Services