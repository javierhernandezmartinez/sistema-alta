import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {closeModalForm} from "../../../App/Features/rootModalFormSlice";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import Services from "../../../Services/Services";
import InputTypeText from "../../InputTypeText";
import InputTypeSelect from "../../InputTypeSelect";
import InputTypeButton from "../../InputTypeButton";
import InputTypeSwitch from "../../InputTypeSwitch";

const getEmpleados = (dispatch)=>{
    Services.getEmpleados().then(res=> {
        if(res.status === 200 && res?.data?.row?.length > 0){
            dispatch(listDataTable(res?.data?.row))
            dispatch(closeModalForm())
        }
    })
}

const addEmpleado = (dispatch, array, props) => {
    Services.addEmpleado(array).then(res => {
            console.log(res)
        if(res.status === 200) {
            let typeNotifi = 'success'
            if(res.data.message === "El número de empleado ya existe"){
                typeNotifi = 'warn'
            }else {
                typeNotifi = res.data.message ? 'success' : "error"
            }
            props.toast.current.show(
                {
                    severity: typeNotifi,
                    summary: 'Message',
                    detail: res.data.message ? res.data.message : res.data.errorMessage }
            );
            getEmpleados(dispatch)
        }

        }
    )
}
const updateEmpleado = (dispatch, array, props) => {
    Services.updateEmpleado(array).then(res => {
            console.log(res)
        if(res.status === 200) {
            props.toast.current.show(
                {
                    severity: res.data.message ? 'success' : "error",
                    summary: 'Message',
                    detail: res.data.message ? res.data.message : res.data.errorMessage }
            );
            getEmpleados(dispatch)
        }

        }
    )
}

const onCloseModal = (dispatch) => {
    dispatch(closeModalForm())
}

const searchOption = (array, valor) => {
    let option = array.filter(item => item.code === valor)
  return option[0]
}

const FormEmpleado = (props) => {
    const dispatch = useDispatch()
    const [arrayList, setArrayList] = useState({...props.arrayList})
    const [selectedGrupo, setSelectedGrupo] = useState(null)
    const [selectedArea, setSelectedArea] = useState(null)
    const [selectedDepa, setSelectedDepa] = useState(null)
    const [selectedActivo, setSelectedActivo] = useState(false)
    const [message, setMessage] = useState(null);

    const onChange = (e, campo) => {
        arrayList[campo] = e
        setArrayList({...arrayList})
        setMessage(null)
    }
    const onSaveModal = (dispatch, array, props) => {
        console.log("POST JSON::",array)

        if (!array.NOMBRE ||
            !array.AP_PATERNO ||
            !array.EMAIL ||
            !array.TEL ||
            !array.STATUS ||
            !array.NUM_EMPLEADO
        ){
            setMessage("Llene los campos importantes.!")
        }else {
            if (array.ID_EMPLEADO){
                updateEmpleado(dispatch, array, props)
            }else {
                addEmpleado(dispatch, array, props)
            }
        }
    }
    useEffect(()=>{
        setSelectedGrupo(searchOption(props.grupos, props.arrayList.ID_GRUPO))
        setSelectedArea(searchOption(props.areas, props.arrayList.ID_AREA))
        setSelectedDepa(searchOption(props.departamentos, props.arrayList.ID_DEPARTAMENTO))
        setSelectedActivo(props.arrayList.STATUS === 1)
    },[])
  return(
      <div className={"row row-form"}>
        <div className={"col-sm-6 col-md-4"}>
            <InputTypeText
                title={"Nombre *"}
                defaultValue={arrayList.NOMBRE}
                onChange={(e)=> {
                    onChange(e.target.value,  "NOMBRE")
                }}
                important={message}
            />
        </div>
        <div className={"col-sm-6 col-md-4"}>
            <InputTypeText
                title={"A. paterno *"}
                defaultValue={arrayList.AP_PATERNO}
                onChange={(e)=>onChange(e.target.value, "AP_PATERNO")}
                important={message}
            />
        </div>
        <div className={"col-sm-6 col-md-4"}>
            <InputTypeText
                title={"A. materno"}
                defaultValue={arrayList.AP_MATERNO}
                onChange={(e)=>onChange(e.target.value, "AP_MATERNO")}
            />
        </div>
          <div className={"col-sm-6 col-md-4"}>
              <InputTypeText
                  title={"Núm. empleado *"}
                  defaultValue={arrayList.NUM_EMPLEADO}
                  onChange={(e)=>onChange(e.target.value, "NUM_EMPLEADO")}
                  important={message}
              />
          </div>
        <div className={"col-sm-6 col-md-4"}>
            <InputTypeText
                title={"Email *"}
                defaultValue={arrayList.EMAIL}
                onChange={(e)=>onChange(e.target.value.toLowerCase(), "EMAIL")}
                important={message}
            />
        </div>
          <div className={"col-sm-6 col-md-4"}>
              <InputTypeText
                  title={"Telefono *"}
                  defaultValue={arrayList.TEL}
                  onChange={(e)=>onChange(e.target.value, "TEL")}
                  important={message}
                  />
          </div>
        <div className={"col-sm-6 col-md-4"}>
            <InputTypeSelect
                title={"Grupo"}
                value={selectedGrupo}
                onChange={(e) => {
                    setSelectedGrupo(e.value)
                    onChange(e.value?.code, "ID_GRUPO")
                }}
                options={props.grupos}
            />
        </div>
        <div className={"col-sm-6 col-md-4"}>
            <InputTypeSelect
                title={"Área"}
                value={selectedArea}
                onChange={(e) => {
                    setSelectedArea(e.value)
                    onChange(e.value?.code, "ID_AREA")

                }}
                options={props.areas}
            />
        </div>
        <div className={"col-sm-6 col-md-4"}>
            <InputTypeSelect
                title={"Departamento"}
                value={selectedDepa}
                onChange={(e) => {
                    setSelectedDepa(e.value)
                    onChange(e.value?.code, "ID_DEPARTAMENTO")
                }}
                options={props.departamentos}
            />
        </div>
          <div className={"col-sm-6 col-md-4"}>
              <InputTypeText
                  title={"Puesto"}
                  defaultValue={arrayList.PUESTO}
                  onChange={(e)=>onChange(e.target.value, "PUESTO")}
              />
          </div>
        <div className={"col-sm-6 col-md-4"}>
            <InputTypeSwitch
                title={"Estatus"}
                checked={selectedActivo}
                onChange={(e) => {
                    setSelectedActivo(e.value)
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
                          onClick={()=>onCloseModal(dispatch, arrayList)}
                      />
                  </div>
                  <div className={"col-6 col-sm-auto col-md-auto"}>
                      <InputTypeButton
                          icon={"pi pi-check"}
                          label={"Guardar"}
                          onClick={(e)=> {
                              onSaveModal(dispatch, arrayList, props)
                          }}
                      />
                  </div>
              </div>
          </div>
      </div>
  )
}

export default FormEmpleado