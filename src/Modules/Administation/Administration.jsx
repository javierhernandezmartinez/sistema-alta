import Footer from "../../Components/Footer";
import BarMenu from "../../Components/BarMenu";
import {PanelMenu} from "primereact/panelmenu";
import {useState} from "react";
import "../../Styles/Administration.scss"
import "../../Styles/Components/Components.scss"
import Container from "../../Components/Container";
import PanelEmpleado from "../../Components/Administracion/Empleado/PanelEmpleado";
import PanelCurso from "../../Components/Administracion/Cursos/PanelCurso";
import PanelGrupo from "../../Components/Administracion/Grupos/PanelGrupo";
import PanelArea from "../../Components/Administracion/Areas/PanelArea";
import PanelDepartamento from "../../Components/Administracion/Departamentos/PanelDepartamento";
import PanelProgramacion from "../../Components/Administracion/Programacion/PanelProgramacion";


const itemSelected = (title) => {
  switch (title) {
      case "Empleados":
          return <PanelEmpleado title={title}/>;
          break;
      case "Cursos":
          return <PanelCurso title={title}/>;
          break;
      case "Grupos":
          return <PanelGrupo title={title}/>;
          break;
      case "Areas":
          return <PanelArea title={title}/>;
          break;
      case "Departamentos":
          return <PanelDepartamento title={title}/>;
          break;
      case "Programacion":
          return <PanelProgramacion title={title}/>;
          break;
  }
}

const Element = (
    items,
    itemMenu,
    setItemMenu,
) => {
  return(
      <>
          <div className={"row"}>
              <div className={"col-md-12"}>
                  <BarMenu/>
              </div>
          </div>
          <div className={"row row-panel-admin"}>
              <div className={"col-md-3 col-lg-2"}>
                  <p className={"title-panel-admin"}>Administracion</p>
                  <PanelMenu model={items} className="w-full md:w-25rem menu-panel"
                             onClick={(e)=>{setItemMenu(e.target.innerText)}}
                  />
              </div>
              <div className={"col-md-9 col-lg-10"}>
                  {itemSelected(itemMenu)}
              </div>
          </div>
      </>
  )
}
const Administration = () => {
    const [itemMenu, setItemMenu] = useState("Empleados")
    const items=[
        {
            label:'Empleados',
            icon:'pi pi-fw pi-file',
        },
        {
            label:'Cursos',
            icon:'pi pi-fw pi-file',
        },
        {
            label:'Grupos',
            icon:'pi pi-fw pi-file',
        },
        {
            label:'Areas',
            icon:'pi pi-fw pi-file'
        },
        {
            label:'Departamentos',
            icon:'pi pi-fw pi-file'
        },
        {
            label:'Programacion',
            icon:'pi pi-fw pi-file'
        }
    ]
  return(
      <Container element = {
          Element(
              items,
              itemMenu,
              setItemMenu,
          )}/>
  )
}

export default Administration