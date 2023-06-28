import "../../Styles/Home.scss"
import BarMenu from "../../Components/BarMenu/BarMenu";
import {Button} from "primereact/button";
import img1 from "../../Assets/img1.png";
import CarouselCursos from "../Home/CarouselCursos";
import Footer from "../../Components/Footer";
import {InputText} from "primereact/inputtext";
const Login = () => {
  return(
      <div className={"panel-p seccion-1"}>
          <div className={"row"}>
              <div className={"col-md-12"}>
                  <p className={"title-p"}>
                      AGENDA-T
                  </p>
                  <BarMenu/>
              </div>
              <div className={"col-md-6"}>
                  <div className={"row"}>
                        <div className={"col-md-12"}>
                            <p>Login</p>
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
                                    <i className="pi pi-user"></i>
                                </span>
                              <InputText placeholder="Contraseña" />
                          </div>
                      </div>
                      <div className={"col-md-12"}>
                          <Button label="Logueate" raised onClick={()=>{window.open("/perfil","_self")}}/>
                      </div>
                      <div className={"col-md-12"}>
                          <p>Aun no tienes cuenta? Registrate!</p>
                      </div>
                      <div className={"col-md-12"}>
                          <p>Olvide mi contraseña!</p>
                      </div>
                  </div>
              </div>
              <div className={"col-md-6"}>
                  <div className={"img-p"}>
                      <img src={img1}/>
                  </div>
              </div>
          </div>

          <Footer/>

      </div>
  )
}

export default Login