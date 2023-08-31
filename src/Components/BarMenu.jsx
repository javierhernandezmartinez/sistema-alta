import "../Styles/Components/Components.scss";
import { Menubar } from 'primereact/menubar';
import logo from "../Assets/img-logo.png"
import {Button} from "primereact/button";
import {useDispatch, useSelector} from "react-redux";
import {toogleTheme} from "../App/Features/ThemeSlice";
import {useState} from "react";

const BarMenu = () => {
    const theme = useSelector(state => state.rootTheme)
    const dispatch = useDispatch()
    const [optionSelect, setOptionSelect] = useState("Home")
    const items = [
        {
            label: 'Registrate',
            icon: 'pi pi-fw pi-calendar',
            command: (e) => { window.open("#/register", "_self"); setOptionSelect(e.item.label)},
            visible:true
        },
        {
            label: 'Iniciar sesion',
            icon: 'pi pi-fw pi-power-off',
            command: (e) => { window.open("#/login", "_self"); setOptionSelect(e.item.label)},
        },
        {
            label: 'Cerrar sesion',
            icon: 'pi pi-fw pi-power-off',
            command: (e) => { window.open("#/login", "_self"); setOptionSelect(e.item.label)},
            visible: true
        },
        {
            label: 'Perfil',
            icon: 'pi pi-fw pi-power-off',
            command: (e) => { window.open("#/perfil", "_self"); setOptionSelect(e.item.label)},
        },
        {
            label: 'Administaciòn',
            icon: 'pi pi-fw pi-power-off',
            command: (e) => { window.open("#/administration", "_self"); setOptionSelect(e.item.label)},
        }
    ];
    const start = <img alt="logo" src={logo} height="40" className="mr-2 logo-menu"
                       onClick={()=>{window.open("#/", "_self"); setOptionSelect("Home")}}/>;
    const end = <Button className={`pi ${theme ? "pi-sun" : "pi-moon"} button-mode`}
                        onClick={()=>{dispatch(toogleTheme(!theme))}}/>;
  return(
      <div className={"row"}>
          <div className={"col-md-12"}>
              <div className={"card div-head-menu"}>
                  <Menubar model={items} start={start} end={end}/>
              </div>
          </div>
      </div>
  )
}

export default BarMenu