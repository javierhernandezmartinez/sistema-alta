import BarMenu from "../../Components/BarMenu";
import {Button} from "primereact/button";
import imgL2 from "../../Assets/img_1.png";
import logo from "../../Assets/img-logo.png"
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import Container from "../../Components/Container";
import Services from "../../Services/Services";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import Session from "../../Services/Session";

const Login = () => {
    const [user, setUserL] = useState(null)
    const [message, setMessage] = useState('')
    const dispatch = new useDispatch()
    const onChange = (e,campo) => {
        user[campo] = e
        setUserL({...user})
        setMessage(null)
    }
    const buttonLogin=()=>{
        Services.getLogin(user).then(res=>{
            if(res?.status === 200){
                if(res?.data?.row?.length > 0){
                    Session.setUser(res?.data?.row[0])

                }else {
                    console.log("Usuario o contraseña incorrecta")
                    setMessage("Usuario o contraseña incorrecta")
                }
            }else {
                console.log("Algo salio mal")
            }
        })
    }
    useEffect(()=>{
        setUserL({USER:null, PASS: null})
    },[])
    const element = () => {
        return(
            <div id={"login-modul"} className={"row"}>
                <div className={"col-md-12"}>
                    <BarMenu/>
                </div>
                <div className={"col-11 col-sm-10 col-md-8"} style={{display:"flex", height:"89vh", margin: "auto"}}>
                    <div className={"panel-login"}>
                        <div className={"row"}>
                            <div className={"col-md-12"}>
                                <p className={"title-login"}>Login</p>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className={"col-sm-5 col-md-5 panel-img"}>
                                <img className={"img-login"} src={imgL2}/>
                            </div>
                            <div className={"col-sm-7 col-md-7 panel-form"}>
                                <div className={"row"} style={{justifyContent: "center"}}>
                                    <div className={"col-11 col-md-12"}>
                                        <div className={"icon-user-login"}>
                                            <img src={logo}/>
                                        </div>
                                    </div>
                                    <div className={"col-11 col-md-12"}>
                                        <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <i className="pi pi-user"></i>
                                            </span>
                                            <InputText placeholder="Usuario" onChange={(e)=>{onChange(e.target.value, 'USER')}}/>
                                        </div>
                                    </div>
                                    <div className={"col-11 col-md-12"}>
                                        <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <i className="pi pi-lock"></i>
                                            </span>
                                            <Password  feedback={false}  placeholder={"password"} toggleMask
                                                       onChange={(e)=>{onChange(e.target.value, 'PASS')}}
                                            />
                                        </div>
                                    </div>
                                    <div className={"col-md-12"}>
                                        <Button label="Ingresar" className={"button-login"} onClick={()=>{buttonLogin()}}/>
                                    </div>
                                    <div className={"col-md-12"}>
                                        <p className={"text-1"} style={{height: '23px',marginBottom: '0'}}>{message? message : '' }</p>
                                    </div>
                                    <div className={"col-md-12"}>
                                        <p className={"text-1"} style={{textAlign:"end"}}>Aun no tienes cuenta? <span onClick={()=> window.open("#/register","_self")}> Registrate!</span></p>
                                    </div>
                                    <div className={"col-md-12"}>
                                        <p className={"text-2"} style={{textAlign:"end"}}>Olvide mi contraseña!</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
  return(
      <Container element = {element()}/>
  )
}

export default Login