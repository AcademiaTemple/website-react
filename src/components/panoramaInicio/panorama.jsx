import React from "react"
import Navbar from "../navbar/navbar"
import { Link } from "react-router-dom"
import "./panorama.css"

const PanoramaInicio = () => {
  return (
    <header className="bg-img">
      <Navbar usarTransparencia={true} />
      <div className="contenedor contenido-header">
        <h1>
          El secreto para salir adelante <br /> es simplemente empezar
        </h1>
        <Link className="boton boton-header-curso" to="/courses">
          Cursos
        </Link>
      </div>
    </header>
  )
}

export default PanoramaInicio;