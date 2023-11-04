import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {InputSwitch} from "primereact/inputswitch";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {closeModalForm} from "../../../App/Features/rootModalFormSlice";
import axios from "axios";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import Services from "../../../Services/Services";

const onChange = (e,arrayList, setArrayList, campo) => {
    arrayList[campo] = e
    setArrayList(arrayList)
    console.log(arrayList)
}
const getEmpleados = (dispatch)=>{
    Services.getEmpleados().then(res=> {
        dispatch(listDataTable(res?.data?.row))
        dispatch(closeModalForm())
    })
        
}

const addEmpleado = (dispatch, array, props) => {
    Services.addEmpleado(array).then(res => {
            console.log(res)
            props.toast.current.show(
                {
                    severity: res.data.message ? 'success' : "error",
                    summary: 'Message',
                    detail: res.data.message ? res.data.message : res.data.errorMessage }
            );
            getEmpleados(dispatch)
        }
    )
}
const updateEmpleado = (dispatch, array, props) => {
    Services.updateEmpleado(array).then(res => {
            console.log(res)
            props.toast.current.show(
                {
                    severity: res.data.message ? 'success' : "error",
                    summary: 'Message',
                    detail: res.data.message ? res.data.message : res.data.errorMessage }
            );
            getEmpleados(dispatch)
        }
    )
}
const onSaveModal = (dispatch, array, props) => {
    console.log("POST JSON::",array)
    if (array.ID_EMPLEADO){
        updateEmpleado(dispatch, array, props)
    }else {
        addEmpleado(dispatch, array, props)
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

const FormEmpleado = (props) => {
    const dispatch = useDispatch()
    const [arrayList, setArrayList] = useState({...props.arrayList})
    const [selectedGrupo, setSelectedGrupo] = useState(null)
    const [selectedArea, setSelectedArea] = useState(null)
    const [selectedDepa, setSelectedDepa] = useState(null)
    const [selectedTipo, setSelectedTipo] = useState(null)
    const [selectedActivo, setSelectedActivo] = useState(false)
    const [areas, setAreas] = useState([])
    const [grupos, setGrupos] = useState([])
    const [departamentos, setDepartamentos] = useState([])
    console.log("props array", props.arrayList)

    const formatDropDown = (list, name, code) => {
      list = list.map(item=>{
          return {
              name: item[name],
              code: item[code]
          }
      })
        return list
    }

    useEffect(()=>{
        setSelectedGrupo(searchOption(grupos, props.arrayList.ID_GRUPO))
        setSelectedArea(searchOption(areas, props.arrayList.ID_AREA))
        setSelectedDepa(searchOption(departamentos, props.arrayList.ID_DEPARTAMENTO))
        setSelectedActivo(props.arrayList.STATUS === 1)
        Services.getAreas().then(res=>{
            setAreas(formatDropDown(res?.data?.row,'NOMBRE','ID_AREA'))
        })
        Services.getGrupos().then(res=>{
            setGrupos(formatDropDown(res?.data?.row,'NOMBRE','ID_GRUPO'))
        })
        Services.getDepas().then(res=>{
            setDepartamentos(formatDropDown(res?.data?.row,'NOMBRE','ID_DEPARTAMENTO'))
        })
    },[])
  return(
      <div className={"row row-form"}>
        <div className={"col-md-4"}>
          <div className="input-text">
            <label>Nombre</label>
            <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.NOMBRE}
                       onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "NOMBRE")}
            />
          </div>
        </div>
        <div className={"col-md-4"}>
          <div className="input-text">
            <label>A. paterno</label>
            <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.AP_PATERNO}
                       onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "AP_PATERNO")}
            />
          </div>
        </div>
        <div className={"col-md-4"}>
          <div className="input-text">
            <label>A. materno</label>
            <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.AP_MATERNO}
                       onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "AP_MATERNO")}
            />
          </div>
        </div>
          <div className={"col-md-4"}>
              <div className="input-text">
                  <label>Num. Empleado</label>
                  <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.NUM_EMPLEADO}
                             onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "NUM_EMPLEADO")}
                  />
              </div>
          </div>
        <div className={"col-md-4"}>
          <div className="input-text">
            <label>Email</label>
            <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.EMAIL}
                       onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "EMAIL")}
            />
          </div>
        </div>
          <div className={"col-md-4"}>
              <div className="input-text">
                  <label>Telefono</label>
                  <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.TEL}
                             onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "TEL")}
                  />
              </div>
          </div>
        <div className={"col-md-4"}>
          <div className="input-text">
            <label>Grupo</label>
              <Dropdown value={selectedGrupo}
                        onChange={(e) => {
                            setSelectedGrupo(e.value)
                            onChange(e.value?.code,arrayList, setArrayList, "ID_GRUPO")
                        }}
                        options={grupos}
                        optionLabel="name"
                        placeholder="Selecciona una opcion"/>
          </div>
        </div>
        <div className={"col-md-4"}>
          <div className="input-text">
            <label>Area</label>
              <Dropdown value={selectedArea}
                        onChange={(e) => {
                            setSelectedArea(e.value)
                            onChange(e.value?.code,arrayList, setArrayList, "ID_AREA")

                        }}
                        options={areas}
                        optionLabel="name"
                        placeholder="Selecciona una opcion"/>
          </div>
        </div>
        <div className={"col-md-4"}>
          <div className="input-text">
            <label>Departamento</label>
              <Dropdown value={selectedDepa}
                        onChange={(e) => {
                            setSelectedDepa(e.value)
                            onChange(e.value?.code,arrayList, setArrayList, "ID_DEPARTAMENTO")
                        }}
                        options={departamentos}
                        optionLabel="name"
                        placeholder="Selecciona una opcion"/>
          </div>
        </div>
          <div className={"col-md-4"}>
              <div className="input-text">
                  <label>Puesto</label>
                  <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.PUESTO}
                             onChange={(e)=>onChange(e.target.value,arrayList, setArrayList, "PUESTO")}
                  />
              </div>
          </div>
        <div className={"col-md-4"}>
          <div className="input-text">
            <label>ESTATUS</label>
            <InputSwitch checked={selectedActivo} onChange={(e) => {
                setSelectedActivo(e.value)
                onChange(e.value ? 1 : 0 ,arrayList, setArrayList, "STATUS")
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

export default FormEmpleado