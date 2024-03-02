import BarMenu from "../../Components/BarMenu";
import {Button} from "primereact/button";
import imgL2 from "../../Assets/img_1.png";
import logo from "../../Assets/img-logo.png"
import Container from "../../Components/Container";
import Services from "../../Services/Services";
import {useEffect, useState} from "react";
import Session from "../../Services/Session";
import CardPanel from "../../Components/CardPanel";
import InputTypeText from "../../Components/InputTypeText";
import InputTypePassword from "../../Components/InputTypePassword";

const Login = () => {
    const [user, setUserL] = useState(null)
    const [message, setMessage] = useState('')
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
        let form = <div className={"panel-login"}>
            <div className={"row"}>
                <div className={"col-sm-5 col-md-5 panel-img"}>
                    <img className={"img-login"} src={imgL2}/>
                </div>
                <div className={"col-sm-7 col-md-7 panel-form"}>
                    <div className={"row"} style={{justifyContent: "center"}}>
                        <div className={"col-12 col-md-12"}>
                            <div className={"icon-user-login"}>
                                <img src={logo}/>
                            </div>
                        </div>
                        <div className={"col-12 col-md-12"}>
                            <InputTypeText
                                icon={"pi-user"}
                                placeholder="Usuario"
                                onChange={(e)=>{onChange(e.target.value, 'USER')}}
                            />
                        </div>
                        <div className={"col-12 col-md-12"}>
                            <InputTypePassword
                                icon={"pi-lock"}
                                feedback={false}
                                placeholder={"password"}
                                onChange={(e)=>{onChange(e.target.value, 'PASS')}}
                            />
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

        return(
            <div id={"login-modul"} className={"row"}>
                <div className={"col-md-12"}>
                    <BarMenu/>
                </div>
                <div className={"col-11 col-sm-10 col-md-8"} style={{display:"flex",  margin: "auto"}}>
                    <CardPanel title={"Login"} element ={form}/>
                </div>
            </div>
        )
    }

  return(
      <Container element = {element()}/>
  )
}

export default Login