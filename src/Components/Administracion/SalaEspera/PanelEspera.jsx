import { Button } from 'primereact/button';
import {useDispatch, useSelector} from "react-redux";
import Table from "../../Table";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import {useEffect, useRef, useState} from "react";
import {Toast} from "primereact/toast";
import {ConfirmPopup,  confirmPopup} from "primereact/confirmpopup";
import Services from "../../../Services/Services";
import {IoArrowRedo} from "react-icons/io5";

const getSalaEspera = (dispatch)=>{
    dispatch(listDataTable([]))
    Services.getSalaEspera().then(res=> {
        console.log("Sala espera ", res)
        if(res.status === 200 && res?.data?.row?.length > 0){
            dispatch(listDataTable(res?.data?.row))
        }
    })
}

const PanelEspera = (props) => {
    let dispatch = useDispatch()
    let toast= useRef(null);

    useEffect(()=>{
        getSalaEspera(dispatch)
    },[])

    const listData = useSelector(state => state.rootAdmin.listDataTableReducer)

    const header = <div className="table-header">
                                <span className="table-title">{props.title}</span>
                            </div>
    const bodyColum=(rowData) => {
        const acceptDelete = () => {
            Services.deleteSalaEspera({ID_ESPERA: rowData.ID}).then(res => {
                    console.log(res)
                    if(res.status === 200) {
                        toast.current.show(
                            {
                                severity: res.data.message ? 'success' : "error",
                                summary: 'Message',
                                detail: res.data.message ? res.data.message : res.data.errorMessage
                            }
                        );
                        getSalaEspera(dispatch)
                    }

                }
            )
        }
        const acceptSubbmit = () => {
            //deleteUsuario(rowData, toast, dispatch)
            Services.addInscripcion(
                {
                    ID_USUARIO: rowData.ID_USUARIO,
                    ID_PROGRAMACION: rowData.PROGRAMACION
                }
            )
                .then(res=>{
                    console.log(res)
                    if(res?.status === 200){

                        if (res?.data?.message && res?.data?.message === 'TE HAS INSCRITO A UN NUEVO CURSO'){
                            toast.current.show(
                                {
                                    severity: 'success',
                                    summary: 'Message',
                                    detail: res.data.message }
                            );
                        }else{
                            toast.current.show(
                                {
                                    severity: res.data.message ? 'info' : "error",
                                    summary: 'Message',
                                    detail: res.data.message ? res.data.message : res.data.errorMessage }
                            );
                        }

                        getSalaEspera(dispatch)
                    }
                })
        };

        const reject = () => {
            toast.current.show({ severity: 'warn', summary: 'Denegado', detail: 'Proceso denegado', life: 3000 });
        };

        return(
            <div className={"list-option-button"}>
                <Button icon={<IoArrowRedo />} severity="help" outlined className="button-plus" tooltip="Enviar"
                        tooltipOptions={{position: 'top'}}
                        onClick={(event)=>{
                            let name = <span style={{fontWeight: 600}}>{rowData.USUARIO}</span>
                            confirmPopup({
                                target: event.currentTarget,
                                message: <label>Enviar a {name}  a sala de incripción.</label>,
                                icon: 'pi pi-info-circle',
                                acceptClassName: 'p-button-danger',
                                acceptLabel: "Si",
                                rejectLabel: "No",
                                accept : acceptSubbmit,
                                reject
                            });
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
                                accept: acceptDelete,
                                reject
                            });
                        }}
                />
            </div>
        )
    }

    const columns =
        [
            {field: "ID",header:"ID"},
            {field: "NUM_EMPLEADO", header: "NUM. EMPLEADO USUARIO"},
            {field: "USUARIO", header: "USUARIO"},
            {field: "PROGRAMACION",header: "PROGRAMACION"},
            {field: "CURSO",header: "CURSO"},
            {field: "CAPACITADOR", header: "CAPACITADOR"},
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

export default PanelEspera