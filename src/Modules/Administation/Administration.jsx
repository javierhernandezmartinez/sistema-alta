import BarMenu from "../../Components/BarMenu";
import {useEffect, useState} from "react";
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
import Session from "../../Services/Session";

const Administration = () => {
    const items=[
        {
            label:'Empleados',
            icon:<i className={"pi pi-briefcase"}/>,
            form:<PanelEmpleado title={'Empleados'}/>
        },
        {
            label:'Cursos',
            icon:<i className={"pi pi-book"}/>,
            form:<PanelCurso title={'Cursos'}/>
        },
        {
            label:'Grupos',
            icon:<i className={"pi pi-th-large"}/>,
            form:<PanelGrupo title={'Grupos'}/>
        },
        {
            label:'Areas',
            icon:<i className={"pi pi-qrcode"}/>,
            form:<PanelArea title={'Areas'}/>
        },
        {
            label:'Departamentos',
            icon:<i className={"pi pi-table"}/>,
            form:<PanelDepartamento title={'Departamentos'}/>
        },
        {
            label:'Programacion',
            icon:<i className={"pi pi-calendar"}/>,
            form:<PanelProgramacion title={'Programacion'}/>
        },
        {
            label:'Usuario',
            icon:<i className={"pi pi-users"}/>,
            form:<PanelUsuario title={'Usuario'}/>
        },
        {
            label:'Espera',
            icon:<i className={"pi pi-spinner"}/>,
            form:<PanelEspera title={'Sala de espera'}/>
        },
        {
            label:'Inscripciones',
            icon:<i className={"pi pi-pencil"}/>,
            form:<PanelInscripciones title={'Inscripciones'}/>
        },
    ]
    const [itemMenu, setItemMenu] = useState(null)
    const Element = <>
        <div className={"row"}>
            <div className={"col-md-12"}>
                <BarMenu/>
            </div>
        </div>
        <div className={"row"}>
            <div className={"col-md-12"}>
                <p className={"title-panel-admin"}>Administración</p>
            </div>
        </div>
        <div className={"row"} style={{height:"80vh"}}>
            <div className={"col-sm-12 col-md-3 col-lg-2 row-left menu-admin"}>
                <div className={"row"} style={{marginTop: "0.5rem"}}>
                    {
                        items.map(row=>(
                            <div className={"col-4 col-sm-4 col-md-12"}>
                                <div className={"perfil-panel-menu"} onClick={()=>{
                                    setItemMenu(row?.form)
                                }}>
                                    <div className={"row"}>
                                        <div className={"col-sm-auto col-md-auto"} >
                                            <div className={"menu-icon"}>{row?.icon}</div>
                                        </div>
                                        <div className={"col-sm-auto col-md-auto"} style={{padding: 0}}>
                                            <div className={"menu-title"}>{row?.label}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={"col-sm-12 col-md-9 col-lg-10"}>
                {itemMenu}
            </div>
        </div>
    </>
    useEffect(() => {
        if (!Session.getUser('user')){
            Session.removeUser()
        }else {
            if(Session.getUser('user').TIPO !== "Admin"){
                window.open("#/home", "_self");
            }
        }
        setItemMenu(items[0].form)
    }, []);
  return <Container element = {Element}/>
}

export default Administration