import {Button} from 'primereact/button';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import CarouselCursos from "../../../Modules/Home/CarouselCursos";
import img_perfil from "../../../Assets/Images/perfil.jpg"
import cursos from "../../../Assets/json/cursos.json"
import Services from "../../../Services/Services";
import Session from "../../../Services/Session";

const FormMisDatos = (props) => {
    const user = Session.getUser()
    console.log("INFO: User ", !!user)
    const dispatch = useDispatch()
    const [misCursos, setMisCursos] = useState([])

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
    const addInscripcion = (data) => {
        Services.addInscripcion(data)
            .then(res=>{
                console.log(res)
                if(res?.status === 200){
                    getMisCursos()
                }
            })
    }

    const cardCurso =(item)=>{
        return (
            <div className={"col-md-4"}>
                <div className={"row div-card"}>
                    <div className={"col-md-5"}>
                        <img src={item?.image}/>
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
                <CarouselCursos cursos={misCursos}/>
            </diV>
            <div className={"col-md-12"}>
                <p className={"title-seccion"}>Cursos disponibles</p>
            </div>
            <diV className={"col-md-12"}>
                <div className={"row"}>
                    {misCursos.map(item=>(
                        cardCurso(item)
                    ))}
                </div>

            </diV>
        </div>
    )
}

export default FormMisDatos