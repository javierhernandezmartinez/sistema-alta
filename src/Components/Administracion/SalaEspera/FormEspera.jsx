import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {InputSwitch} from "primereact/inputswitch";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {closeModalForm} from "../../../App/Features/rootModalFormSlice";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import Services from "../../../Services/Services";



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
const onSaveModal = (dispatch, array, props) => {
    console.log("POST JSON::",array)
    if (array.ID_USUARIO){
        updateUsuario(dispatch, array, props)
    }else {
        addUsuario(dispatch, array, props)
    }
    dispatch(closeModalForm())
}
const onCloseModal = (dispatch) => {
    dispatch(closeModalForm())
}

const searchOption = (array, valor) => {
    let option = array.filter(item => item.code === valor)
  return option[0]
}

const FormEspera = (props) => {
    const dispatch = useDispatch()
    const [arrayList, setArrayList] = useState({...props.arrayList})
    const [selectedTypeUser, setSelectedTypeUser] = useState(null)
    const [selectedEmpleado, setSelectedEmpleado] = useState(props.selectedEmpleado)
    const [empleados, setEmpleados] = useState(props.empleados)
    const lisTipos = [
        { name: 'Admin', code: 'Admin' },
        { name: 'Normal', code: 'Normal' },
        { name: 'Resepcion', code: 'Resepcion' }
    ];

    const onChange = (e, campo) => {
        arrayList[campo] = e
        setArrayList({...arrayList})
        console.log(arrayList)
    }
    const getEmpleados = ()=>{
        setSelectedTypeUser(searchOption(lisTipos, arrayList.TIPO))
    }

    useEffect(()=>{
        getEmpleados()
    },[])
  return(
      <div className={"row row-form"}>
          <div className={"col-md-4"}>
              <div className="input-text">
                  <label>Empleado</label>
                  <Dropdown value={selectedEmpleado}
                            onChange={(e) => {
                                setSelectedEmpleado(e.value)
                                onChange(e.value?.code, "ID_EMPLEADO")
                            }}
                            options={empleados}
                            optionLabel="name"
                            placeholder="Selecciona una opcion"/>
              </div>
          </div>
        <div className={"col-md-4"}>
          <div className="input-text">
            <label>Foto</label>
            <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.FOTO}
                       onChange={(e)=>onChange(e.target.value, "FOTO")}
            />
          </div>
        </div>
        <div className={"col-md-4"}>
          <div className="input-text">
            <label>User</label>
            <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.USER}
                       onChange={(e)=>onChange(e.target.value, "USER")}
            />
          </div>
        </div>
          <div className={"col-md-4"}>
              <div className="input-text">
                  <label>Password</label>
                  <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.PASS}
                             onChange={(e)=>onChange(e.target.value, "PASS")}
                  />
              </div>
          </div>

        <div className={"col-md-4"}>
          <div className="input-text">
            <label>Tipo</label>
              <Dropdown value={selectedTypeUser}
                        onChange={(e) => {
                            setSelectedTypeUser(e.value)
                            onChange(e.value?.code, "TIPO")

                        }}
                        options={lisTipos}
                        optionLabel="name"
                        placeholder="Selecciona una opcion"/>
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
                  <Button label={"Cancelar"} onClick={()=>onCloseModal(dispatch, arrayList)}/>
                  <Button label={"Guardar"} onClick={(e)=> {
                    onSaveModal(dispatch, arrayList, props)
                  }}/>
              </div>
          </div>
      </div>
  )
}

export default FormEspera