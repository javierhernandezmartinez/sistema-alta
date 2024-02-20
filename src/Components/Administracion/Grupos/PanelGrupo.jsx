import { Button } from 'primereact/button';
import {useDispatch, useSelector} from "react-redux";
import Table from "../../Table";
import Modal from "../../Modal";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import {useEffect, useRef, useState} from "react";
import {closeModalForm, openModalForm} from "../../../App/Features/rootModalFormSlice";
import FormGrupo from "./FormGrupo";
import {ConfirmPopup, confirmPopup} from "primereact/confirmpopup";
import {Toast} from "primereact/toast";
import Services from "../../../Services/Services";

let defaultArray = {
    ID_GRUPO: null,
    NOMBRE: null,
    STATUS: 1
}
const getGrupos = (dispatch)=>{
    dispatch(listDataTable([]))
    Services.getGrupos().then(res=> {
        if(res.status === 200 && res?.data?.row?.length > 0){
            dispatch(listDataTable(res?.data?.row))
        }
    })
}
const deleteGrupo = (array, toast, dispatch) => {
    Services.deleteGrupo(array).then(res => {
            console.log(res)
        if(res.status === 200) {
            toast.current.show(
                {
                    severity: res.data.message ? 'success' : "error",
                    summary: 'Message',
                    detail: res.data.message ? res.data.message : res.data.errorMessage
                }
            );
            getGrupos(dispatch)
        }

        }
    )
}
const PanelGrupo = (props) => {
    let dispatch = useDispatch()
    let toast= useRef(null);

    const [arrayList, setArrayList] = useState(defaultArray)

    useEffect(()=>{
        // initNegociosList(dispatch, api)
        getGrupos(dispatch)
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
            deleteGrupo(rowData, toast, dispatch)
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
            {field:"ID_GRUPO",header:"ID GRUPO"},
            {field: "NOMBRE",header: "NOMBRE"},
            {field: "STATUS", header: "ESTATUS"},
            {header: "ACCIONES", body: bodyColum}
        ]

  return(
      <div  className={"row"}>
          <div className={"col-md-12"}>
              <Table header ={header} columns ={columns} data ={listData}/>
          </div>
          <Modal
              element = {<FormGrupo toast={toast} arrayList={arrayList}/>}
          />
          <Toast ref={toast} />
          <ConfirmPopup />
      </div>
  )
}

export default PanelGrupo