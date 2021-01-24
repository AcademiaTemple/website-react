import React from "react"
import Carousel from "react-bootstrap/Carousel"
import { CarouselItem } from "react-bootstrap"
import Banner1 from '../../img/carrusel/Banner1.jpg';
import Banner2 from '../../img/carrusel/Banner2.jpg';
import Banner3 from '../../img/carrusel/Banner3.jpg';
import "./carrusel.css"

export default function Carrusele(props) {
  return (
    <div className="contenedor-carrusel">
      <Carousel>
        <CarouselItem>
          <img src={Banner1} alt="img-carrusel" />
        </CarouselItem>
        <CarouselItem>
          <img src={Banner2} alt="img-carrusel" />
        </CarouselItem>
        <CarouselItem>
          <img src={Banner3} alt="img-carrusel" />
        </CarouselItem>
      </Carousel>
    </div>
  )
}
