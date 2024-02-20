import { Button } from 'primereact/button';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import Table from "../../Table";
import FormUsuarios from "./FormUsuarios";
import Modal from "../../Modal";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import {useEffect, useRef, useState} from "react";
import {openModalForm} from "../../../App/Features/rootModalFormSlice";
import {Toast} from "primereact/toast";
import {ConfirmPopup,  confirmPopup} from "primereact/confirmpopup";
import Services from "../../../Services/Services";

let defaultArray = {
    ID_USUARIO: null,
    ID_EMPLEADO: null,
    FOTO: null,
    USER: null,
    PASS: null,
    TIPO: 'Normal',
    STATUS: 1
}
const getUsuarios = (dispatch)=>{
    Services.getUsuarios().then(res=> {
        console.log(res)
        if(res.status === 200 && res?.data?.row?.length > 0){
            dispatch(listDataTable(res?.data?.row))
        }
    })
}


const deleteUsuario = (array, toast, dispatch) => {
    Services.deleteUsuario(array).then(res => {
            console.log(res)
        if(res.status === 200) {
            toast.current.show(
                {
                    severity: res.data.message ? 'success' : "error",
                    summary: 'Message',
                    detail: res.data.message ? res.data.message : res.data.errorMessage
                }
            );
            getUsuarios(dispatch)
        }

        }
    )
}

const PanelUsuario = (props) => {
    let dispatch = useDispatch()
    let toast= useRef(null);
    const [empleados, setEmpleados] = useState([])
    const [selectedEmpleado, setSelectedEmpleado] = useState(null)
    const [arrayList, setArrayList] = useState(defaultArray)

    useEffect(()=>{
        getUsuarios(dispatch)
        Services.getEmpleados().then(res=> {
            if(res.status === 200 && res?.data?.row?.length > 0){
                setEmpleados(formatDropDown(res?.data?.row,'NOMBRE','ID_EMPLEADO'))
            }
        })
    },[])

    const listData = useSelector(state => state.rootAdmin.listDataTableReducer)

    const header = <div className="table-header">
                                <span className="table-title">{props.title}</span>
                                <Button icon="pi pi-plus" label="Nuevo" severity="help" outlined className="button-plus"
                                        onClick={()=> {
                                            setSelectedEmpleado([])
                                            setArrayList(defaultArray)
                                            dispatch(openModalForm())
                                        }}
                                />
                            </div>
    const formatDropDown = (list, name, code) => {
        list = list.map(item=>{
            return {
                NUM_EMPLEADO:item.NUM_EMPLEADO,
                name: `${item[code]} - ${item[name]}`,
                code: item[code]
            }
        })
        return list
    }
    const searchOption = (array, valor) => {
        let option = array.filter(item => item.code === valor)
        return option[0]
    }
    const bodyColum=(rowData) => {
        const accept = () => {
            deleteUsuario(rowData, toast, dispatch)
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
                            Services.getUsuario({ID_USUARIO : rowData.ID_USUARIO}).then(res=>{
                                console.log(res)
                                if(res.status === 200 && res?.data?.row?.length > 0) {
                                    setSelectedEmpleado(searchOption(empleados, rowData.ID_EMPLEADO))
                                    setArrayList(res?.data?.row[0])
                                    dispatch(openModalForm())
                                }
                            })
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
            {field: "ID_USUARIO",header:"ID USUARIO"},
            {field: "ID_EMPLEADO",header: "ID EMPLEADO"},
            {field: "NOMBRE", header: "NOMBRE"},
            {field: "AP_PATERNO", header: "AP. PATERNO"},
            {field: "AP_MATERNO", header: "AP. MATERNO"},
            {field: "USER", header: "USUARIO"},
            {field: "TIPO", header: "TIPO"},
            {field: "STATUS", header: "STATUS"},
            {header: "Option", body: bodyColum}
        ]



  return(
      <div  className={"row"}>
          <div className={"col-md-12"}>
              <Table header ={header} columns ={columns} data ={listData}/>
          </div>
          <Modal
              element = {
              <FormUsuarios toast={toast}
                            arrayList={arrayList}
                            empleados={empleados}
                            selectedEmpleado={selectedEmpleado}
                            setSelectedEmpleado={setSelectedEmpleado}
              />}
          />
          <Toast ref={toast} />
          <ConfirmPopup />
      </div>
  )
}

export default PanelUsuario