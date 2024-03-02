import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import "../../Styles/Home.scss"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import logoBM from "../../Assets/logoBM.png";
import Services from "../../Services/Services";

const  CarouselCursos =(props)=> {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const productTemplate = (item) => {
        return (
            <div className="car-cursos border-1 surface-border border-round m-2 text-center py-5 px-3 ">
                <div className={"row row-target"}>
                    <div className={"col-12 col-sm-12 col-md-12 col-lg-12"}>
                    <div className={"div-card"}>
                        <div className={"row"} style={{height: "100%", alignContent: "space-between"}}>

                            <div className={"col-5 col-sm-5 col-md-5 col-lg-5"} style={{alignSelf: "center"}}>
                                <img src={item?.BANNER || logoBM}/>
                            </div>

                            <div className={"col-7 col-sm-7 col-md-7 col-lg-7"}>
                                <div className={"row"}>
                                    <div className={"col-md-12"}>
                                        <p className={"title-card"}>{item.NOMBRE}</p>
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
                                        <label onClick={()=>{
                                            console.log("detalle: ", item)
                                            props.verMas(item)
                                        }}>
                                            Ver mas...
                                        </label>
                                    </div>
                                    <div className={"col-6 col-sm-auto col-md-auto"}>
                                        <label onClick={(event)=>{
                                            console.log("darse de baja")
                                            props.deleteInscripcion(event,item)
                                        }}>
                                            Quitar
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                </div>
            </div>
        );
    };

    return (
        <Carousel responsive={responsive}
                  swipeable={false}
                  draggable={false}
                  showDots={true}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  autoPlay={props?.deviceType !== "mobile"}
                  autoPlaySpeed={3000}
                  keyBoardControl={true}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  deviceType={props?.deviceType}
                  dotListClass="custom-dot-list-style"
                  prodClass="carousel-item-padding-40-px"
        >
            {
                props?.cursos?.map(item=>(
                    productTemplate(item)
                ))
            }
        </Carousel>
    )
}
export default CarouselCursos