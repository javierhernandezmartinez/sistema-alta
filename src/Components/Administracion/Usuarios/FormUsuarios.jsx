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
    axios.get("http://localhost:3100/api/app/system/get/empleados")
        .then(res=> {
            let listData = res?.data?.row?.map(item=>{
                return {
                    id: item.IdEmpleado,
                    nombre: item.Nombre,
                    a_paterno: item.Paterno,
                    a_materno: item.Materno,
                    correo: item.Correo,
                    id_grupo: item.IdGrupo,
                    id_area: item.IdArea,
                    id_depa: item.IdDepto,
                    tipo: item.Tipo,
                    activo: item.Activo
                }

            })
            dispatch(listDataTable(listData))
            dispatch(closeModalForm())
        })
}

const addRegistro = (dispatch, array, props) => {
    axios.post("http://localhost:3100/api/app/system/add/empleado", array)
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
    axios.post("http://localhost:3100/api/app/system/update/empleado", array)
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
        )
        .catch(err=>{
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

const FormUsuarios = (props) => {
    const dispatch = useDispatch()
    const [arrayList, setArrayList] = useState({...props.arrayList})
    const [selectedGrupo, setSelectedGrupo] = useState(null)
    const [selectedArea, setSelectedArea] = useState(null)
    const [selectedActivo, setSelectedActivo] = useState(false)
    console.log("props array", props.arrayList)
    const listEmpleado = [
        { name: 'empleado 1', code: '1' },
        { name: 'empleado 2', code: '2' },
        { name: 'empleado 3', code: '3' },
        { name: 'empleado 4', code: '4' },
        { name: 'empleado 5', code: '5' }
    ];
    const lisTipos = [
        { name: 'tipo 1', code: '1' },
        { name: 'tipo 2', code: '2' },
        { name: 'tipo 3', code: '3' },
        { name: 'tipo 4', code: '4' },
        { name: 'tipo 5', code: '5' }
    ];

    useEffect(()=>{
        setSelectedActivo(props.arrayList.activo === "1")
    },[])
  return(
      <div className={"row row-form"}>
          <div className={"col-md-4"}>
              <div className="input-text">
                  <label>Empleado</label>
                  <Dropdown value={selectedGrupo}
                            onChange={(e) => {
                                setSelectedGrupo(e.value)
                                onChange(e.value?.code,arrayList, setArrayList, "id_grupo")
                            }}
                            options={listEmpleado}
                            optionLabel="name"
                            placeholder="Selecciona una opcion"/>
              </div>
          </div>
        <div className={"col-md-4"}>
          <div className="input-text">
            <label>A. paterno</label>
            <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.a_paterno}
                       onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "a_paterno")}
            />
          </div>
        </div>
        <div className={"col-md-4"}>
          <div className="input-text">
            <label>Foto</label>
            <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.a_materno}
                       onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "a_materno")}
            />
          </div>
        </div>
        <div className={"col-md-4"}>
          <div className="input-text">
            <label>User</label>
            <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.correo}
                       onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "correo")}
            />
          </div>
        </div>
          <div className={"col-md-4"}>
              <div className="input-text">
                  <label>Password</label>
                  <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.correo}
                             onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "correo")}
                  />
              </div>
          </div>

        <div className={"col-md-4"}>
          <div className="input-text">
            <label>Tipo</label>
              <Dropdown value={selectedArea}
                        onChange={(e) => {
                            setSelectedArea(e.value)
                            onChange(e.value?.code,arrayList, setArrayList, "id_area")

                        }}
                        options={lisTipos}
                        optionLabel="name"
                        placeholder="Selecciona una opcion"/>
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

export default FormUsuarios