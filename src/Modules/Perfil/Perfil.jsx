import BarMenu from "../../Components/BarMenu";
import Container from "../../Components/Container";
import img_perfil from "../../Assets/Images/perfil.jpg"
import PanelMisDatos from "../../Components/Administracion/Perfil/PanelMisDatos";
import {FaUserEdit} from "react-icons/fa";
import {useState} from "react";
import PanelMisCursos from "../../Components/Administracion/Perfil/PanelMisCursos";
import PanelProgramacion from "../../Components/Administracion/Programacion/PanelProgramacion";
import PanelMiAgenda from "../../Components/Administracion/Perfil/PanelMiAgenda";
import {useSelector} from "react-redux";
import Session from "../../Services/Session";


const onChangeMenu = (item) => {
    switch (item) {
        case "Mis datos":
            return <PanelMisDatos title={item}/>
            break
        case "Mis cursos":
            return <PanelMisCursos title={item}/>
            break
        case "Mi agenda":
            return <PanelMiAgenda title={item}/>
            break
        default:
            return <PanelMisDatos title={item}/>
    }
}
const Perfil = () => {
    const user = Session.getUser()
    console.log("INFO: User ", user)
    const [optionMenu, setOptioMenu] = useState("Mis datos")
    const items=[
        {
            label:'Mis datos',
            icon:<FaUserEdit/>
        },
        {
            label:'Mis cursos',
            icon:<FaUserEdit/>
        },
        {
            label:'Mi agenda',
            icon:<FaUserEdit/>
        }
        ]
    const element = () => {
        return(
            <div className={"panel-p seccion-1"}>
                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <BarMenu/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-3 col-lg-2 row-left"}>
                        <h3 className={"title-perfil"}>Perfil</h3>
                    </div>
                </div>
                <div className={"row"} style={{height:"80vh"}}>
                    <div className={"col-md-3 col-lg-2  row-left"}>
                        <div className={"row"}>
                            <div className={"col-md-12"}>
                                <img src={user?.FOTO} className={"img-perfil"}  alt={""}/>
                            </div>
                            <div className={"col-md-12"}>
                                <h5>{user?.NOMBRE}</h5>
                            </div>
                            <div className={"col-md-12"}>
                                <h6>{user?.PUESTO}</h6>
                            </div>
                            <div className={"col-md-12"}>
                                <h6>NE {user?.NUM_EMPLEADO}</h6>
                            </div>
                            <div className={"col-md-12"}>
                                {
                                    items.map(row=>(
                                        <div className="perfil-panel-menu" onClick={(e)=>{
                                            console.log(e.target?.innerText)
                                            setOptioMenu(e.target?.innerText)
                                        }}>
                                            <div className={"menu-icon"}>{row?.icon}</div>
                                            <div className={"menu-title"}>{row?.label}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-9"}>
                        {onChangeMenu(optionMenu)}
                    </div>
                </div>
            </div>
        )
    }

  return(
      <Container element = {element()}/>
  )
}

export default Perfil