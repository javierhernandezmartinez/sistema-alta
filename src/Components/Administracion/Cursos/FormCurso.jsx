import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {InputSwitch} from "primereact/inputswitch";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {closeModalForm} from "../../../App/Features/rootModalFormSlice";
import axios from "axios";
import {listDataTable} from "../../../App/Features/AdministrationSlice";

const onChange = (e,arrayList, setArrayList, campo) => {
    arrayList[campo] = e
    setArrayList(arrayList)
}
const getListEmpleados = (dispatch)=>{
    axios.get("http://localhost:3100/api/app/system/get/cursos")
        .then(res=> {
            let listData = res?.data?.row?.map(item=>{
                return {
                    id:item.idCurso,
                    nom_curso:item.NomCurso,
                    nom_capacita:item.NomCapacita,
                    activo:item.Activo,
                    fecha_ini:item.FechaIni,
                    fecha_fin:item.FechaFin,
                    hora_ini:item.HoraIni,
                    hora_fin:item.HoraFin,
                    dia_sem:item.DiasSemana,
                    limit_par:item.LimitePar,
                    limit_esp:item.LimiteEsp,
                    empresa:item.Empresa,
                    lugar:item.Lugar,
                    sala:item.Sala,
                    color:item.Color,
                    liga:item.Liga
                }

            })
            dispatch(listDataTable(listData))
            dispatch(closeModalForm())
        }).catch(err=>{
        console.log(err)
    })
}

const addRegistro = (dispatch, array, props) => {
    axios.post("http://localhost:3100/api/app/system/add/curso", array)
        .then(res => {
                console.log(res)
                props.toast.current.show(
                    {
                        severity: res.data.message ? 'success' : "error",
                        summary: 'Message',
                        detail: res.data.message ? res.data.message : res.data.errorMessage }
                );
                getListEmpleados(dispatch)
            }
        ).catch(err=>{
        console.log(err)
    })
}
const updateRegistro = (dispatch, array, props) => {
    axios.post("http://localhost:3100/api/app/system/update/curso", array)
        .then(res => {
                console.log(res)
                props.toast.current.show(
                    {
                        severity: res.data.message ? 'success' : "error",
                        summary: 'Message',
                        detail: res.data.message ? res.data.message : res.data.errorMessage }
                );
                getListEmpleados(dispatch)
            }
        ).catch(err=>{
        console.log(err)
    })
}
const onSaveModal = (dispatch, array, props) => {
    console.log("POST JSON::",array)
    if (array.id){
        updateRegistro(dispatch, array, props)
    }else {
        addRegistro(dispatch, array, props)
    }
}
const onCloseModal = (dispatch) => {
    dispatch(closeModalForm())
}

const searchOption = (array, valor) => {
    let option = array.filter(item => item.code === valor)
    console.log(option)
    return option[0]
}

const FormCurso = (props) => {
    const dispatch = useDispatch()
    const [arrayList, setArrayList] = useState({...props.arrayList})
    const [selectedGrupo, setSelectedGrupo] = useState(null)
    const [selectedArea, setSelectedArea] = useState(null)
    const [selectedDepa, setSelectedDepa] = useState(null)
    const [selectedTipo, setSelectedTipo] = useState(null)
    const [selectedActivo, setSelectedActivo] = useState(false)
    console.log("props array", props.arrayList)
    const listGrupo = [
        { name: 'grupo 1', code: '1' },
        { name: 'grupo 2', code: '2' },
        { name: 'grupo 3', code: '3' },
        { name: 'grupo 4', code: '4' },
        { name: 'grupo 5', code: '5' }
    ];
    const listArea = [
        { name: 'area 1', code: '1' },
        { name: 'area 2', code: '2' },
        { name: 'area 3', code: '3' },
        { name: 'area 4', code: '4' },
        { name: 'area 5', code: '5' }
    ];
    const listDepa = [
        { name: 'depa 1', code: '1' },
        { name: 'depa 2', code: '2' },
        { name: 'depa 3', code: '3' },
        { name: 'depa 4', code: '4' },
        { name: 'depa 5', code: '5' }
    ];
    const lisTipos = [
        { name: 'tipo 1', code: '1' },
        { name: 'tipo 2', code: '2' },
        { name: 'tipo 3', code: '3' },
        { name: 'tipo 4', code: '4' },
        { name: 'tipo 5', code: '5' }
    ];

    useEffect(()=>{
        setSelectedGrupo(searchOption(listGrupo, props.arrayList.id_grupo))
        setSelectedArea(searchOption(listArea, props.arrayList.id_area))
        setSelectedDepa(searchOption(listDepa, props.arrayList.id_depa))
        setSelectedTipo(searchOption(lisTipos, props.arrayList.tipo))
        setSelectedActivo(props.arrayList.activo === "1")
    },[])
    return(
        <div className={"row row-form"}>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Nombre Curso</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.nombre}
                               onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "nombre")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Nombre Capacitador</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.a_paterno}
                               onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "a_paterno")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Fecha inicio</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.a_materno}
                               onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "a_materno")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Fecha fin</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.correo}
                               onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "correo")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Hora inicio</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.correo}
                               onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "correo")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Hora fin</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.correo}
                               onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "correo")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Dias de la semana</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.correo}
                               onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "correo")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Limite participantes</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.correo}
                               onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "correo")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Limite en espera</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.correo}
                               onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "correo")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Empresa</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.correo}
                               onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "correo")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Lugar</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.correo}
                               onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "correo")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Sala</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.correo}
                               onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "correo")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Color</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.correo}
                               onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "correo")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Liga</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.correo}
                               onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "correo")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Activo</label>
                    <InputSwitch checked={selectedActivo} onChange={(e) => {
                        setSelectedActivo(e.value)
                        onChange(e.value ? "1" : "0" ,arrayList, setArrayList, "activo")
                    }}/>
                </div>
            </div>
            <div className={"col-md-12"}>
                <div className="modal-footer">
                    <Button label={"Cancelar"} onClick={()=>onCloseModal(dispatch, arrayList)}/>
                    <Button label={"Guardar"} onClick={(e)=> {
                        onSaveModal(dispatch, arrayList, props)
                    }}/>
                </div>
            </div>
        </div>
    )
}

export default FormCurso