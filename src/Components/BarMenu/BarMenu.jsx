import "../../Styles/Home.scss"
import { Menubar } from 'primereact/menubar';
import {InputText} from "primereact/inputtext";
const BarMenu = () => {
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-file',
            command: () => { window.open("/", "_self"); },
        },
        {
            label: 'Registrate',
            icon: 'pi pi-fw pi-calendar',
            command: () => { window.open("/register", "_self"); },
        },
        {
            label: 'Login',
            icon: 'pi pi-fw pi-power-off',
            command: () => { window.open("/login", "_self"); },
        }
    ];
    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = <InputText placeholder="Search" type="text" className="w-full" />;
  return(
      <div className={"panel-p seccion-1"}>
          <div className={"row"}>
              <div className={"col-md-12"}>
                  <div className={"card"}>
                      <Menubar model={items} start={start} end={end} />
                  </div>
              </div>
          </div>

      </div>

  )
}

export default BarMenu