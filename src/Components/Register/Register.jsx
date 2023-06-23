import "../../Styles/Home.scss"
import BarMenu from "../BarMenu/BarMenu";
import {Button} from "primereact/button";
import img1 from "../../Assets/img1.png";
import CarouselCursos from "../Home/CarouselCursos";
import Footer from "../Footer";
import {InputText} from "primereact/inputtext";
const Register = () => {
  return(
      <div className={"panel-p seccion-1"}>
          <div className={"row"}>
              <div className={"col-md-12"}>
                  <p className={"title-p"}>
                      AGENDA-T
                  </p>
                  <BarMenu/>
              </div>
              <div className={"col-md-4"}>
                  <div className={"row"}>
                        <div className={"col-md-12"}>
                            <p>Registrate</p>
                        </div>
                      <div className={"col-md-12"}>
                          <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                              <InputText placeholder="Num. empleado" />
                          </div>
                      </div>
                      <div className={"col-md-12"}>
                          <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                              <InputText placeholder="Username" />
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

export default Register