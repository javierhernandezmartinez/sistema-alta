import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {InputSwitch} from "primereact/inputswitch";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {closeModalForm} from "../../../App/Features/rootModalFormSlice";
import axios from "axios";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import {InputNumber} from "primereact/inputnumber";
import {Calendar} from "primereact/calendar";

const onChange = (e,arrayList, setArrayList, campo) => {
    arrayList[campo] = e
    setArrayList(arrayList)
}
const getListEmpleados = (dispatch)=>{
    axios.get("http://localhost:3100/api/app/system/get/programaciones")
        .then(res=> {
            let listData = res?.data?.row?.map(item=>{
                return {
                    id: item.IdProg,
                    id_empleado: item.IdEmpleado,
                    id_curso: item.Curso,
                    fecha: item.Fecha,
                    asistencia: item.Asistencia,
                    consec: item.Consec,
                    estatus: item.Estatus,
                    notas: item.Notas,
                }

            })
            dispatch(listDataTable(listData))
            dispatch(closeModalForm())
        })
}

const addRegistro = (dispatch, array, props) => {
    axios.post("http://localhost:3100/api/app/system/add/programacion", array)
        .then(res => {
                console.log(res)
                props.toast.current.show(
                    {
                        severity: res.data.message ? 'success' : "error",
                        summary: 'Message',
                        detail: res.data.message ? res.data.message : res.data.errorMessage }
                );
                getListEmpleados(dispatch)
            }
        )
}
const updateRegistro = (dispatch, array, props) => {
    axios.post("http://localhost:3100/api/app/system/update/programacion", array)
        .then(res => {
                console.log(res)
                props.toast.current.show(
                    {
                        severity: res.data.message ? 'success' : "error",
                        summary: 'Message',
                        detail: res.data.message ? res.data.message : res.data.errorMessage }
                );
                getListEmpleados(dispatch)
            }
        )
}
const onSaveModal = (dispatch, array, props) => {
    console.log("POST JSON::",array)
    if (array.id){
        updateRegistro(dispatch, array, props)
    }else {
        addRegistro(dispatch, array, props)
    }
}
const onCloseModal = (dispatch) => {
    dispatch(closeModalForm())
}

const searchOption = (array, valor) => {
    let option = array.filter(item => item.code === valor)
    console.log(option)
    return option[0]
}

const FormProgramacion = (props) => {
    const dispatch = useDispatch()
    const [arrayList, setArrayList] = useState({...props.arrayList})
    const [selectedEmpleado, setSelectedEmpleado] = useState(null)
    const [selectedCurso, setSelectedCurso] = useState(null)
    const [selectedActivo, setSelectedActivo] = useState(false)
    console.log("props array", props.arrayList)
    const listEnpleado = [
        { name: 'empleado 1', code: '1' },
        { name: 'empleado 2', code: '2' },
        { name: 'empleado 3', code: '3' },
        { name: 'empleado 4', code: '4' },
        { name: 'empleado 5', code: '5' }
    ];
    const listCurso = [
        { name: 'curso 1', code: '1' },
        { name: 'curso 2', code: '2' },
        { name: 'curso 3', code: '3' },
        { name: 'curso 4', code: '4' },
        { name: 'curso 5', code: '5' }
    ];

    useEffect(()=>{
        setSelectedEmpleado(searchOption(listEnpleado, props.arrayList.id_empleado))
        setSelectedCurso(searchOption(listCurso, props.arrayList.id_curso))
        setSelectedActivo(props.arrayList.estatus === "1")
    },[])
    return(
        <div className={"row row-form"}>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Empleado</label>
                    <Dropdown value={selectedEmpleado}
                              onChange={(e) => {
                                  setSelectedEmpleado(e.value)
                                  onChange(e.value?.code,arrayList, setArrayList, "id_empleado")
                              }}
                              options={listEnpleado}
                              optionLabel="name"
                              placeholder="Selecciona una opcion"
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Curso</label>
                    <Dropdown value={selectedCurso}
                              onChange={(e) => {
                                  setSelectedCurso(e.value)
                                  onChange(e.value?.code,arrayList, setArrayList, "id_curso")
                              }}
                              options={listCurso}
                              optionLabel="name"
                              placeholder="Selecciona una opcion"
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Fecha</label>
                    <Calendar defaultValue={arrayList.fecha }
                              onChange={(e)=> {
                                  let fecha = new Date(e.value)
                                  onChange(fecha.toLocaleString(), arrayList, setArrayList, "fecha")
                              }} />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Aistencia</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.asistencia}
                               onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "asistencia")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Consec</label>
                    <InputNumber id="username" aria-describedby="username-help" defaultValue={arrayList.consec}
                               onChange={(e)=>onChange(parseInt(e.value),arrayList, setArrayList, "consec")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Notas</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.notas}
                               onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "notas")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Estatus</label>
                    <InputSwitch checked={selectedActivo} onChange={(e) => {
                        setSelectedActivo(e.value)
                        onChange(e.value ? "1" : "0" ,arrayList, setArrayList, "estatus")
                    }}/>
                </div>
            </div>
            <div className={"col-md-12"}>
                <div className="modal-footer">
                    <Button label={"Cancelar"} onClick={()=>onCloseModal(dispatch, arrayList)}/>
                    <Button label={"Guardar"} onClick={(e)=> {
                        onSaveModal(dispatch, arrayList, props)
                    }}/>
                </div>
            </div>
        </div>
    )
}

export default FormProgramacion