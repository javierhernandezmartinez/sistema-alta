import { Button } from 'primereact/button';
import {useDispatch, useSelector} from "react-redux";
import Table from "../../Table";
import Modal from "../../Modal";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import {useEffect, useRef, useState} from "react";
import {openModalForm} from "../../../App/Features/rootModalFormSlice";
import {Toast} from "primereact/toast";
import {ConfirmPopup,  confirmPopup} from "primereact/confirmpopup";
import FormProgramacion from "./FormProgramacion";
import Services from "../../../Services/Services";
import moment from 'moment';


let defaultArray = {
    ID_PROGRAMACION: null,
    ID_EMPLEADO: null,
    ID_CURSO: null,
    LIM_PARTICIPANTES: null,
    LIM_ESPERA: null,
    EMPRESA: null,
    LUGAR: null,
    SALA: null,
    LIGA: null,
    F_INICIO: null,
    F_FIN: null,
    ALL_DAY: false,
    STATUS: 1
}
const getProgramaciones = (dispatch)=>{
    Services.getProgramaciones().then(res=> {
        console.log(res)
        let data = []
        if(res.status === 200){
            if(res?.data?.row?.length > 0){
                data = res?.data?.row.map(item=>{
                    return {
                        ...item,
                        F_INICIO: moment(item.F_INICIO).format("YYYY-MM-DD"),
                        F_FIN: moment(item.F_FIN).format("YYYY-MM-DD")
                    }
                })
            }
        }
        dispatch(listDataTable(data))
    })
        
}

const deleteProgramcion = (array, toast, dispatch) => {
    Services.deleteProgramacion(array).then(res => {
            console.log(res)
            toast.current.show(
                {
                    severity: res.data.message ? 'success' : "error",
                    summary: 'Message',
                    detail: res.data.message ? res.data.message : res.data.errorMessage
                }
            );
            getProgramaciones(dispatch)
        }
    )

}

const PanelProgramacion = (props) => {
    let dispatch = useDispatch()
    let toast= useRef(null);
    const [empleados, setEmpleados] = useState([])
    const [selectedEmpleado, setSelectedEmpleado] = useState(null)
    const [cursos, setCursos] = useState([])
    const [selectedCurso, setSelectedCurso] = useState(null)

    const [arrayList, setArrayList] = useState({...defaultArray})

    const formatDropDown = (list, name, code) => {
        return list.map(item=>{return {name: `${item[code]} - ${item[name]}`,code: item[code]}})
    }
    useEffect(()=>{
        getProgramaciones(dispatch)
        Services.getEmpleados().then(res=> {
            setEmpleados(formatDropDown(res?.data?.row,'NOMBRE','ID_EMPLEADO'))
        })
        Services.getCursos().then(res=> {
            setCursos(formatDropDown(res?.data?.row,'NOMBRE','ID_CURSO'))
        })
    },[])

    const listData = useSelector(state => state.rootAdmin.listDataTableReducer)

    const header = <div className="table-header">
        <span className="table-title">{props.title}</span>
        <Button icon="pi pi-plus" label="Nuevo" severity="help" outlined className="button-plus"
                onClick={()=> {
                    setArrayList({...defaultArray})
                    setSelectedEmpleado(null)
                    setSelectedCurso(null)
                    dispatch(openModalForm())
                }}
        />
    </div>
    const searchOption = (array, valor) => {
        let option = array.filter(item => item.code === valor)
        return option[0]
    }
    const bodyColum=(rowData) => {
        const accept = () => {
            deleteProgramcion(rowData, toast, dispatch)
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
                            Services.getProgramacion({ID_PROGRAMACION : rowData.ID_PROGRAMACION}).then(res=>{
                                console.log(res)
                                setArrayList(res?.data?.row[0])
                                setSelectedEmpleado(searchOption(empleados, res?.data?.row[0].ID_EMPLEADO))
                                setSelectedCurso(searchOption(cursos, res?.data?.row[0].ID_CURSO ))
                                dispatch(openModalForm())
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
            {field:"ID_PROGRAMACION",header:"ID"},
            {field: "CAPACITADOR",header: "CAPACITADOR"},
            {field: "CURSO", header: "CURSO"},
            {field: "F_INICIO", header: "F. INICIO"},
            {field: "F_FIN", header: "F. FIN"},
            {field: "H_INICIO", header: "H. INICIO"},
            {field: "H_FIN", header: "H. FIN"},
            {field: "LIM_PARTICIPANTES", header: "LIM. PARTICIPANTES"},
            {field: "LIM_ESPERA", header: "LIM. ESPERA"},
            {field: "EMPRESA", header: "EMPRESA"},
            {field: "LUGAR", header: "LUGAR"},
            {field: "SALA", header: "SALA"},
            {field: "LIGA", header: "LIGA"},
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
                <FormProgramacion
                    toast={toast}
                    arrayList={arrayList}
                    empleados = {empleados}
                    selectedEmpleado = {selectedEmpleado}
                    setSelectedEmpleado = {setSelectedEmpleado}
                    cursos = {cursos}
                    selectedCurso = {selectedCurso}
                    setSelectedCurso = {setSelectedCurso}
                />
            }
            />
            <Toast ref={toast} />
            <ConfirmPopup />
        </div>
    )
}

export default PanelProgramacion