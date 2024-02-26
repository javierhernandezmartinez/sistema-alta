import { Button } from 'primereact/button';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import Table from "../../Table";
import FormEmpleado from "./FormEmpleado";
import Modal from "../../Modal";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import {useEffect, useRef, useState} from "react";
import {openModalForm} from "../../../App/Features/rootModalFormSlice";
import {Toast} from "primereact/toast";
import {ConfirmPopup,  confirmPopup} from "primereact/confirmpopup";
import Services from "../../../Services/Services";

let defaultArray = {
    ID_EMPLEADO: null,
    NOMBRE: null,
    AP_PATERNO: null,
    AP_MATERNO: null,
    NUM_EMPLEADO: null,
    EMAIL: null,
    TEL: null,
    ID_GRUPO: null,
    ID_AREA: null,
    ID_DEPARTAMENTO: null,
    PUESTO: null,
    STATUS: 1
}
const getEmpleados = (dispatch)=>{
    dispatch(listDataTable([]))
    Services.getEmpleados().then(res=> {
        console.log(res)
        if(res.status === 200 && res?.data?.row?.length > 0){
            dispatch(listDataTable(res?.data?.row))
        }
    })
}

const deleteRegistro = (array, toast, dispatch) => {
    Services.deleteEmpleado(array).then(res => {
        if(res.status === 200) {
            toast.current.show(
                {
                    severity: res.data.message ? 'success' : "error",
                    summary: 'Message',
                    detail: res.data.message ? res.data.message : res.data.errorMessage
                }
            );
            getEmpleados(dispatch)
        }

        }
    )
}
const formatDropDown = (list, name, code) => {
    list = list.map(item=>{
        return {
            name: item[name],
            code: item[code]
        }
    })
    return list
}
const PanelEmpleado = (props) => {
    let dispatch = useDispatch()
    let toast= useRef(null);

    const [arrayList, setArrayList] = useState(defaultArray)
    const [areas, setAreas] = useState([])
    const [grupos, setGrupos] = useState([])
    const [departamentos, setDepartamentos] = useState([])

    useEffect(()=>{
        Services.getAreas().then(res=>{
            if(res.status === 200 && res?.data?.row?.length > 0){
                setAreas(formatDropDown(res?.data?.row,'NOMBRE','ID_AREA'))
            }
        })
        Services.getGrupos().then(res=>{
            if(res.status === 200 && res?.data?.row?.length > 0){
                setGrupos(formatDropDown(res?.data?.row,'NOMBRE','ID_GRUPO'))
            }
        })
        Services.getDepas().then(res=>{
            if(res.status === 200 && res?.data?.row?.length > 0){
                setDepartamentos(formatDropDown(res?.data?.row,'NOMBRE','ID_DEPARTAMENTO'))
            }
        })
        getEmpleados(dispatch)
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
            {field:"ID_EMPLEADO",header:"ID EMPLEADO"},
            {field: "NOMBRE",header: "NOMBRE"},
            {field: "AP_PATERNO", header: "A. PATERNO"},
            {field: "AP_MATERNO", header: "A. MATERNO"},
            {field: "NUM_EMPLEADO", header: "NUM. EMPLEADO"},
            {field: "EMAIL", header: "EMAIL"},
            {field: "TEL", header: "TEL."},
            {field: "ID_GRUPO", header: "GRUPO"},
            {field: "ID_AREA", header: "AREA"},
            {field: "ID_DEPARTAMENTO", header: "DEPARTAMENTO"},
            {field: "PUESTO", header: "PUESTO"},
            {field: "STATUS", header: "STATUS"},
            {header: "Option", body: bodyColum
            }
        ]

  return(
      <div  className={"row"}>
          <div className={"col-md-12"}>
              <Table header ={header} columns ={columns} data ={listData}/>
          </div>
          <Modal
              element = {
              <FormEmpleado toast={toast}
                            arrayList={arrayList}
                            areas={areas}
                            grupos={grupos}
                            departamentos={departamentos}
              />
          }
          />
          <Toast ref={toast} />
          <ConfirmPopup />
      </div>
  )
}

export default PanelEmpleado