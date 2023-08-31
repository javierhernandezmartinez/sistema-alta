import { Button } from 'primereact/button';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import Table from "../../Table";
import Modal from "../../Modal";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import {useEffect, useRef, useState} from "react";
import {openModalForm} from "../../../App/Features/rootModalFormSlice";
import {Toast} from "primereact/toast";
import {ConfirmPopup,  confirmPopup} from "primereact/confirmpopup";
import FormProgramacion from "./FormProgramacion";

let defaultArray = {
    id: '',
    id_empleado: '',
    id_curso: '',
    fecha: null,
    asistencia: '',
    consec: '',
    estatus: '',
    notas: '',
}
const getListRegistros = (dispatch)=>{
    axios.get("http://localhost:3100/api/app/system/get/programaciones")
        .then(res=> {
            console.log(res)
            let listData = res?.data?.row?.map(item=>{
                return {
                    ...defaultArray,
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
            console.log(listData)
            dispatch(listDataTable(listData ? listData : []))
        })
}

const deleteRegistro = (array, toast, dispatch) => {
    console.log(array)
    axios.post("http://localhost:3100/api/app/system/delete/programacion", array)
        .then(res => {
                console.log(res)
                toast.current.show(
                    {
                        severity: res.data.message ? 'success' : "error",
                        summary: 'Message',
                        detail: res.data.message ? res.data.message : res.data.errorMessage
                    }
                );
                getListRegistros(dispatch)
            }
        )
}

const PanelProgramacion = (props) => {
    let dispatch = useDispatch()
    let toast= useRef(null);

    const [arrayList, setArrayList] = useState(defaultArray)

    useEffect(()=>{
        // initNegociosList(dispatch, api)
        getListRegistros(dispatch)
    },[])

    const listData = useSelector(state => state.rootAdmin.listDataTableReducer)

    const header = <div className="table-header">
        <span className="table-title">{props.title}</span>
        <Button icon="pi pi-plus" label="Nuevo" severity="help" outlined className="button-plus"
                onClick={()=> {
                    setArrayList(defaultArray)
                    dispatch(openModalForm())
                }}
        />
    </div>

    const bodyColum=(rowData) => {
        const accept = () => {
            deleteRegistro(rowData, toast, dispatch)
        };

        const reject = () => {
            toast.current.show({ severity: 'warn', summary: 'Denegado', detail: 'Proceso denegado', life: 3000 });
        };

        return(
            <div className={"list-option-button"}>
                <Button icon="pi pi-file-edit" severity="help" outlined className="button-plus" tooltip="Editar"
                        tooltipOptions={{position: 'top'}}
                        onClick={()=>{
                            console.log(rowData)
                            setArrayList(rowData)
                            dispatch(openModalForm())
                        }}
                />
                <Button icon="pi pi-trash" severity="help" outlined className="button-plus" tooltip="Eliminar"
                        tooltipOptions={{position: 'top'}}
                        onClick={(event)=>{
                            confirmPopup({
                                target: event.currentTarget,
                                message: 'Estas seguro de eliminar este registro?',
                                icon: 'pi pi-info-circle',
                                acceptClassName: 'p-button-danger',
                                acceptLabel: "Si",
                                rejectLabel: "No",
                                accept,
                                reject
                            });
                        }}
                />
            </div>
        )
    }

    const columns =
        [
            {field:"id",header:"Id"},
            {field: "id_empleado",header: "Empleado"},
            {field: "id_curso", header: "Curso"},
            {field: "fecha", header: "Fecha"},
            {field: "asistencia", header: "Aistencia"},
            {field: "consec", header: "Consec"},
            {field: "estatus", header: "Estatus"},
            {field: "notas", header: "Notas"},
            {header: "Option", body: bodyColum
            }
        ]



    return(
        <div  className={"row"}>
            <div className={"col-md-12"}>
                <Table header ={header} columns ={columns} data ={listData}/>
            </div>
            <Modal
                element = {<FormProgramacion toast={toast} arrayList={arrayList}/>}
            />
            <Toast ref={toast} />
            <ConfirmPopup />
        </div>
    )
}

export default PanelProgramacion