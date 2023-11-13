import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import {InputSwitch} from "primereact/inputswitch";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {closeModalForm} from "../../../App/Features/rootModalFormSlice";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import Services from "../../../Services/Services";

const onChange = (e,arrayList, setArrayList, campo) => {
    arrayList[campo] = e
    setArrayList(arrayList)
}
const getDepas = (dispatch)=>{
    Services.getDepas().then(res=> {
        dispatch(listDataTable(res?.data?.row))
        dispatch(closeModalForm())
    })
}

const addDepa = (dispatch, array, props) => {
    Services.addDepa(array).then(res => {
            console.log(res)
            props.toast.current.show(
                {
                    severity: res.data.message ? 'success' : "error",
                    summary: 'Message',
                    detail: res.data.message ? res.data.message : res.data.errorMessage }
            );
            getDepas(dispatch)
        }
    )
}
const updateDepa = (dispatch, array, props) => {
    Services.updateDepa(array).then(res => {
            console.log(res)
            props.toast.current.show(
                {
                    severity: res.data.message ? 'success' : "error",
                    summary: 'Message',
                    detail: res.data.message ? res.data.message : res.data.errorMessage }
            );
            getDepas(dispatch)
        }
    )
}
const onSaveModal = (dispatch, array, props) => {
    console.log("POST JSON::",array)
    if (array.ID_DEPARTAMENTO){
        updateDepa(dispatch, array, props)
    }else {
        addDepa(dispatch, array, props)
    }
}
const onCloseModal = (dispatch) => {
    dispatch(closeModalForm())
}

const FormDepartamento = (props) => {
    const dispatch = useDispatch()
    const [arrayList, setArrayList] = useState({...props.arrayList})
    const [selectedActivo, setSelectedActivo] = useState(false)
    console.log("props array", props.arrayList)

    useEffect(()=>{
        setSelectedActivo(props.arrayList.STATUS === 1)
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

export default FormDepartamento