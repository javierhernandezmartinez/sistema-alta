import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {closeModalForm} from "../../../App/Features/rootModalFormSlice";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import Services from "../../../Services/Services";
import InputTypeText from "../../InputTypeText";
import InputTypeSwitch from "../../InputTypeSwitch";
import InputTypeButton from "../../InputTypeButton";

const getDepas = (dispatch)=>{
    Services.getDepas().then(res=> {
        if(res.status === 200 && res?.data?.row?.length > 0) {
            dispatch(listDataTable(res?.data?.row))
            dispatch(closeModalForm())
        }
    })
}

const onCloseModal = (dispatch) => {
    dispatch(closeModalForm())
}

const FormDepartamento = (props) => {
    const dispatch = useDispatch()
    const [arrayList, setArrayList] = useState({...props.arrayList})
    const [selectedActivo, setSelectedActivo] = useState(false)
    const [message, setMessage] = useState(null);

    const onChange = (e,campo) => {
        arrayList[campo] = e
        setArrayList({...arrayList})
        console.log( arrayList)
        setMessage(null)
    }
    const addDepa = () => {
        Services.addDepa(arrayList).then(res => {
                console.log(res)
            if(res.status === 200) {
                props.toast.current.show(
                    {
                        severity: res.data.message ? 'success' : "error",
                        summary: 'Message',
                        detail: res.data.message ? res.data.message : res.data.errorMessage }
                );
                getDepas(dispatch)
            }

            }
        )
    }
    const updateDepa = () => {
        Services.updateDepa(arrayList).then(res => {
                console.log(res)
            if(res.status === 200) {
                props.toast.current.show(
                    {
                        severity: res.data.message ? 'success' : "error",
                        summary: 'Message',
                        detail: res.data.message ? res.data.message : res.data.errorMessage }
                );
                getDepas(dispatch)
            }

            }
        )
    }
    const onSaveModal = () => {
        console.log("POST JSON::",arrayList)
        if(!arrayList.NOMBRE){
            setMessage("Llene los campos importantes.!")
        }else {
            if (arrayList.ID_DEPARTAMENTO) {
                updateDepa()
            } else {
                addDepa()
            }
        }
    }
    useEffect(()=>{
        setSelectedActivo(props.arrayList.STATUS === 1)
    },[])
    return(
        <div className={"row row-form"}>
            <div className={"col-sm-6 col-md-6"}>
                <InputTypeText
                    title={"Nombre *"}
                    defaultValue={arrayList.NOMBRE}
                    placeholder={"nombre"}
                    onChange={(e)=>onChange(e.target.value, "NOMBRE")}
                    important={message}
                />
            </div>
            <div className={"col-sm-6 col-md-6"}>
                <InputTypeSwitch
                    title={"Estatus"}
                    checked={selectedActivo}
                    onChange={(e) => {
                        setSelectedActivo(e.value)
                        onChange(e.value ? 1 : 0, "STATUS")
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
                            onClick={()=> {
                                onSaveModal()
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormDepartamento