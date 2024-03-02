import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import CarouselCursos from "../../../Modules/Home/CarouselCursos";
import Services from "../../../Services/Services";
import Session from "../../../Services/Session";
import logoBM from "../../../Assets/logoBM.png";
import {listDataTable} from "../../../App/Features/AdministrationSlice";
import {Toast} from "primereact/toast";
import FormGrupo from "../Grupos/FormGrupo";
import Modal from "../../Modal";
import {openModalForm} from "../../../App/Features/rootModalFormSlice";

const FormMisDatos = (props) => {
    const user = Session.getUser()
    let dispatch = useDispatch()
    console.log("INFO: User ", !!user)
    const [misCursos, setMisCursos] = useState([])
    const [cursos, setCursos] = useState([])
    let toast= useRef(null);


    const getMisCursos=()=>{
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
        dispatch(openModalForm())
    }

    const cardCurso =(item)=>{
        return (
            <div className={"col-12 col-sm-6 col-md-6 col-lg-4"}>
                <div className={"div-card"}>
                    <div className={"row"} style={{height: "100%", alignContent: "space-between"}}>

                        <div className={"col-5 col-sm-5 col-md-5 col-lg-5"}>
                            <img src={item?.BANNER || logoBM}/>
                        </div>

                        <div className={"col-7 col-sm-7 col-md-7 col-lg-7"}>
                            <div className={"row"}>
                                <div className={"col-md-12"}>
                                    <p className={"title-card"}>{item.CURSO}</p>
                                </div>
                                <div className={"col-md-12"}>
                                    <p className={"description-card"}>{item.DESCRIPCION}</p>
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
                                        <label>Horario: </label> <span>{item.H_INICIO.split(":")[0]}:{item.H_INICIO.split(":")[1]}</span> a <span>{item.H_FIN.split(":")[0]}:{item.H_FIN.split(":")[0]}</span>
                                    </p>
                                </div>
                            </div>
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

    const panelCurseDetail = () => {
      return(
          <div>

          </div>
      )
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
                        : <CarouselCursos cursos={misCursos}/>
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
            <Modal header={"Detalle de curso"}
                element = {panelCurseDetail()}
            />
        </div>
    )
}

export default FormMisDatos