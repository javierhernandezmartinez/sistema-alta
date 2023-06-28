import "../../Styles/Home.scss"
import { Menubar } from 'primereact/menubar';
import {InputText} from "primereact/inputtext";
import img1 from "../../Assets/img1.png"
import Footer from "../../Components/Footer";
import {Button} from "primereact/button";
import BarMenu from "../../Components/BarMenu/BarMenu";
import {PanelMenu} from "primereact/panelmenu";
import {useState} from "react";
import "../../Styles/Administration.scss"
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import empleados from "../../Assets/json/empleados.json"
import {Sidebar} from "primereact/sidebar";
import {Dialog} from "primereact/dialog";

const formEmpleados = (title, modalView, setModalView) => {
    const form = <div className={"row"}>
                            <div className={"col-md-3"}>
                                <div className="input-text">
                                    <label>Nombre</label>
                                    <InputText id="username" aria-describedby="username-help" />
                                </div>
                            </div>
                            <div className={"col-md-3"}>
                                <div className="input-text">
                                    <label>A. paterno</label>
                                    <InputText id="username" aria-describedby="username-help" />
                                </div>
                            </div>
                            <div className={"col-md-3"}>
                                <div className="input-text">
                                    <label>A. materno</label>
                                    <InputText id="username" aria-describedby="username-help" />
                                </div>
                            </div>
                            <div className={"col-md-3"}>
                                <div className="input-text">
                                    <label>Correo</label>
                                    <InputText id="username" aria-describedby="username-help" />
                                </div>
                            </div>
                            <div className={"col-md-3"}>
                                <div className="input-text">
                                    <label>Grupo</label>
                                    <InputText id="username" aria-describedby="username-help" />
                                </div>
                            </div>
                            <div className={"col-md-3"}>
                                <div className="input-text">
                                    <label>Area</label>
                                    <InputText id="username" aria-describedby="username-help" />
                                </div>
                            </div>
                            <div className={"col-md-3"}>
                                <div className="input-text">
                                    <label>Departamento</label>
                                    <InputText id="username" aria-describedby="username-help" />
                                </div>
                            </div>
                            <div className={"col-md-3"}>
                                <div className="input-text">
                                    <label>Tipo</label>
                                    <InputText id="username" aria-describedby="username-help" />
                                </div>
                            </div>
                            <div className={"col-md-3"}>
                                <div className="input-text">
                                    <label>Activo</label>
                                    <InputText id="username" aria-describedby="username-help" />
                                </div>
                            </div>
                        </div>
  return(
      <div  className={"row"}>
          <div className={"col-md-12"}>
              <p>{title}</p>
          </div>

          <div className={"col-md-12"}>
              <Button label={"Nuevo empleado"} onClick={()=>setModalView(true)}/>
          </div>
          <div className={"col-md-12"}>
              <DataTable value={empleados}
                         tableStyle={{ minWidth: '50rem' }}
                         paginator
                         rows={5}
                         rowsPerPageOptions={[5, 10, 25, 50]}
                         dataKey="id"
                         filterDisplay="row"
              >
                  <Column field="id" header="Id empleado" ></Column>
                  <Column field="name" header="name" ></Column>
                  <Column field="a_paterno" header="Apellido P." ></Column>
                  <Column field="a_materno" header="Apellido M." ></Column>
                  <Column field="correo" header="Correo" ></Column>
                  <Column field="id_grupo" header="Grupo"></Column>
                  <Column field="id_area" header="Area"></Column>
                  <Column field="id_departamento" header="Departamento"></Column>
                  <Column field="tipo" header="Tipo"></Column>
                  <Column field="activo" header="Activo"></Column>
              </DataTable>

          </div>
          {
              modalForm(modalView, setModalView, form)
          }
      </div>
  )
}
const formCursos = (title, modalView, setModalView) => {
    const form = <div className={"row"}>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Nombre</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Capacitador</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Activo</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Fecha inicio</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Fecha fin</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Hora inicio</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Hora fin</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Dias semana</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Limite participantes</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Limite espera</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Empresa</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Lugar</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Sala</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Color</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Liga</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
    </div>
    return(
        <div  className={"row"}>
            <div className={"col-md-12"}>
                <p>{title}</p>
            </div>

            <div className={"col-md-12"}>
                <Button label={"Nuevo empleado"} onClick={()=>setModalView(true)}/>
            </div>
            <div className={"col-md-12"}>
                <DataTable value={empleados}
                           tableStyle={{ minWidth: '50rem' }}
                           paginator
                           rows={5}
                           rowsPerPageOptions={[5, 10, 25, 50]}
                           dataKey="id"
                           filterDisplay="row"
                >
                    <Column field="id" header="Id empleado" ></Column>
                    <Column field="name" header="name" ></Column>
                    <Column field="a_paterno" header="Apellido P." ></Column>
                    <Column field="a_materno" header="Apellido M." ></Column>
                    <Column field="correo" header="Correo" ></Column>
                    <Column field="id_grupo" header="Grupo"></Column>
                    <Column field="id_area" header="Area"></Column>
                    <Column field="id_departamento" header="Departamento"></Column>
                    <Column field="tipo" header="Tipo"></Column>
                    <Column field="activo" header="Activo"></Column>
                </DataTable>

            </div>
            {
                modalForm(modalView, setModalView, form)
            }
        </div>
    )
}
const formGrupos = (title, modalView, setModalView) => {
    const form = <div className={"row"}>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Nombre</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Activo</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
    </div>
    return(
        <div  className={"row"}>
            <div className={"col-md-12"}>
                <p>{title}</p>
            </div>

            <div className={"col-md-12"}>
                <Button label={"Nuevo empleado"} onClick={()=>setModalView(true)}/>
            </div>
            <div className={"col-md-12"}>
                <DataTable value={empleados}
                           tableStyle={{ minWidth: '50rem' }}
                           paginator
                           rows={5}
                           rowsPerPageOptions={[5, 10, 25, 50]}
                           dataKey="id"
                           filterDisplay="row"
                >
                    <Column field="id" header="Id empleado" ></Column>
                    <Column field="name" header="name" ></Column>
                    <Column field="a_paterno" header="Apellido P." ></Column>
                    <Column field="a_materno" header="Apellido M." ></Column>
                    <Column field="correo" header="Correo" ></Column>
                    <Column field="id_grupo" header="Grupo"></Column>
                    <Column field="id_area" header="Area"></Column>
                    <Column field="id_departamento" header="Departamento"></Column>
                    <Column field="tipo" header="Tipo"></Column>
                    <Column field="activo" header="Activo"></Column>
                </DataTable>

            </div>
            {
                modalForm(modalView, setModalView, form)
            }
        </div>
    )
}
const formAreas = (title, modalView, setModalView) => {
    const form = <div className={"row"}>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Nombre</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Activo</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
    </div>
    return(
        <div  className={"row"}>
            <div className={"col-md-12"}>
                <p>{title}</p>
            </div>

            <div className={"col-md-12"}>
                <Button label={"Nuevo empleado"} onClick={()=>setModalView(true)}/>
            </div>
            <div className={"col-md-12"}>
                <DataTable value={empleados}
                           tableStyle={{ minWidth: '50rem' }}
                           paginator
                           rows={5}
                           rowsPerPageOptions={[5, 10, 25, 50]}
                           dataKey="id"
                           filterDisplay="row"
                >
                    <Column field="id" header="Id empleado" ></Column>
                    <Column field="name" header="name" ></Column>
                    <Column field="a_paterno" header="Apellido P." ></Column>
                    <Column field="a_materno" header="Apellido M." ></Column>
                    <Column field="correo" header="Correo" ></Column>
                    <Column field="id_grupo" header="Grupo"></Column>
                    <Column field="id_area" header="Area"></Column>
                    <Column field="id_departamento" header="Departamento"></Column>
                    <Column field="tipo" header="Tipo"></Column>
                    <Column field="activo" header="Activo"></Column>
                </DataTable>

            </div>
            {
                modalForm(modalView, setModalView, form)
            }
        </div>
    )
}
const formDepartamentos = (title, modalView, setModalView) => {
    const form = <div className={"row"}>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Nombre</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Activo</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
    </div>
    return(
        <div  className={"row"}>
            <div className={"col-md-12"}>
                <p>{title}</p>
            </div>

            <div className={"col-md-12"}>
                <Button label={"Nuevo empleado"} onClick={()=>setModalView(true)}/>
            </div>
            <div className={"col-md-12"}>
                <DataTable value={empleados}
                           tableStyle={{ minWidth: '50rem' }}
                           paginator
                           rows={5}
                           rowsPerPageOptions={[5, 10, 25, 50]}
                           dataKey="id"
                           filterDisplay="row"
                >
                    <Column field="id" header="Id empleado" ></Column>
                    <Column field="name" header="name" ></Column>
                    <Column field="a_paterno" header="Apellido P." ></Column>
                    <Column field="a_materno" header="Apellido M." ></Column>
                    <Column field="correo" header="Correo" ></Column>
                    <Column field="id_grupo" header="Grupo"></Column>
                    <Column field="id_area" header="Area"></Column>
                    <Column field="id_departamento" header="Departamento"></Column>
                    <Column field="tipo" header="Tipo"></Column>
                    <Column field="activo" header="Activo"></Column>
                </DataTable>

            </div>
            {
                modalForm(modalView, setModalView, form)
            }
        </div>
    )
}
const formProgramacion = (title, modalView, setModalView) => {
    const form = <div className={"row"}>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Empleado</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Curso</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Fecha</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Asistencia</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Consec</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Estatus</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
        <div className={"col-md-3"}>
            <div className="input-text">
                <label>Notas</label>
                <InputText id="username" aria-describedby="username-help" />
            </div>
        </div>
    </div>
    return(
        <div  className={"row"}>
            <div className={"col-md-12"}>
                <p>{title}</p>
            </div>

            <div className={"col-md-12"}>
                <Button label={"Nuevo empleado"} onClick={()=>setModalView(true)}/>
            </div>
            <div className={"col-md-12"}>
                <DataTable value={empleados}
                           tableStyle={{ minWidth: '50rem' }}
                           paginator
                           rows={5}
                           rowsPerPageOptions={[5, 10, 25, 50]}
                           dataKey="id"
                           filterDisplay="row"
                >
                    <Column field="id" header="Id empleado" ></Column>
                    <Column field="name" header="name" ></Column>
                    <Column field="a_paterno" header="Apellido P." ></Column>
                    <Column field="a_materno" header="Apellido M." ></Column>
                    <Column field="correo" header="Correo" ></Column>
                    <Column field="id_grupo" header="Grupo"></Column>
                    <Column field="id_area" header="Area"></Column>
                    <Column field="id_departamento" header="Departamento"></Column>
                    <Column field="tipo" header="Tipo"></Column>
                    <Column field="activo" header="Activo"></Column>
                </DataTable>

            </div>
            {
                modalForm(modalView, setModalView, form)
            }
        </div>
    )
}

