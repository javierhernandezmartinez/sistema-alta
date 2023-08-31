import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import {InputSwitch} from "primereact/inputswitch";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {closeModalForm} from "../../../App/Features/rootModalFormSlice";
import axios from "axios";
import {listDataTable} from "../../../App/Features/AdministrationSlice";

const onChange = (e,arrayList, setArrayList, campo) => {
    arrayList[campo] = e
    setArrayList(arrayList)
}
const getListRegistros = (dispatch)=>{
    axios.get("http://localhost:3100/api/app/system/get/departamentos")
        .then(res=> {
            let listData = res?.data?.row?.map(item=>{
                return {
                    id: item.IdDepto,
                    nombre: item.NomDepto,
                    activo: item.Activo
                }

            })
            dispatch(listDataTable(listData))
            dispatch(closeModalForm())
        }).catch(err=>{
        console.log(err)
    })
}

const addRegistro = (dispatch, array, props) => {
    axios.post("http://localhost:3100/api/app/system/add/departamento", array)
        .then(res => {
                console.log(res)
                props.toast.current.show(
                    {
                        severity: res.data.message ? 'success' : "error",
                        summary: 'Message',
                        detail: res.data.message ? res.data.message : res.data.errorMessage }
                );
                getListRegistros(dispatch)
            }
        ).catch(err=>{
        console.log(err)
    })
}
const updateRegistro = (dispatch, array, props) => {
    axios.post("http://localhost:3100/api/app/system/update/departamento", array)
        .then(res => {
                console.log(res)
                props.toast.current.show(
                    {
                        severity: res.data.message ? 'success' : "error",
                        summary: 'Message',
                        detail: res.data.message ? res.data.message : res.data.errorMessage }
                );
                getListRegistros(dispatch)
            }
        ).catch(err=>{
        console.log(err)
    })
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

const FormDepartamento = (props) => {
    const dispatch = useDispatch()
    const [arrayList, setArrayList] = useState({...props.arrayList})
    const [selectedActivo, setSelectedActivo] = useState(false)
    console.log("props array", props.arrayList)

    useEffect(()=>{
        setSelectedActivo(props.arrayList.activo === "1")
    },[])
    return(
        <div className={"row row-form"}>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Nombre</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.nombre}
                               onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "nombre")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Activo</label>
                    <InputSwitch checked={selectedActivo} onChange={(e) => {
                        setSelectedActivo(e.value)
                        onChange(e.value ? "1" : "0" ,arrayList, setArrayList, "activo")
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

export default FormDepartamento