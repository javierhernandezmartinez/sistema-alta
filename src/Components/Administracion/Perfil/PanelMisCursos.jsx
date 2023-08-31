import {Button} from 'primereact/button';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import CarouselCursos from "../../../Modules/Home/CarouselCursos";
import "../../../Styles/PanelMisCursos.scss"
import img_perfil from "../../../Assets/Images/perfil.jpg"
import cursos from "../../../Assets/json/cursos.json"
const cardCurso =(item)=>{
    return (
            <div className={"col-md-4"}>
                    <div className={"row div-card"}>
                        <div className={"col-md-5"}>
                            <img src={require(`../../../Assets/${item.image}`)}/>
                        </div>
                        <div className={"col-md-7"}>
                            <div className={"row"}>
                                <div className={"col-md-12"}>
                                    <h5>Lorem Ipsum is simply</h5>
                                </div>
                                <div className={"col-md-12"}>
                                    <h6>Lorem Ipsum is simply dummy text of the printing and typesetting industry. description</h6>
                                </div>
                                <div className={"col-md-12"}>
                                    <Button>
                                        Inscribirse
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
    )
}
const FormMisDatos = (props) => {
    const dispatch = useDispatch()
    const [arrayList, setArrayList] = useState({...props.arrayList})

    useEffect(()=>{
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
                <p className={"title-seccion"}>{props.title}</p>
            </div>
            <diV className={"col-md-12"}>
                <CarouselCursos/>
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