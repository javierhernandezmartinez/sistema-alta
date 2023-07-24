import "../../Styles/Login.scss"
import BarMenu from "../../Components/BarMenu";
import {Button} from "primereact/button";
import img1 from "../../Assets/img1.png";
import imgL2 from "../../Assets/img_1.png";
import logoBM from "../../Assets/logoBM.png"
import logo from "../../Assets/img-logo.png"
import Footer from "../../Components/Footer";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import Container from "../../Components/Container";

const element = () => {
  return(
          <div id={"login-modul"} className={"row"}>
              <div className={"col-md-12"}>
                  <BarMenu/>
              </div>
              <div className={"col-md-12"} style={{display:"flex", height:"89vh"}}>
                  <div className={"panel-login"}>
                      <p className={"title-login"}>Login</p>
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
                                          <Password  feedback={false}  placeholder={"password"} toggleMask/>
                                      </div>
                                  </div>
                                  <div className={"col-md-12"}>
                                      <Button label="Ingresar" className={"button-login"} onClick={()=>{window.open("#/perfil","_self")}}/>
                                  </div>
                                  <div className={"col-md-12"}>
                                      <p className={"text-1"}>Aun no tienes cuenta? <span onClick={()=> window.open("#/register","_self")}> Registrate!</span></p>
                                  </div>
                                  <div className={"col-md-12"}>
                                      <p className={"text-2"}>Olvide mi contraseña!</p>
                                  </div>
                              </div>
                          </div>

                      </div>

                  </div>
              </div>
          </div>
  )
}
const Login = () => {
  return(
      <Container element = {element()}/>
  )
}

export default Login