import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import CarouselCursos from "../../../Modules/Home/CarouselCursos";
import Services from "../../../Services/Services";
import Session from "../../../Services/Session";
import logoBM from "../../../Assets/logoBM.png";
import {Toast} from "primereact/toast";
import Modal from "../../Modal";
import {closeModalForm, openModalForm} from "../../../App/Features/rootModalFormSlice";
import {Divider} from "primereact/divider";
import {confirmPopup, ConfirmPopup} from "primereact/confirmpopup";

const FormMisDatos = (props) => {
    const user = Session.getUser()
    let dispatch = useDispatch()
    console.log("INFO: User ", !!user)
    const [misCursos, setMisCursos] = useState([])
    const [cursos, setCursos] = useState([])
    const [cursoSelected, setCursoSelected] = useState({})
    let toast= useRef(null);


    const getMisCursos=()=>{
        setMisCursos([])
        Services.getMisCursos({ID_USUARIO:user.ID_USUARIO})
            .then(res=>{
                console.log("mis cursos::", res)
                if(res?.status === 200){
                    if(res?.data?.row?.length > 0){
                        setMisCursos(res?.data?.row)
                    }
                }
        })
    }
    const getProgramaciones = (dispatch)=>{
        Services.getProgramaciones().then(res=> {
            console.log("Programaciones")
            console.log(res)
            if(res.status === 200 && res?.data?.row?.length > 0){
                setCursos(res?.data?.row)
            }
        })
    }
    const addInscripcion = (data) => {
        Services.addInscripcion(
            {
                    ID_USUARIO: user.ID_USUARIO,
                    ID_PROGRAMACION: data.ID_PROGRAMACION
                }
            )
            .then(res=>{
                console.log(res)
                if(res?.status === 200){

                    if (res?.data?.message && res?.data?.message === 'TE HAS INSCRITO A UN NUEVO CURSO'){
                        toast.current.show(
                            {
                                severity: 'success',
                                summary: 'Message',
                                detail: res.data.message }
                        );
                    }else{
                        toast.current.show(
                            {
                                severity: res.data.message ? 'info' : "error",
                                summary: 'Message',
                                detail: res.data.message ? res.data.message : res.data.errorMessage }
                        );
                    }

                    getMisCursos()
                    getProgramaciones()
                }
            })
    }
    const verMas = (data) => {
        console.log(data)
        setCursoSelected(data)
        dispatch(openModalForm())
    }

    const cardCurso =(item)=>{
        return (
            <div className={"col-12 col-sm-6 col-md-6 col-lg-4"}>
                <div className={"div-card"}>
                    <div className={"row"} style={{height: "100%", alignContent: "space-between"}}>

                        <div className={"col-5 col-sm-5 col-md-5 col-lg-5"} style={{alignSelf: "center"}}>
                            <img src={item?.BANNER || logoBM}/>
                        </div>

                        <div className={"col-7 col-sm-7 col-md-7 col-lg-7"}>
                            <div className={"row"}>
                                <div className={"col-md-12"}>
                                    <p className={"title-card"}>{item.CURSO}</p>
                                </div>
                                <div className={"col-md-12"}>
                                    <p className={"description-card"}>{item.DESCRIPCION.substr(0,80)}{item.DESCRIPCION.length > 80 ? "..." : ""}</p>
                                </div>
                            </div>
                        </div>

                        <div className={"col-md-12"}>
                            <div className={"row"}>
                                <div className={"col-auto col-sm-auto col-md-12 col-lg-auto"}>
                                    <p className={"horario"}>
                                        <label>Del</label> <span>{item.F_INICIO.split("T")[0]}</span> al <span>{item.F_FIN.split("T")[0]}</span>
                                    </p>
                                </div>
                                <div className={"col-auto col-sm-auto col-md-12 col-lg-auto"}>

                                    <p className={"horario"}>
                                        <label>Horario: </label> <span>{item.H_INICIO.split(":")[0]}:{item.H_INICIO.split(":")[1]} hrs.</span> a <span>{item.H_FIN.split(":")[0]}:{item.H_FIN.split(":")[0]} hrs.</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={"col-md-12"}>
                            <p className={"capacitador-card"}>Por {item.CAPACITADOR}</p>
                        </div>


                        <div className={"col-md-12"}>
                            <div className={"row card-options"} style={{justifyContent: "end"}}>
                                <div className={"col-6 col-sm-auto col-md-auto"}>
                                    <label onClick={()=>addInscripcion(item)}>
                                        Inscribirse
                                    </label>
                                </div>
                                <div className={"col-6 col-sm-auto col-md-auto"}>
                                    <label onClick={()=>verMas(item)}>
                                        Ver mas...
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    const panelCurseDetail = (item) => {
      return(
          <div className={"row"}>
              <div className={"col-12 col-sm-12 col-md-12 col-lg-12"}>
                  <div className={"div-card div-card-modal"}>
                      <div className={"row"} style={{height: "100%", alignContent: "space-between"}}>
                          <div className={"col-md-12"}>
                              <p className={"title-card"}>Programacion: #{item.ID_PROGRAMACION || '---'}</p>
                          </div>
                          <div className={"col-5 col-sm-5 col-md-5 col-lg-5"} style={{alignSelf: "center"}}>
                              <img src={item?.BANNER || logoBM}/>
                          </div>

                          <div className={"col-7 col-sm-7 col-md-7 col-lg-7"}>
                              <div className={"row"}>
                                  <div className={"col-md-12"}>
                                      <p className={"title-card"}>{item.CURSO || item.NOMBRE}</p>
                                  </div>
                                  <div className={"col-md-12"}>
                                      <p className={"description-card"}>{item.DESCRIPCION}</p>
                                  </div>
                              </div>
                          </div>
                          <div className={"col-md-12"}>
                              <Divider />
                              <p className={"subtitle-modal"}>Horario</p>
                          </div>
                          <div className={"col-md-12"}>
                              <div className={"row"}>
                                  <div className={"col-auto col-sm-6 col-md-6 col-lg-6"}>
                                      <p className={"horario"}>
                                          <label>Del</label> <span>{item?.F_INICIO?.split("T")[0]}</span> al <span>{item?.F_FIN?.split("T")[0]}</span>
                                      </p>
                                  </div>
                                  <div className={"col-auto col-sm-6 col-md-6 col-lg-6"}>
                                      <p className={"horario"}>
                                          <label>Horario: </label> <span>{item?.H_INICIO?.split(":")[0]}:{item?.H_INICIO?.split(":")[1]} hrs.</span> a <span>{item.H_FIN?.split(":")[0]}:{item.H_FIN?.split(":")[0]} hrs.</span>
                                      </p>
                                  </div>
                              </div>
                          </div>
                          <div className={"col-md-12"}>
                              <Divider />
                              <p className={"subtitle-modal"}>Ubicacion</p>
                          </div>

                          <div className={"col-sm-6 col-md-6"}>
                              <p className={"capacitador-card"}>Empresa: {item.EMPRESA || '---'}</p>
                          </div>

                          <div className={"col-sm-6 col-md-6"}>
                              <p className={"capacitador-card"}>Liga: {item.LIGA || '---'}</p>
                          </div>
                          <div className={"col-sm-6 col-md-6"}>
                              <p className={"capacitador-card"}>Lugar: {item.LUGAR || '---'}</p>
                          </div>
                          <div className={"col-sm-6 col-md-6"}>
                              <p className={"capacitador-card"}>Sala: {item.SALA || '---'}</p>
                          </div>

                          {
                              item.LUGARES_DISPONIBLES ?
                                  <>
                                      <div className={"col-md-12"}>
                                          <Divider />
                                          <p className={"subtitle-modal"}>Disponibilidad</p>
                                      </div>
                                      <div className={"col-sm-6 col-md-4"}>
                                          <p className={"capacitador-card"}>Limite de participantes: {item.LIM_PARTICIPANTES || '---'}</p>
                                      </div>
                                      <div className={"col-sm-6 col-md-4"}>
                                          <p className={"capacitador-card"}>Lugares disponibles: {item.LUGARES_DISPONIBLES || '---'}</p>
                                      </div>
                                      <div className={"col-sm-6 col-md-4"}>
                                          <p className={"capacitador-card"}>Lugares ocupados: {item.LUGARES_OCUPADOS || '---'}</p>
                                      </div>
                                  </> : null
                          }


                          <div className={"col-sm-12 col-md-12"}>
                              <Divider />
                              <p className={"subtitle-modal"}>Impartido por: {item.CAPACITADOR || '---'}</p>
                          </div>

                          <div className={"col-md-12"}>
                              <div className={"row card-options"} style={{justifyContent: "end"}}>
                                  {
                                      !item.ID_INSCRIPCION ?
                                          <div className={"col-6 col-sm-auto col-md-auto"}>
                                              <label onClick={()=>addInscripcion(item)}>
                                                  Inscribirse
                                              </label>
                                          </div>
                                          : null
                                  }
                                  <div className={"col-6 col-sm-auto col-md-auto"}>
                                      <label onClick={()=>dispatch(closeModalForm())}>
                                          Cerrar
                                      </label>
                                  </div>

                              </div>
                          </div>



                      </div>

                  </div>
              </div>
          </div>
      )
    }

    const deleteInscripcion = (event, item) => {
        const accept = () => {
            Services.deleteInscripcion({ID_INSCRIPCION: item.ID_INSCRIPCION}).then(res => {
                    console.log(res)
                    if(res.status === 200) {
                        toast.current.show(
                            {
                                severity: res.data.message ? 'success' : "error",
                                summary: 'Message',
                                detail: res.data.message ? res.data.message : res.data.errorMessage
                            }
                        );
                        getMisCursos()
                    }

                }
            )
        };

        const reject = () => {
            toast.current.show({ severity: 'warn', summary: 'Denegado', detail: 'Proceso denegado', life: 3000 });
        };
        confirmPopup({
            target: event.currentTarget,
            message: 'Estas seguro de abandonar tu curso?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            acceptLabel: "Si",
            rejectLabel: "No",
            accept,
            reject
        });


    }

    useEffect(()=>{
        getMisCursos()
        getProgramaciones()
    },[])

    return(
        <div className={"row row-form"}>
            <div className={"col-md-12"}>
                <p className={"title-seccion"}>{props?.title}</p>
            </div>
            <diV className={"col-md-12"}>
                {
                    misCursos.length === 0 ?
                        <div className={"not-cursos"}>
                            <p>
                                No te has inscrito a ningún curso, decidete y comienza el reto.👇
                            </p>
                        </div>
                        : <CarouselCursos cursos={misCursos}
                                          verMas={verMas}
                                          getMisCursos={getMisCursos}
                                          deleteInscripcion={
                                              deleteInscripcion
                                          }
                        />
                }
            </diV>
            <div className={"col-md-12"}>
                <p className={"title-seccion"}>Programaciones</p>
            </div>
            <diV className={"col-md-12"}>
                <div className={"row"}>
                    {cursos.map(item=>(
                        cardCurso(item)
                    ))}
                </div>

            </diV>
            <Toast ref={toast} />
            <ConfirmPopup />
            <Modal header={"Detalle de curso"}
                element = {panelCurseDetail(cursoSelected)}
            />
        </div>
    )
}

export default FormMisDatos