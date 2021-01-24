import React from "react"
import { Link } from 'react-router-dom'
import logoAngular from "../../img/angular.png"
import logoJava from "../../img/java.png"
import logoCSharp from "../../img/csharp.png"
import logoFlutter from "../../img/flutter.png"
import "./nuestroscursos.css"

const cursos = [
  {
    id: "IrnTmomFcr5EGtcMVFGd",
    fondo: "linear-gradient(236.89deg, #FF171B -26.25%, #FF7779 252.45%)",
    nombre: "Angular",
    icono: logoAngular,
  },
  {
    id: "RMncpHvuu5rVYFEU6nyE",
    fondo: "linear-gradient(232.22deg, #F23D04 26.28%, #FFD540 127.09%)",
    nombre: "Java",
    icono: logoJava,
  },
  {
    id: "YfzTQFJAonwTWDv62MQu",
    fondo: "linear-gradient(232.22deg, rgba(103,27,122,1) 26.28%, rgba(204,170,212,1) 127.09%)",
    nombre: "C#",
    icono: logoCSharp,
  },
  {
    id: "6Hu8PMszA9mub0MNG0Ec",
    fondo: "linear-gradient(232.22deg, #048EF2 26.28%, #40FFFF 127.09%)",
    nombre: "Flutter",
    icono: logoFlutter,
  },

]

export default function Header() {
  return (
    <section className="seccion">
      <div className="contenedor contenedor-85">
        <h2 className="titulo-seccion">¡Algunos de nuestros cursos!</h2>
        <div className="nuestros-cursos">
          {
            cursos.map(curso => (
              <Link
                key={curso.id}
                className="curso-muestra"
                style={{ background: curso.fondo }}
                to={`/course/?id=${curso.id}`}>
                <img src={curso.icono} alt="logo-curso" />
                <h3>{curso.nombre}</h3>
              </Link>
            ))
          }
        </div>
      </div>
    </section>
  )
}
