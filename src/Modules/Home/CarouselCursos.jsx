import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
//import { Carousel } from 'primereact/carousel';
import "../../Styles/Home.scss"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Services from "../../Services/Services";
import logoBM from "../../Assets/logoBM.png";

const  CarouselCursos =(props)=> {
    const [products, setProducts] = useState([]);
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
    const getMisCursos=()=>{
        Services.getMisCursos({ID_USUARIO:18})
            .then(res=>{
                console.log("mis cursos::", res)
                if(res?.status === 200){
                    if(res?.data?.row?.length > 0){
                        setProducts(res?.data?.row)
                    }
                }
            })
    }
    useEffect(() => {
        getMisCursos()
    }, []);
    const productTemplate = (product) => {

        return (
            <div className="car-cursos border-1 surface-border border-round m-2 text-center py-5 px-3 ">
                <p className={"title-carusel"} >{product?.NOMBRE}</p>
                <div className="mb-3 img-carousel">
                    <img src={product?.BANNER || logoBM} style={{width: "100%"}}/>
                </div>
                <div>
                    <h6 className="mt-0 mb-3 desc-carousel">{product?.DESCRIPCION}</h6>
                    {/*<div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-pencil" label="Inscribirse" className={"b-carousel"} onClick={()=>window.open("#/login", "_self")}/>
                    </div>*/}
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
                  itemClass="carousel-item-padding-40-px"

        >
            {
                props?.cursos?.map(product=>(
                    productTemplate(product)
                ))
            }

        </Carousel>
    )
}
export default CarouselCursos