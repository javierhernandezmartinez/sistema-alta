import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {InputSwitch} from "primereact/inputswitch";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {closeModalForm} from "../../../App/Features/rootModalFormSlice";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import {InputNumber} from "primereact/inputnumber";
import {Calendar} from "primereact/calendar";
import Services from "../../../Services/Services";
import moment from 'moment';
moment().format("YYYY-MM-DD");
moment.locale()
const FormProgramacion = (props) => {
    const dispatch = useDispatch()
    const [arrayList, setArrayList] = useState({...props.arrayList})

    const onChange = (e,campo) => {
        arrayList[campo] = e
        setArrayList({...arrayList})
        console.log(arrayList)
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
                props.toast.current.show(
                    {
                        severity: res.data.message ? 'success' : "error",
                        summary: 'Message',
                        detail: res.data.message ? res.data.message : res.data.errorMessage }
                );
                getProgramaciones()
            }
        )
    }
    const updateProgramacion = () => {
        Services.updateProgramacion(arrayList).then(res => {
                console.log(res)
                props.toast.current.show(
                    {
                        severity: res.data.message ? 'success' : "error",
                        summary: 'Message',
                        detail: res.data.message ? res.data.message : res.data.errorMessage }
                );
                getProgramaciones()
            }
        )
    }
    const onSaveModal = () => {
        console.log("POST JSON::",arrayList)
        if (arrayList.ID_PROGRAMACION){
            updateProgramacion()
        }else {
            addProgramacion()
        }
    }
    const onCloseModal = () => {
        dispatch(closeModalForm())
    }
    useEffect(()=>{
    },[])
    return(
        <div className={"row row-form"}>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Impartidor</label>
                    <Dropdown value={props.selectedEmpleado}
                              onChange={(e) => {
                                  props.setSelectedEmpleado(e.value)
                                  onChange(e.value?.code, "ID_EMPLEADO")
                              }}
                              options={props.empleados}
                              optionLabel="name"
                              placeholder="Selecciona una opcion"
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Curso</label>
                    <Dropdown value={props.selectedCurso}
                              onChange={(e) => {
                                  props.setSelectedCurso(e.value)
                                  onChange(e.value?.code, "ID_CURSO")
                              }}
                              options={props.cursos}
                              optionLabel="name"
                              placeholder="Selecciona una opcion"
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Lim. participantes</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.LIM_PARTICIPANTES}
                               onChange={(e)=>onChange(e.target.value,"LIM_PARTICIPANTES")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Lim. espera</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.LIM_ESPERA}
                               onChange={(e)=>onChange(e.target.value, "LIM_ESPERA")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Empresa</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.EMPRESA}
                               onChange={(e)=>onChange(e.target.value, "EMPRESA")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Lugar</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.LUGAR}
                               onChange={(e)=>onChange(e.target.value, "LUGAR")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Sala</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.SALA}
                               onChange={(e)=>onChange(e.target.value, "SALA")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Liga</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.LIGA}
                               onChange={(e)=>onChange(e.target.value, "LIGA")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Fecha inicio</label>
                    <Calendar value={arrayList.F_INICIO}
                              onChange={(e) => {
                                  onChange(moment(new Date(e.value)).format("YYYY-MM-DD"), "F_INICIO")
                              }}
                              dateFormat={"yy-mm-dd"}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Fecha fin</label>
                    <Calendar value={arrayList.F_FIN}
                              onChange={(e) => {
                                  console.log(moment(new Date(e.value)).format())
                                  onChange(moment(new Date(e.value)).format("YYYY-MM-DD"), "F_FIN")
                              }}
                              dateFormat={"yy-mm-dd"}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Hora inicio</label>
                    <Calendar value={arrayList.H_INICIO}
                              onChange={(e) => {
                                  onChange(new Date(e.value).toLocaleTimeString(), "H_INICIO")
                              }}
                              showTime
                              hourFormat="24"
                              timeOnly={true}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Hora fin</label>
                    <Calendar value={arrayList.H_FIN}
                              onChange={(e) => {
                                  onChange(new Date(e.value).toLocaleTimeString(), "H_FIN")
                              }}
                              showTime
                              hourFormat="24"
                              timeOnly={true}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Estatus</label>
                    <InputSwitch checked={arrayList.STATUS === 1} onChange={(e) => {
                        onChange(e.value ? 1 : 0 , "STATUS")
                    }}/>
                </div>
            </div>
            <div className={"col-md-12"}>
                <div className="modal-footer">
                    <Button label={"Cancelar"} onClick={()=>onCloseModal()}/>
                    <Button label={"Guardar"} onClick={(e)=> {
                        onSaveModal()
                    }}/>
                </div>
            </div>
        </div>
    )
}

export default FormProgramacion