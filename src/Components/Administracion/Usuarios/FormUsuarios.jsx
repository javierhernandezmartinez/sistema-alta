import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {closeModalForm} from "../../../App/Features/rootModalFormSlice";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import Services from "../../../Services/Services";
import InputTypeSelect from "../../InputTypeSelect";
import InputTypeText from "../../InputTypeText";
import InputTypeSwitch from "../../InputTypeSwitch";
import InputTypeButton from "../../InputTypeButton";
import InputTypePassword from "../../InputTypePassword";

const getUsuarios = (dispatch)=> {
    Services.getUsuarios().then(res => {
        console.log(res)
        if(res.status === 200 && res?.data?.row?.length > 0){
            dispatch(listDataTable(res?.data?.row))
        }
    })
}
const addUsuario = (dispatch, array, props) => {
    Services.addUsuario(array).then(res => {
            console.log(res)
        if(res.status === 200) {
            let typeNotifi = 'success'
            if(res.data.message === "El usuario ya existe"){
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
            getUsuarios(dispatch)
        }

        }
    )
}
const updateUsuario = (dispatch, array, props) => {
    Services.updateUsuario(array).then(res => {
            console.log(res)
        if(res.status === 200) {
            props.toast.current.show(
                {
                    severity: res.data.message ? 'success' : "error",
                    summary: 'Message',
                    detail: res.data.message ? res.data.message : res.data.errorMessage }
            );
            getUsuarios(dispatch)
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

const FormUsuarios = (props) => {
    const dispatch = useDispatch()
    const [arrayList, setArrayList] = useState({...props.arrayList})
    const [selectedTypeUser, setSelectedTypeUser] = useState(null)
    const [message, setMessage] = useState(null);

    const lisTipos = [
        { name: 'Admin', code: 'Admin' },
        { name: 'Normal', code: 'Normal' },
        { name: 'Resepción', code: 'Resepcion' }
    ];
    const onSaveModal = (dispatch, array, props) => {
        console.log("POST JSON::",array)
        if (!array.ID_EMPLEADO ||
            !array.USER ||
            !array.PASS
        ){
            setMessage("Llene los campos importantes.!")

        }else {
            if (array.ID_USUARIO) {
                updateUsuario(dispatch, array, props)
            } else {
                Services.searchEmpleado({USER: array.USER}).then(res=>{
                    console.log(res)
                    if(res?.status === 200) {
                        if (res?.data?.row?.length > 0) {
                            console.log('ID empleado', res?.data?.row[0])
                            addUsuario(dispatch, array, props)
                        }else {
                            console.log("Empleado no encontrado")
                        }
                    }else {
                        console.log("Algo salio mal")
                    }
                })
            }
            dispatch(closeModalForm())
        }
    }
    const onChange = (e, campo) => {
        arrayList[campo] = e
        setArrayList({...arrayList})
        console.log(arrayList)
        setMessage(null)
    }

    useEffect(()=>{
        setSelectedTypeUser(searchOption(lisTipos, arrayList.TIPO))
    },[])
  return(
      <div className={"row row-form"}>
          <div className={"col-sm-6 col-md-4"}>
              <InputTypeSelect
                  title={"Empleado *"}
                  value={props.selectedEmpleado}
                  onChange={(e) => {
                      props.setSelectedEmpleado(e.value)
                      onChange(e.value?.code, "ID_EMPLEADO")
                      onChange(e.value?.NUM_EMPLEADO, "USER")
                  }}
                  options={props.empleados}
                  important={message}
              />
          </div>
        <div className={"col-sm-6 col-md-4"}>
            <InputTypeText
                title={"Usuario (Núm. empleado)*"}
                placeholder={"usuario"}
                value={props.selectedEmpleado?.NUM_EMPLEADO}
                //onChange={(e)=>onChange(e.target.value, "USER")}
                important={message}
            />
        </div>
          <div className={"col-sm-6 col-md-4"}>
              <InputTypePassword
                  title={"Contraseña *"}
                  placeholder={"contraseña"}
                  defaultValue={arrayList.PASS}
                  onChange={(e)=>onChange(e.target.value, "PASS")}
                  feedback={true}
                  important={message}
              />
          </div>

        <div className={"col-sm-6 col-md-4"}>
            <InputTypeSelect
                title={"Tipo"}
                value={selectedTypeUser}
                onChange={(e) => {
                    setSelectedTypeUser(e.value)
                    onChange(e.value?.code, "TIPO")

                }}
                options={lisTipos}
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

export default FormUsuarios