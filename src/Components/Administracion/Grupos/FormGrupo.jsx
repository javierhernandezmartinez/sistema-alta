import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import {InputSwitch} from "primereact/inputswitch";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {closeModalForm} from "../../../App/Features/rootModalFormSlice";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import Services from "../../../Services/Services";


const FormGrupo = (props) => {
    const dispatch = useDispatch()
    const [arrayList, setArrayList] = useState({...props.arrayList})
    const [selectedActivo, setSelectedActivo] = useState(false)
    console.log("props array", props.arrayList)

    useEffect(()=>{
        setSelectedActivo(props.arrayList.STATUS === 1)
    },[])

    const onChange = (e,campo) => {
        arrayList[campo] = e
        setArrayList(arrayList)
        console.log( arrayList)
    }
    const onCloseModal = () => {
        dispatch(closeModalForm())
    }
    const getGrupos = ()=>{
        Services.getGrupos().then(res=> {
            dispatch(listDataTable(res?.data?.row))
            dispatch(closeModalForm())
        })
    }
    const onSaveModal = () => {
        console.log("POST JSON::",arrayList)
        if (arrayList.ID_GRUPO){
            Services.updateGrupo(arrayList).then(res => {
                    console.log(res)
                    props.toast.current.show(
                        {
                            severity: res.data.message ? 'success' : "error",
                            summary: 'Message',
                            detail: res.data.message ? res.data.message : res.data.errorMessage }
                    );
                    getGrupos()
                }
            )
        }else {
            Services.addGrupo(arrayList).then(res => {
                    console.log(res)
                    props.toast.current.show(
                        {
                            severity: res.data.message ? 'success' : "error",
                            summary: 'Message',
                            detail: res.data.message ? res.data.message : res.data.errorMessage }
                    );
                    getGrupos()
                }
            )
        }
    }

    return(
        <div className={"row row-form"}>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>Nombre</label>
                    <InputText id="username" aria-describedby="username-help" defaultValue={arrayList.NOMBRE}
                               onChange={(e)=>onChange(e.target.value,"NOMBRE")}
                    />
                </div>
            </div>
            <div className={"col-md-4"}>
                <div className="input-text">
                    <label>ESTATUS</label>
                    <InputSwitch checked={selectedActivo} onChange={(e) => {
                        setSelectedActivo(e.value)
                        onChange(e.value ? 1 : 0 , "STATUS")
                    }}/>
                </div>
            </div>
            <div className={"col-md-12"}>
                <div className="modal-footer">
                    <Button label={"Cancelar"} onClick={()=>onCloseModal(dispatch, arrayList)}/>
                    <Button label={"Guardar"} onClick={(e)=> {
                        onSaveModal()
                    }}/>
                </div>
            </div>
        </div>
    )
}

export default FormGrupo