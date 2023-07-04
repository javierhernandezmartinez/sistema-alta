import "../../Styles/Register.scss"
import BarMenu from "../../Components/BarMenu/BarMenu";
import {Button} from "primereact/button";
import img1 from "../../Assets/img1.png";
import imgL1 from "../../Assets/img-L1.png";
import CarouselCursos from "../Home/CarouselCursos";
import Footer from "../../Components/Footer";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
const Register = () => {
    return(
        <div className={"panel-p"}>
            <div className={"row"}>
                <div className={"col-md-12"}>
                    <BarMenu/>
                </div>
                <div className={"col-md-12"} style={{display:"flex", height:"89vh"}}>
                    <div className={"panel-login"}>
                        <p className={"title-login"}>Registrate</p>
                        <div className={"row"}>
                            <div className={"col-md-6"}>
                                <img className={"img-login"} src={imgL1}/>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"row"}>
                                    <div className={"col-md-12"}>
                                        <div className={"icon-user-login"}>
                                            <i className="pi pi-user-plus"></i>
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
                                    {/*<div className={"col-md-12"}>
                                        <p className={"text-2"}>Olvide mi contraseña!</p>
                                    </div>*/}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default Register