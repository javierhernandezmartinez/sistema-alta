import { Button } from 'primereact/button';
import {useDispatch, useSelector} from "react-redux";
import Table from "../../Table";
import Modal from "../../Modal";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import {useEffect, useRef, useState} from "react";
import {openModalForm} from "../../../App/Features/rootModalFormSlice";
import {Toast} from "primereact/toast";
import {ConfirmPopup,  confirmPopup} from "primereact/confirmpopup";
import FormCurso from "./FormCurso";
import Services from "../../../Services/Services";

let defaultArray = {
    ID_CURSO:null,
    NOMBRE:null,
    COLOR:null,
    STATUS:1
}
const getCursos = (dispatch)=>{
    Services.getCursos().then(res=> {
        console.log(res)
        dispatch(listDataTable(res?.data?.row))
    })
}

const deleteCurso = (array, toast, dispatch) => {
    Services.deleteCurso(array).then(res => {
            console.log(res)
            toast.current.show(
                {
                    severity: res.data.message ? 'success' : "error",
                    summary: 'Message',
                    detail: res.data.message ? res.data.message : res.data.errorMessage
                }
            );
            getCursos(dispatch)
        }
    )
}

const PanelCurso = (props) => {
    let dispatch = useDispatch()
    let toast= useRef(null);

    const [arrayList, setArrayList] = useState(defaultArray)

    useEffect(()=>{
        // initNegociosList(dispatch, api)
        getCursos(dispatch)
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
            deleteCurso(rowData, toast, dispatch)
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
    const bodyColor=(rowData)=>{
     return <label style={{color: `#${rowData.COLOR}`}}>{rowData.COLOR}</label>
    }
    const bodyStatus=(rowData)=>{
        return <label style={{color: `${rowData.STATUS === 1 ? 'green' : 'red'}`}}>{rowData.STATUS}</label>
    }

    const columns =
        [
            {field:"ID_CURSO",header:"ID CURSO"},
            {field: "NOMBRE",header: "NOMBRE"},
            {field: "COLOR", header: "COLOR", body: bodyColor},
            {field: "STATUS", header: "ESTATUS", body: bodyStatus},
            {header: "Option", body: bodyColum
            }
        ]



    return(
        <div  className={"row"}>
            <div className={"col-md-12"}>
                <Table header ={header} columns ={columns} data ={listData}/>
            </div>
            <Modal
                element = {<FormCurso toast={toast} arrayList={arrayList}/>}
            />
            <Toast ref={toast} />
            <ConfirmPopup />
        </div>
    )
}

export default PanelCurso