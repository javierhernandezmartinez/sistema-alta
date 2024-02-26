import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {closeModalForm} from "../../../App/Features/rootModalFormSlice";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import Services from "../../../Services/Services";
import moment from 'moment';
import InputTypeSelect from "../../InputTypeSelect";
import InputTypeText from "../../InputTypeText";
import InputTypeSwitch from "../../InputTypeSwitch";
import InputTypeButton from "../../InputTypeButton";
import InputTypeDate from "../../InputTypeDate";
import InputTypeNumber from "../../InputTypeNumber";
const FormProgramacion = (props) => {
    const dispatch = useDispatch()
    const [arrayList, setArrayList] = useState({...props.arrayList})
    const [message, setMessage] = useState(null);
    const onChange = (e,campo) => {
        console.log(e)
        arrayList[campo] = e
        setArrayList({...arrayList})
        console.log(arrayList)
        setMessage(null)
    }
    const getProgramaciones = ()=>{
        Services.getProgramaciones().then(res=> {
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
            dispatch(closeModalForm())
        })

    }

    const addProgramacion = () => {
        Services.addProgramacion(arrayList).then(res => {
                console.log(res)
            if(res.status === 200) {
                props.toast.current.show(
                    {
                        severity: res.data.message ? 'success' : "error",
                        summary: 'Message',
                        detail: res.data.message ? res.data.message : res.data.errorMessage }
                );
                getProgramaciones()

            }
            }
        )
    }
    const updateProgramacion = () => {
        Services.updateProgramacion(arrayList).then(res => {
                console.log(res)
            if(res.status === 200) {
                props.toast.current.show(
                    {
                        severity: res.data.message ? 'success' : "error",
                        summary: 'Message',
                        detail: res.data.message ? res.data.message : res.data.errorMessage }
                );
                getProgramaciones()
            }

            }
        )
    }
    const onSaveModal = () => {
        console.log("POST JSON::",arrayList)
        if( !arrayList.ID_EMPLEADO ||
            !arrayList.ID_CURSO ||
            !arrayList.LIM_PARTICIPANTES ||
            !arrayList.LIM_ESPERA ||
            !arrayList.EMPRESA ||
            !arrayList.F_INICIO ||
            !arrayList.F_FIN ||
            !arrayList.H_INICIO ||
            !arrayList.H_FIN
        ){
            setMessage("Llene los campos importantes.!")
        }else {
            if (arrayList.ID_PROGRAMACION) {
                updateProgramacion()
            } else {
                addProgramacion()
            }
        }
    }
    const onCloseModal = () => {
        dispatch(closeModalForm())
    }
    useEffect(()=>{
    },[])
    return(
        <div className={"row row-form"}>
            <div className={"col-sm-6 col-md-4"}>
                <InputTypeSelect
                    title={"Impartidor *"}
                    value={props.selectedEmpleado}
                    onChange={(e) => {
                        props.setSelectedEmpleado(e.value)
                        onChange(e.value?.code, "ID_EMPLEADO")
                    }}
                    options={props.empleados}
                    important={message}
                />
            </div>
            <div className={"col-sm-6 col-md-4"}>
                <InputTypeSelect
                    title={"Curso *"}
                    value={props.selectedCurso}
                    onChange={(e) => {
                        props.setSelectedCurso(e.value)
                        onChange(e.value?.code, "ID_CURSO")
                    }}
                    options={props.cursos}
                    important={message}
                />
            </div>
            <div className={"col-sm-6 col-md-4"}>
                <InputTypeNumber
                    title={"Lim. participantes *"}
                    value={arrayList.LIM_PARTICIPANTES}
                    onChange={(e)=>onChange(e.value,"LIM_PARTICIPANTES")}
                    placeholder={"lim. participntes"}
                    important={message}
                    />
            </div>
            <div className={"col-sm-6 col-md-4"}>
                <InputTypeNumber
                    title={"Lim. espera *"}
                    value={arrayList.LIM_ESPERA}
                    onChange={(e)=>onChange(e.value, "LIM_ESPERA")}
                    placeholder={"lim. espera"}
                    important={message}
                />
            </div>
            <div className={"col-sm-6 col-md-4"}>
                <InputTypeText
                    title={"Empresa *"}
                    defaultValue={arrayList.EMPRESA}
                    onChange={(e)=>onChange(e.target.value, "EMPRESA")}
                    important={message}
                />
            </div>
            <div className={"col-sm-6 col-md-4"}>
                <InputTypeText
                    title={"Lugar"}
                    defaultValue={arrayList.LUGAR}
                    onChange={(e)=>onChange(e.target.value, "LUGAR")}
                />
            </div>
            <div className={"col-sm-6 col-md-4"}>
                <InputTypeText
                    title={"Sala"}
                    defaultValue={arrayList.SALA}
                    onChange={(e)=>onChange(e.target.value, "SALA")}
                />
            </div>
            <div className={"col-sm-6 col-md-4"}>
                <InputTypeText
                    title={"Liga"}
                    defaultValue={arrayList.LIGA}
                    onChange={(e)=>onChange(e.target.value, "LIGA")}
                />
            </div>
            <div className={"col-sm-6 col-md-4"}>
                <InputTypeDate
                    title={"Fecha inicio *"}
                    /*value={moment(new Date(arrayList.F_INICIO)).isUTC()}*/
                    value={new Date(`${arrayList.F_INICIO}T06:00:00.000Z`)}
                    onChange={(e) => {
                        console.log(moment(new Date(e.value)).format("YYYY-MM-DD"))
                        onChange(moment(new Date(e.value)).format("YYYY-MM-DD"), "F_INICIO")
                    }}
                    dateFormat={"yy-mm-dd"}
                    important={message}
                    />
            </div>
            <div className={"col-sm-6 col-md-4"}>
                <InputTypeDate
                    title={"Fecha fin *"}
                    value={ new Date(`${arrayList.F_FIN}T06:00:00.000Z`)}
                    onChange={(e) => {
                        console.log(moment(new Date(e.value)).format("YYYY-MM-DD"))
                        onChange(moment(new Date(e.value)).format("YYYY-MM-DD"), "F_FIN")
                    }}
                    dateFormat={"yy-mm-dd"}
                    important={message}

                    />
            </div>
            <div className={"col-sm-6 col-md-4"}>
                <InputTypeDate
                    title={"Hora inicio *"}
                    value={arrayList.H_INICIO ?
                        new Date(`${moment(new Date()).format("YYYY-MM-DD")},${arrayList.H_INICIO}`) :
                        null
                }
                    onChange={(e) => {
                        onChange(new Date(e.value).toLocaleTimeString(), "H_INICIO")
                    }}
                    showTime={true}
                    hourFormat="24"
                    timeOnly={true}
                    important={message}
                    />
            </div>
            <div className={"col-sm-6 col-md-4"}>
                <InputTypeDate
                    title={"Hora fin *"}
                    value={arrayList.H_FIN ?
                        new Date(`${moment(new Date()).format("YYYY-MM-DD")},${arrayList.H_FIN}`) :
                        null}
                    onChange={(e) => {
                        console.log(e.value)
                        onChange(new Date(e.value).toLocaleTimeString(), "H_FIN")
                    }}
                    showTime={true}
                    hourFormat="24"
                    timeOnly={true}
                    important={message}
                />
            </div>
            <div className={"col-sm-6 col-md-4"}>
                <InputTypeSwitch
                    title={"Estatus"}
                    checked={arrayList.STATUS === 1}
                    onChange={(e) => {
                        onChange(e.value ? 1 : 0 , "STATUS")
                    }}
                />
            </div>
            <div className={"col-md-12"}>
                <div className={"row"} style={{justifyContent: "right"}}>
                    {
                        message ?
                            <div className={"col-md-12"}>
                                <label style={{color: "#ef4444"}}>{message}</label>
                            </div>
                            : null
                    }
                    <div className={"col-6 col-sm-auto col-md-auto"}>
                        <InputTypeButton
                            icon={"pi pi-times"}
                            label={"Cancelar"}
                            onClick={()=>onCloseModal()}
                        />
                    </div>
                    <div className={"col-6 col-sm-auto col-md-auto"}>
                        <InputTypeButton
                            icon={"pi pi-check"}
                            label={"Guardar"}
                            onClick={(e)=> {
                                onSaveModal()
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormProgramacion