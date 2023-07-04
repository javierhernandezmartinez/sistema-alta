import "../../Styles/Home.scss"
import { Menubar } from 'primereact/menubar';
import {InputText} from "primereact/inputtext";
import img1 from "../../Assets/img1.png"
import Footer from "../../Components/Footer";
import {Button} from "primereact/button";
import {Carousel} from "primereact/carousel";
import CarouselCursos from "./CarouselCursos";
import BarMenu from "../../Components/BarMenu/BarMenu";
const Home = () => {
    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = <InputText placeholder="Search" type="text" className="w-full" />;
  return(
      <div className={"panel-p"}>
          <div className={"row seccion-1"}>
              <div className={"col-md-12"}>
                  <BarMenu/>
              </div>
              <div className={"col-md-6"}>
                  <div className={"div-text"}>
                      <div>
                          <p className={"title-p"}>
                              AGENDA-T
                          </p>
                          {/*<p className={"text-p"}>
                              Agenda-T
                          </p>*/}
                          <p className={"text-p"}>
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                              been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                              galley of type and scrambled it to make a type specimen book.
                          </p>
                          <div className={"div-button"}>
                              <Button label="Ver cursos" raised style={{marginRight: "10px"}}/>
                              <Button label="Logueate" raised />
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
          <div className={"row seccion-2"}>
              <div className={"col-md-12"}>
                  <div className={"row"}>
                      <div className={"col-md-12"}>
                        <p className={"title-seccion2"}>CURSOS</p>
                      </div>
                  </div>
                  <div>
                      <CarouselCursos/>
                  </div>
              </div>
          </div>

          <Footer/>

      </div>

  )
}

export default Home