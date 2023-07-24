import "../../Styles/Register.scss"
import BarMenu from "../../Components/BarMenu";
import {Button} from "primereact/button";
import imgL1 from "../../Assets/img-L1.png";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import Container from "../../Components/Container";
import imgL2 from "../../Assets/img_1.png";
import logo from "../../Assets/img-logo.png";

const element = () => {
    return (
        <div id={"register-modul"}  className={"row"}>
            <div className={"col-md-12"}>
                <BarMenu/>
            </div>
            <div className={"col-md-12"} style={{display:"flex", height:"89vh"}}>
                <div className={"panel-login"}>
                    <p className={"title-login"}>Registrate</p>
                    <div className={"row"}>
                        <div className={"col-md-5 panel-img"}>
                            <img className={"img-login"} src={imgL2}/>
                        </div>
                        <div className={"col-md-7 panel-form"}>
                            <div className={"row"}>
                                <div className={"col-md-12"}>
                                    <div className={"icon-user-login"}>
                                        <img src={logo}/>
                                    </div>
                                </div>
                                <div className={"col-md-12"}>
                                    <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <i className="pi pi-calculator"></i>
                                            </span>
                                        <InputText placeholder="No. Empleado" />
                                    </div>
                                </div>
                                <div className={"col-md-12"}>
                                    <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <i className="pi pi-user"></i>
                                            </span>
                                        <InputText placeholder="Usuario" />
                                    </div>
                                </div>
                                <div className={"col-md-12"}>
                                    <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-lock"></i>
                                </span>
                                        <Password  feedback={true}  placeholder={"password"} toggleMask/>
                                    </div>
                                </div>
                                <div className={"col-md-12"}>
                                    <Button label="Registrar" className={"button-login"} raised onClick={()=>{window.open("#/perfil","_self")}}/>
                                </div>
                                <div className={"col-md-12"}>
                                    <p className={"text-1"}>Ya tienes cuenta? <span onClick={()=> window.open("#/login","_self")}> Logueate!</span></p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
const Register = () => {
    return(
    <Container element={element()}/>
    )
}

export default Register