import BarMenu from "../../Components/BarMenu";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import Container from "../../Components/Container";
import imgL2 from "../../Assets/img_1.png";
import logo from "../../Assets/img-logo.png";
import {useEffect, useRef, useState} from "react";
import Services from "../../Services/Services";
import {Toast} from "primereact/toast";
import CardPanel from "../../Components/CardPanel";

const Register = () => {
    const [user, setUserL] = useState(null)
    const [message, setMessage] = useState('')
    let toast= useRef(null);
    const onChange = (e,campo) => {
        user[campo] = e
        setUserL({...user})
        setMessage(null)
    }
    useEffect(()=>{
        setUserL({USER:null, PASS: null})
    },[])
    const buttonRegister=()=>{
        console.info(user)
        Services.searchEmpleado(user).then(res=>{
            console.log(res)
            if(res?.status === 200){
                if(res?.data?.row?.length > 0){
                    console.log('ID empleado', res?.data?.row[0])
                    const newUser = {
                        ID_EMPLEADO: res?.data?.row[0]?.ID_EMPLEADO,
                        FOTO: null,
                        USER: user.USER,
                        PASS: user.PASS,
                        TIPO: 'Normal',
                        STATUS: 1
                    }
                    Services.searchUsuario(newUser).then(res=>{
                        console.log(res)
                        if(res?.data?.row?.length > 0){
                            setMessage("El usuario ya existe")
                        }else {
                            Services.addUsuario(newUser).then(res=>{
                                if(res?.status === 200){
                                    toast.current.show(
                                        { severity: 'success',
                                            summary: 'Message',
                                            detail: 'Usuario agregado',
                                            life: 3000
                                        });
                                }
                            })
                        }
                        }
                    )

                }else {
                    setMessage("Empleado no encontrado")
                }
            }else {
                console.log("Algo salio mal")
            }
        })
    }
    const element = () => {
        let form = <div className={"panel-login"}>
            <div className={"row"}>
                <div className={"col-sm-5 col-md-5 panel-img"}>
                    <img className={"img-login"} src={imgL2}/>
                </div>
                <div className={"col-sm-7 col-md-7 panel-form"}>
                    <div className={"row"} style={{justifyContent: "center"}}>
                        <div className={"col-md-12"}>
                            <div className={"icon-user-login"}>
                                <img src={logo}/>
                            </div>
                        </div>
                        <div className={"col-md-12"}>
                            <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <i className="pi pi-user"></i>
                                            </span>
                                <InputText placeholder="No. empleado" onChange={(e)=>{onChange(e.target.value, 'USER')}}/>
                            </div>
                        </div>
                        <div className={"col-md-12"}>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-lock"></i>
                                </span>
                                <Password  feedback={true}  placeholder={"password"} toggleMask onChange={(e)=>{onChange(e.target.value, 'PASS')}}/>
                            </div>
                        </div>
                        <div className={"col-md-12"}>
                            <Button label="Registrar" className={"button-login"} raised onClick={()=>{buttonRegister()}}/>
                        </div>
                        <div className={"col-md-12"}>
                            <p className={"text-1"} style={{height: '23px',marginBottom: '0'}}>{message? message : '' }</p>
                        </div>
                        <div className={"col-md-12"}>
                            <p className={"text-1"}>Ya tienes cuenta? <span onClick={()=> window.open("#/login","_self")}> Logueate!</span></p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        return (
            <div id={"register-modul"}  className={"row"}>
                <div className={"col-md-12"}>
                    <BarMenu/>
                </div>
                <div className={"col-11 col-sm-10 col-md-8"} style={{display:"flex", margin: "auto"}}>
                    <CardPanel title={"Registrate"} element ={form}/>
                </div>
                <Toast ref={toast} />
            </div>
        )
    }
    return(
    <Container element={element()}/>
    )
}

export default Register