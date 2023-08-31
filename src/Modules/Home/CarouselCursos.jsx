import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
//import { Carousel } from 'primereact/carousel';
import listCursos from '../../Assets/json/cursos.json';
import "../../Styles/Home.scss"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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
    useEffect(() => {
        setProducts(listCursos)
    }, []);
    const productTemplate = (product) => {

        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3 ">
                <p style={{color: "white"}}>{product.id}</p>
                <div className="mb-3 img-carousel">
                    <img src={require(`../../Assets/${product.image}`)} alt={product.name} className="w-6 shadow-2" />
                </div>
                <div>
                    <h4 className="mb-1 title-carusel">{product.name}</h4>
                    <h6 className="mt-0 mb-3 desc-carousel">{product.description}</h6>
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-pencil" label="Inscribirse" className={"b-carousel"} onClick={()=>window.open("#/login", "_self")}/>
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
                  autoPlay={props.deviceType !== "mobile"}
                  autoPlaySpeed={3000}
                  keyBoardControl={true}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  deviceType={props.deviceType}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"

        >
            {
                products.map(product=>(
                    productTemplate(product)
                ))
            }

        </Carousel>
    )
}
export default CarouselCursos