import "../../Styles/Home.scss"
import "../../Styles/Components/Components.scss"
import img1 from "../../Assets/img1.png"
import logoBM from "../../Assets/logoBM.png"
import {Button} from "primereact/button";
import CarouselCursos from "./CarouselCursos";
import BarMenu from "../../Components/BarMenu";
import Container from "../../Components/Container";

const scrollTop = (e) => {
    console.log("scroolt top")
    document.getElementById("seccion-2").scrollIntoView({
        behavior: 'smooth'
    })
}
const element = () => {
  return(
      <>
          <div className={"row seccion-1"}>
              <div className={"col-md-12"}>
                  <BarMenu/>
              </div>
              <div className={"col-md-12"}>

              </div>
              <div className={"col-md-6"}>

                  <div className={"div-text"}>
                      <div>
                          <p className={"title-p-1"}>
                              Comienza el reto
                          </p>
                          <p className={"title-p"}>
                              Sigue aprendiendo en <span>BM Cursos</span>
                          </p>
                          <p className={"text-p"}>
                              En <span>Banxico</span> queremos que nuestros colaboradores se mantengan al dia con las nuevas tecnologias
                              y herramientas que surgen constantemente en este mundo tecnologico, por eso te motivamos a que no
                              pares de aprender.
                              <br/>
                              <br/>
                              Inscribete a los cursos que tenemos para ti.
                          </p>
                          <div className={"div-button"}>
                              <Button label="Ver cursos" style={{marginRight: "10px"}} onClick={()=>scrollTop()}/>
                              <Button label="Logueate"  onClick={()=>window.open("#/login", "_self")}/>
                          </div>
                      </div>

                  </div>
              </div>
              <div className={"col-md-6"}>
                  <div className={"img-p"}>
                      <img src={logoBM}/>
                  </div>
              </div>
          </div>
          <div id={"seccion-2"} className={"row seccion-2"}>
              <div className={"col-md-12"}>
                  <div className={"row"}>
                      <div className={"col-md-12"}>
                          <p className={"title-seccion2"}>Cursos</p>
                      </div>
                  </div>
                  <div className={"row"}>
                      <div className={"col-md-12"}>
                          <p className={"desc-sec2"}>
                              Elige un tema y comienza una nueva linea de arendizaje, donde incrementaras
                              tus conocimientos con ayuda de nuestros asesores.
                          </p>
                      </div>
                  </div>
                  <div>
                      <CarouselCursos/>
                  </div>
              </div>
          </div>
      </>
  )
}
const Home = () => {
  return(
        <Container element={element()}/>
  )
}

export default Home