import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {closeModalForm} from "../../../App/Features/rootModalFormSlice";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import Services from "../../../Services/Services";
import InputTypeButton from "../../InputTypeButton";
import InputTypeSwitch from "../../InputTypeSwitch";
import InputTypeText from "../../InputTypeText";

const getListRegistros = (dispatch)=>{
        Services.getAreas().then(res=>{
            if(res.status === 200 && res?.data?.row?.length > 0) {
                dispatch(listDataTable(res?.data?.row))
                dispatch(closeModalForm())
            }
    })
}

const onCloseModal = (dispatch) => {
    dispatch(closeModalForm())
}

const FormArea = (props) => {
    const dispatch = useDispatch()
    const [arrayList, setArrayList] = useState({...props.arrayList})
    const [selectedActivo, setSelectedActivo] = useState(false)
    const [message, setMessage] = useState(null);

    const onChange = (e,campo) => {
        arrayList[campo] = e
        setArrayList({...arrayList})
        setMessage(null)
    }
    const addArea = () => {
        Services.addArea(arrayList).then(res=>{
            if(res.status === 200) {
                props.toast.current.show(
                    {
                        severity: res.data.message ? 'success' : "error",
                        summary: 'Message',
                        detail: res.data.message ? res.data.message : res.data.errorMessage }
                );
                getListRegistros(dispatch)
            }
        })
    }
    const updateArea = () => {
        Services.updateArea(arrayList).then(res=>{
            console.log(res)
            if(res.status === 200) {
                props.toast.current.show(
                    {
                        severity: res.data.message ? 'success' : "error",
                        summary: 'Message',
                        detail: res.data.message ? res.data.message : res.data.errorMessage }
                );
                getListRegistros(dispatch)
            }
        })
    }
    const onSaveModal = (dispatch, array, props) => {
        console.log("POST JSON::",array)
        if(!arrayList.NOMBRE){
            setMessage("Llene los campos importantes.!")
        }else {
            if (array.ID_AREA) {
                updateArea()
            } else {
                addArea()
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

export default FormArea