const itemSelected = (title,modalView, setModalView) => {
  switch (title) {
      case "Empleados":
          return formEmpleados(title,modalView, setModalView);
          break;
      case "Cursos":
          return formCursos(title,modalView, setModalView);
          break;
      case "Grupos":
          return formGrupos(title,modalView, setModalView);
          break;
      case "Areas":
          return formAreas(title,modalView, setModalView);
          break;
      case "Departamentos":
          return formDepartamentos(title,modalView, setModalView);
          break;
      case "Programacion":
          return formProgramacion(title,modalView, setModalView);
          break;
  }
}
const modalForm = (modalView, setModalView, element = <></>) => {
  return(
      <Dialog header="Header" visible={modalView} style={{ width: '50vw' }} onHide={() => setModalView(false)}>
          {
              element
          }
      </Dialog>
  )
}
const Administration = () => {
    const [itemMenu, setItemMenu] = useState("Empleados")
    const [modalView, setModalView] = useState(false)
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
      <div className={"panel-p seccion-1"}>
          <div className={"row"}>
              <div className={"col-md-12"}>
                  <p className={"title-p"}>
                      AGENDA-T
                  </p>
                  <BarMenu/>
              </div>
              <div className={"col-md-3"}>
                  <div className="card flex justify-content-center">
                      <PanelMenu model={items} className="w-full md:w-25rem" onClick={(e)=>{
                          console.log(e.target.innerText)
                          setItemMenu(e.target.innerText)
                      }}/>
                  </div>
              </div>
              <div className={"col-md-9"}>
                  {
                      itemSelected(itemMenu, modalView, setModalView)
                  }
              </div>
          </div>
          <Footer/>

      </div>

  )
}

export default Administration