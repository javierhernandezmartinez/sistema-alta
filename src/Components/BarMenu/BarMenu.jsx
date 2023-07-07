import "../../Styles/Header.scss";
import { Menubar } from 'primereact/menubar';
import {InputText} from "primereact/inputtext";
import logo from "../../Assets/img-logo.png"
import {Button} from "primereact/button";
import {useState} from "react";
const BarMenu = () => {
    const [mode, setMode] = useState(true)
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-file',
            command: () => { window.open("#/", "_self"); },
        },
        {
            label: 'Registrate',
            icon: 'pi pi-fw pi-calendar',
            command: () => { window.open("#/register", "_self"); },
        },
        {
            label: 'Login',
            icon: 'pi pi-fw pi-power-off',
            command: () => { window.open("#/login", "_self"); },
        },
        {
            label: 'Perfil',
            icon: 'pi pi-fw pi-power-off',
            command: () => { window.open("#/perfil", "_self"); },
        },
        {
            label: 'Administaciòn',
            icon: 'pi pi-fw pi-power-off',
            command: () => { window.open("#/administration", "_self"); },
        }
    ];
    const start = <img alt="logo" src={logo} height="40" className="mr-2"></img>;
    const end = <Button className={`pi ${mode ? "pi-sun" : "pi-moon"} button-mode`} onClick={()=>{setMode(!mode)}} />;
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