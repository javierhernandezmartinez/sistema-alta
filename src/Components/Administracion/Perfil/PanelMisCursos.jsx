import {Button} from 'primereact/button';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import CarouselCursos from "../../../Modules/Home/CarouselCursos";
import Services from "../../../Services/Services";
import Session from "../../../Services/Session";
import logoBM from "../../../Assets/logoBM.png";
import {listDataTable} from "../../../App/Features/AdministrationSlice";

const FormMisDatos = (props) => {
    const user = Session.getUser()
    console.log("INFO: User ", !!user)
    const [misCursos, setMisCursos] = useState([])
    const [cursos, setCursos] = useState([])

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
    const getCursosDisponibles = (dispatch)=>{
        Services.getCursos().then(res=> {
            console.log(res)
            if(res.status === 200 && res?.data?.row?.length > 0){
                setCursos(res?.data?.row)
            }
        })
    }
    const addInscripcion = (data) => {
        Services.addInscripcion(data)
            .then(res=>{
                console.log(res)
                if(res?.status === 200){
                    getMisCursos()
                    getCursosDisponibles()
                }
            })
    }

    const cardCurso =(item)=>{
        return (
            <div className={"col-md-4"}>
                <div className={"row div-card"}>
                    <div className={"col-md-5"}>
                        <img src={item?.BANNER || logoBM}/>
                    </div>
                    <div className={"col-md-7"}>
                        <div className={"row"}>
                            <div className={"col-md-12"}>
                                <h5>{item.NOMBRE}</h5>
                            </div>
                            <div className={"col-md-12"}>
                                <h6>{item.DESCRIPCION}</h6>
                            </div>
                            <div className={"col-md-12"}>
                                <Button onClick={()=>addInscripcion(item)}>
                                    Inscribirse
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    useEffect(()=>{
        getMisCursos()
        getCursosDisponibles()
    },[])

    const productTemplate = (product) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                </div>
                <div>
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-search" className="p-button p-button-rounded" />
                        <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
                    </div>
                </div>
            </div>
        );
    };
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
                <p className={"title-seccion"}>Cursos disponibles</p>
            </div>
            <diV className={"col-md-12"}>
                <div className={"row"}>
                    {cursos.map(item=>(
                        cardCurso(item)
                    ))}
                </div>

            </diV>
        </div>
    )
}

export default FormMisDatos