import { Button } from 'primereact/button';
import {useDispatch, useSelector} from "react-redux";
import Table from "../../Table";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import {useEffect, useRef, useState} from "react";
import {Toast} from "primereact/toast";
import {ConfirmPopup,  confirmPopup} from "primereact/confirmpopup";
import Services from "../../../Services/Services";

const getInscripciones = (dispatch)=>{
    dispatch(listDataTable([]))
    Services.getIncripciones().then(res=> {
        console.log("incripciones: ",res)
        if(res.status === 200 && res?.data?.row?.length > 0) {
            dispatch(listDataTable(res?.data?.row))
        }
    })
}


const deleteInscripcion = (array, toast, dispatch) => {
    Services.deleteInscripcion({ID_INSCRIPCION: array.ID_INSCRIPCION}).then(res => {
            console.log(res)
        if(res.status === 200) {
            toast.current.show(
                {
                    severity: res.data.message ? 'success' : "error",
                    summary: 'Message',
                    detail: res.data.message ? res.data.message : res.data.errorMessage
                }
            );
            getInscripciones(dispatch)
        }

        }
    )
}

const PanelInscripciones = (props) => {
    let dispatch = useDispatch()
    let toast= useRef(null);

    useEffect(()=>{
        getInscripciones(dispatch)
    },[])

    const listData = useSelector(state => state.rootAdmin.listDataTableReducer)

    const header = <div className="table-header">
                                <span className="table-title">{props.title}</span>
                            </div>
    const bodyColum=(rowData) => {
        const accept = () => {
            deleteInscripcion(rowData, toast, dispatch)
        };

        const reject = () => {
            toast.current.show({ severity: 'warn', summary: 'Denegado', detail: 'Proceso denegado', life: 3000 });
        };

        return(
            <div className={"list-option-button"}>
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
            {field: "ID_INSCRIPCION",header:"ID"},
            {field: "ID_PROGRAMACION",header: "PROGRAMACION"},
            {field: "CURSO",header: "CURSO"},
            {field: "NUM_EMPLEADO", header: "NUM. EMPLEADO"},
            {field: "USUARIO", header: "USUARIO"},
            {field: "ID_PROGRAMACION", header: "CAPACITADOR"},
            {header: "Option", body: bodyColum}
        ]

  return(
      <div  className={"row"}>
          <div className={"col-md-12"}>
              <Table header ={header} columns ={columns} data ={listData}/>
          </div>
          <Toast ref={toast} />
          <ConfirmPopup />
      </div>
  )
}

export default PanelInscripciones