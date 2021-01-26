import React from "react"
import Navbar from "../navbar/navbar"
import Fade from 'react-reveal/Fade'
import { Link } from "react-router-dom"
import "./panorama.css"

const PanoramaInicio = () => {
  return (
    <header className="bg-img">
      <Navbar usarTransparencia={true} />
      <div className="contenedor contenido-header">
        <Fade down>
          <h1>
            El secreto para salir adelante <br /> es simplemente empezar
        </h1>
        </Fade>
        <Fade down>
        <Link className="boton boton-header-curso" to="/courses">
          Cursos
        </Link>
        </Fade>
      </div>
    </header>
  )
}

export default PanoramaInicio;