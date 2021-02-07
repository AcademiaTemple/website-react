import React from "react"
import logoUsuario from "../../img/usuario.png"
import logoLentes from "../../img/lentes.png"
import logoLibros from "../../img/libro.png"
import logoCheck from "../../img/check.png"
import logoEstadistica from "../../img/estadistica.png"
import Fade from 'react-reveal/Fade'
import "./estadisticas.css"

export default function Estadisticas() {
  return (
    <section className="contenedor-estadisticas">
      <div className="contenedor contenedor-85 contenido-estadisticas">
        <div className="descripcion">
          <h2 className="fw-600">Conocimiento sin fronteras</h2>
          <p>
            Somos la academia Temple, la primera escuela de programación donde expertos y aprendices de todas
            partes del mundo crean y reciben clases hechas por ellos mismos.
          </p>
          <p>
            Inscríbete a nuestros cursos y talleres, el único requisito son tus deseos de aprender.
            Si quieres dictar en la comunidad, escríbenos.
          </p>
          <div className="iconos">
            <Fade down>
              <div className="icono">
                <p className="numero-estadistica">+5.4k</p>
                <div className="contenedor-img">
                    <img className="imagen-estadistica" src={logoUsuario} alt="logo-alumnos" />
                </div>
                <p className="texto-estadistica">Miembros</p>
              </div>
            </Fade>
            <Fade down>
              <div className="icono">
                <p className="numero-estadistica">+20</p>
                <div className="contenedor-img">
                    <img className="imagen-estadistica" src={logoLentes} alt="logo-alumnos" />
                </div>
                <p className="texto-estadistica">Docentes</p>
              </div>
            </Fade>
            <Fade down>
              <div className="icono">
                <p className="numero-estadistica">+30</p>
                <div className="contenedor-img">
                    <img className="imagen-estadistica" src={logoLibros} alt="logo-curso" />
                </div>
                <p className="texto-estadistica">Cursos</p>
              </div>
            </Fade>
          </div>
        </div>
        <div className="mision-vision">
          <div className="contenedor-mision-vision">
            <div>
              <img src={logoCheck} alt="logo-check" />
              <h2 className="fw-700 m-0 ml-4">Misión</h2>
            </div>
            <p>
              Buscamos usar la tecnología para facilitar el intercambio de conocimientos y fomentar un ambiente
              colaborativo donde todos pongan de su parte para lograr el aprendizaje.
            </p>
          </div>

          <div className="contenedor-mision-vision">
            <div>
              <img src={logoEstadistica} alt="logo-estadistica" />
              <h2 className="fw-700 m-0 ml-4">Visión</h2>
            </div>
            <p>
              Queremos ser la comunidad de facto en la que todos los apasionados de la programación
              piensen cuando tengan ganas de compartir sus conocimientos, aportar ideas o aprender algo nuevo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
