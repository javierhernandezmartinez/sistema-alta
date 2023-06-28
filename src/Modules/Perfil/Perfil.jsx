import "../../Styles/Home.scss"
import BarMenu from "../../Components/BarMenu/BarMenu";
import {Button} from "primereact/button";
import img1 from "../../Assets/img1.png";
import CarouselCursos from "../Home/CarouselCursos";
import Footer from "../../Components/Footer";
import {InputText} from "primereact/inputtext";
import {PanelMenu} from "primereact/panelmenu";
const Perfil = () => {
    const items=[
        {
            label:'Mis datos',
            icon:'pi pi-fw pi-file',
            items:[
                {
                    label:'New',
                    icon:'pi pi-fw pi-plus',
                },
                {
                    label:'Delete',
                    icon:'pi pi-fw pi-trash'
                },
                {
                    label:'Export',
                    icon:'pi pi-fw pi-external-link'
                }
            ]
        },
        {
            label:'Mis cursos',
            icon:'pi pi-fw pi-file',
            items:[
                {
                    label:'En proceso',
                    icon:'pi pi-fw pi-plus',
                },
                {
                    label:'En espera',
                    icon:'pi pi-fw pi-trash'
                },
                {
                    label:'Export',
                    icon:'pi pi-fw pi-external-link'
                }
            ]
        },
        {
            label:'Mi agenda',
            icon:'pi pi-fw pi-file',
            items:[
                {
                    label:'New',
                    icon:'pi pi-fw pi-plus',
                    items:[
                        {
                            label:'Bookmark',
                            icon:'pi pi-fw pi-bookmark'
                        },
                        {
                            label:'Video',
                            icon:'pi pi-fw pi-video'
                        }
                    ]
                },
                {
                    label:'Delete',
                    icon:'pi pi-fw pi-trash'
                },
                {
                    label:'Export',
                    icon:'pi pi-fw pi-external-link'
                }
            ]
        },
        {
            label:'File',
            icon:'pi pi-fw pi-file'
        }
        ]
  return(
      <div className={"panel-p seccion-1"}>

          <div className={"row"}>
              <div className={"col-md-12"}>
                  <BarMenu/>
              </div>
              <div className={"col-md-3"}>
                Perfil
                  <div className={"row"}>
                      <div className={"col-md-12"}>
                          <div className="card flex justify-content-center">
                              <PanelMenu model={items} className="w-full md:w-25rem" />
                          </div>
                      </div>
                  </div>
              </div>

          </div>

          <Footer/>

      </div>
  )
}

export default Perfil