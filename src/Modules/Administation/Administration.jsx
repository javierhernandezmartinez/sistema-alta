import BarMenu from "../../Components/BarMenu";
import {PanelMenu} from "primereact/panelmenu";
import {useState} from "react";
import Container from "../../Components/Container";
import PanelEmpleado from "../../Components/Administracion/Empleado/PanelEmpleado";
import PanelCurso from "../../Components/Administracion/Cursos/PanelCurso";
import PanelGrupo from "../../Components/Administracion/Grupos/PanelGrupo";
import PanelArea from "../../Components/Administracion/Areas/PanelArea";
import PanelDepartamento from "../../Components/Administracion/Departamentos/PanelDepartamento";
import PanelProgramacion from "../../Components/Administracion/Programacion/PanelProgramacion";
import PanelUsuario from "../../Components/Administracion/Usuarios/PanelUsuario";
import PanelEspera from "../../Components/Administracion/SalaEspera/PanelEspera";
import PanelInscripciones from "../../Components/Administracion/Inscripciones/PanelInscripciones";

const Administration = () => {
    const items=[
        {
            label:'Empleados',
            icon:'pi pi-fw pi-file',
            form:<PanelEmpleado title={'Empleados'}/>
        },
        {
            label:'Cursos',
            icon:'pi pi-fw pi-file',
            form:<PanelCurso title={'Cursos'}/>
        },
        {
            label:'Grupos',
            icon:'pi pi-fw pi-file',
            form:<PanelGrupo title={'Grupos'}/>
        },
        {
            label:'Areas',
            icon:'pi pi-fw pi-file',
            form:<PanelArea title={'Areas'}/>
        },
        {
            label:'Departamentos',
            icon:'pi pi-fw pi-file',
            form:<PanelDepartamento title={'Departamentos'}/>
        },
        {
            label:'Programacion',
            icon:'pi pi-fw pi-file',
            form:<PanelProgramacion title={'Programacion'}/>
        },
        {
            label:'Usuario',
            icon:'pi pi-fw pi-file',
            form:<PanelUsuario title={'Usuario'}/>
        },
        {
            label:'Espera',
            icon:'pi pi-fw pi-file',
            form:<PanelEspera title={'Sala de espera'}/>
        },
        {
            label:'Inscripciones',
            icon:'pi pi-fw pi-file',
            form:<PanelInscripciones title={'Inscripciones'}/>
        },
    ]
    const [itemMenu, setItemMenu] = useState(items[0])
    const Element = <>
        <div className={"row"}>
            <div className={"col-md-12"}>
                <BarMenu/>
            </div>
        </div>
        <div className={"row row-panel-admin"}>
            <div className={"col-md-3 col-lg-2"}>
                <p className={"title-panel-admin"}>Administracion</p>
                <PanelMenu model={items} className="w-full md:w-25rem menu-panel"
                           onClick={(e)=>{
                               setItemMenu(items.filter(item => item.label === e.target.innerText)[0])
                           }}
                />
            </div>
            <div className={"col-md-9 col-lg-10"}>
                {itemMenu.form}
            </div>
        </div>
    </>
  return <Container element = {Element}/>
}

export default Administration