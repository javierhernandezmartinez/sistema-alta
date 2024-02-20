import {Button} from 'primereact/button';
import InputTypeText from "../../InputTypeText";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import img_no_img from "../../../Assets/Images/img_no_img.png"
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import InputTypePassword from "../../InputTypePassword";
import InputTypeButton from "../../InputTypeButton";
import {MdAlternateEmail} from "react-icons/md";
import {InputSwitch} from "primereact/inputswitch";
import Services from "../../../Services/Services";
import Session from "../../../Services/Session";
import {Toast} from "primereact/toast";


const defaultData = {
    NOMBRE:null,
    AP_PATERNO : null,
    AP_MATERNO: null,
    NUM_EMPLEADO:null,
    EMAIL:null,
    TEL: null,
    GRUPO: null,
    AREA: null,
    DEPARTAMENTO: null,
    PUESTO:null,
    STATUS: null
}
const PanelMisDatos = (props) => {
    let toast= useRef(null);
    const user = Session.getUser()
    const dispatch = useDispatch()
    const [value, setValue] = useState({...defaultData});
    const [newPass, setNewPass] = useState({});
    const [message, setMessage] = useState(null);
    const [updatePass, setUpdatePass] = useState(false);

    const onChangeData = (valor,campo) => {
        newPass[campo]= valor
        setNewPass({...newPass})
        setMessage(null)
    }

    const validaPass = () => {
        console.log(newPass)
        if (newPass?.password?.length > 0 && newPass?.new_password?.length > 0){
            if ( newPass?.password === newPass?.new_password){
                console.log("Updating pass")
                Services.updatePassPerfil({...newPass, ID_USUARIO:user?.ID_USUARIO}).then(res=>{
                    console.log(res)
                    if(res.status === 200) {
                        toast.current.show(
                            {
                                severity: res.data.message ? 'success' : "error",
                                summary: 'Message',
                                detail: res.data.message ? res.data.message : res.data.errorMessage }
                        );
                    }

                    setUpdatePass(false)
                    setMessage(null)
                    setNewPass({})
                })
            }else {
                setMessage("Las campos no son iguales")
            }
        }else {
            setMessage("Llene los campos")
        }
    }
    const cleanData =()=>{
        setUpdatePass(false)
        setMessage(null)
        setNewPass({})
    }

    const getDataEmpleado=()=>{
        Services.getEmpleado({ID_USUARIO : user?.ID_USUARIO}).then(res=>{
            console.log(res?.data?.row)
            if(res.status === 200 && res?.data?.row?.length > 0){
                setValue(res?.data?.row[0])
            }
        })
    }
    useEffect(()=>{
        getDataEmpleado()
    },[])

    return(
        <div className={"row row-form"}>
            <div className={"col-md-12"}>
                <p className={"title-seccion"}>{props.title}</p>
            </div>
            <div className={"col-md-12"}>
                <div className={"row"}>
                    <div className={"col-sm-6 col-md-6"}>
                        <div className={"description-p"}>
                            <label className={"l-icon"}>
                                <i className={"pi pi-user"}/>
                            </label>
                            <label className={"l-desc"}>
                                Nombre: <span>{value.NOMBRE} {value.AP_PATERNO} {value.AP_MATERNO}</span>
                            </label>
                        </div>
                    </div>
                    <div className={"col-sm-6 col-md-6"}>
                        <div className={"description-p"}>
                            <label className={"l-icon"}>
                                <i className={"pi pi-briefcase"}/>
                            </label>
                            <label className={"l-desc"}>
                                Puesto: <span>{value.PUESTO || '---'}</span>
                            </label>
                        </div>
                    </div>
                    <div className={"col-sm-6 col-md-6"}>
                        <div className={"description-p"}>
                            <label className={"l-icon"}>
                                <i className={"pi pi-hashtag"}/>
                            </label>
                            <label className={"l-desc"}>
                                Núm. Empleado: <span>{value.NUM_EMPLEADO || '---'}</span>
                            </label>
                        </div>
                    </div>
                    <div className={"col-sm-6 col-md-6"}>
                        <div className={"description-p"}>
                            <label className={"l-icon"}>
                                <i className={"pi pi-phone"}/>
                            </label>
                            <label className={"l-desc"}>
                                Tel: <span>{value.TEL || '---'}</span>
                            </label>
                        </div>
                    </div>
                    <div className={"col-sm-6 col-md-6"}>
                        <div className={"description-p"}>
                            <label className={"l-icon"}>
                                <i className={"pi pi-at"}/>
                            </label>
                            <label className={"l-desc"}>
                                Email: <span>{value.EMAIL || '---'}</span>
                            </label>
                        </div>
                    </div>
                    <div className={"col-sm-6 col-md-6"}>
                        <div className={"description-p"}>
                            <label className={"l-icon"}>
                                <i className={"pi pi-th-large"}/>
                            </label>
                            <label className={"l-desc"}>
                                Grupo: <span>{value.GRUPO || '---'}</span>
                            </label>
                        </div>
                    </div>
                    <div className={"col-sm-6 col-md-6"}>
                        <div className={"description-p"}>
                            <label className={"l-icon"}>
                                <i className={"pi pi-qrcode"}/>
                            </label>
                            <label className={"l-desc"}>
                                Área: <span>{value.AREA || '---'}</span>
                            </label>
                        </div>
                    </div>
                    <div className={"col-sm-6 col-md-6"}>
                        <div className={"description-p"}>
                            <label className={"l-icon"}>
                                <i className={"pi pi-table"}/>
                            </label>
                            <label className={"l-desc"}>
                                Departamento: <span>{value.DEPARTAMENTO || '---'}</span>
                            </label>
                        </div>
                    </div>
                    <div className={"col-sm-6 col-md-6"}>
                        <div className={"description-p"}>
                            <label className={"l-icon"}>
                                <i className={"pi pi-check"}/>
                            </label>
                            <label className={"l-desc"}>
                                Activo: <span>{value.STATUS || '---'}</span>
                            </label>
                        </div>
                    </div>

                </div>
                <div className={"row"}>
                    <div className={"col-12 col-sm-auto col-md-auto col-lg-auto"}>
                        <InputTypeButton
                            label={"Cambiar contraseña"}
                            icon={"pi pi-unlock"}
                            onClick={()=>{
                                setUpdatePass(!updatePass)
                            }}
                        />
                    </div>
                </div>
                <div className={"row"}>
                    {
                        updatePass ?
                            <>
                                <div className={"col-sm-6 col-md-6"}>
                                    <InputTypePassword
                                        title={"Nueva Contraseña"}
                                        icon={"pi-lock"}
                                        value={newPass?.password}
                                        placeholder={"nueva contraseña"}
                                        onChange={(e)=>{onChangeData(e.target.value, "password")}}
                                        feedback={true}
                                        important={message}
                                    />
                                </div>
                                <div className={"col-sm-6 col-md-6"}>
                                    <InputTypePassword
                                        title={"Confirma Contraseña"}
                                        icon={"pi-lock"}
                                        value={newPass?.new_password}
                                        placeholder={"confirma contraseña"}
                                        onChange={(e)=>{onChangeData(e.target.value, "new_password")}}
                                        feedback={true}
                                        important={message}
                                    />
                                </div>
                                <div className={"col-md-12"}>
                                    <div className={"row"} style={{justifyContent: "end", marginTop: "2%"}}>
                                        {
                                            message ?
                                                <div className={"col-md-6"}>
                                                    <label style={{color: "#ef4444"}}>{message}</label>
                                                </div>
                                                : null
                                        }

                                        <div className={"col-6 col-sm-auto col-md-auto"}>
                                            <InputTypeButton
                                                label={"Guardar"}
                                                icon={"pi pi-check"}
                                                onClick={()=>{
                                                    validaPass()
                                                }}
                                            />
                                        </div>
                                        <div className={"col-6 col-sm-auto col-md-auto"}>
                                            <InputTypeButton
                                                label={"Cancelar"}
                                                icon={"pi pi-times"}
                                                onClick={()=> {
                                                    cleanData()
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                            :null
                    }
                    <Toast ref={toast} />
                </div>
            </div>
        </div>
    )
}

export default PanelMisDatos