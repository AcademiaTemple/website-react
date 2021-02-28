import React, { useState, useEffect } from "react"
import Navbar from "../components/navbar/navbar"
import Footer from "../components/footer/footer"
import AcordeonEpisodio from "../components/episodio/acordeon_episodios"
import queryString from 'query-string'
import GridLoader from "react-spinners/GridLoader"
import Fade from 'react-reveal/Fade'
import Avatar from "../components/avatar"
import { obtenerOracion } from '../helpers/funcionesTexto'
import { css } from "@emotion/core"
import { obtCursoExtendido } from '../api'
import { diasSemana, nombresDiasSemana } from '../components/cursos/cursos-data'
import { Link, useHistory } from "react-router-dom"
import moment from "moment"
import 'moment/locale/es'

const override = css`
  display: block;
  margin: 50px auto;
  background-color: 'green';
`;

const obtenerTextoFecha = ({ fInicioFin }) => {
    if (moment(fInicioFin[0], 'DD/MM/YYYY').format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
        return 'Hoy, ' + moment(fInicioFin[0], 'DD/MM/YYYY').format('D [de] MMMM')
    } else {
        const porcionFecha = moment(fInicioFin[0], 'DD/MM/YYYY').format('dddd, D [de] MMMM [del] YYYY');
        return obtenerOracion(porcionFecha);
    }
}

const obtenerTextoHorarios = ({ dias, hInicioFin, fInicioFin }) => {
    const porcionHora = 'de ' + moment(hInicioFin[0], 'HH:mm').format('hh:mma') + ' a ' + moment(hInicioFin[1], 'HH:mm').format('hh:mma');
    if (fInicioFin[0] === fInicioFin[1]) {
        return obtenerOracion(moment(fInicioFin[0], 'DD/MM/YYYY').format('dddd, D [de] MMMM [del] YYYY ')+porcionHora+' (Único día)');
    } else {
        const arrDias = dias.map(dia => {
            const indice = diasSemana.indexOf(dia);
            return nombresDiasSemana[indice];
        });
        return 'Cada ' + arrDias.join(', ') + ' ' + porcionHora
    }
}

const calcularTotalHoras = (clases) => {
    let totalMinutos = 0;

    // Sumo todas las horas y minutos
    clases.map(clase => {
        const hm = clase.duracion.split(' ');
        const horas = parseInt(hm[0], 10);
        const minutos = parseInt(hm[1], 10);
        totalMinutos += minutos;
        totalMinutos += (horas * 60);
        return { totalMinutos }
    })

    // Obtengo las horas y minutos completos
    const horas = totalMinutos / 60;
    const horasCompletas = Math.trunc(horas); // Parte entera
    const minutosCompletos = Math.trunc((horas % 1) * 60); // Parte decimal

    // Lo paso a formato horario
    return `${horasCompletas}h ${minutosCompletos}m`;
}

export default function Course(props) {
    const idCurso = queryString.parse(props.location.search).id;
    const [curso, estCurso] = useState({});
    const [cargando, estCargando] = useState(true);
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    useEffect(() => {
        estCargando(true);
        obtCursoExtendido(idCurso)
            .then(curso => {
                estCurso(curso);
                estCargando(false);
            })
    }, [idCurso]);

    const navegar = (idEpisodio) => {
        history.push(`/course-player/?id=${idCurso}&episode=${idEpisodio}`);
    }

    return (
        <div>
            <Navbar />
            <div className="cuerpo-pagina">
                {
                    curso && curso.urlImg
                    &&
                    <div className="contenedor-portada-curso">
                        <div className="fondo-portada-curso" style={{ backgroundImage: `url(${curso.urlImg})` }}></div>
                        <img src={curso?.urlImg} alt="portada-curso" />
                    </div>
                }
                <div className="contenedor contenedor-60">
                    <GridLoader css={override} loading={cargando} size={20} />
                    {
                        !cargando && curso.id
                        &&
                        <Fade bottom>
                            <h2 className="titulo-seccion mt-5 mb-5 text-left titulo-curso">{curso.titulo}</h2>
                            <div className="contenedor-controles-curso">
                                <a target="_blank" className="boton btn-principal btn-rep-curso d-block" href={curso.urlInscripcion}>
                                    <i className="fas fa-edit mr-3"></i>
                                    Inscribirme
                                </a>
                                <div className="contenedor-data-cursos">
                                    <div className="mr-md-5">
                                        <i className="fas fa-layer-group"></i>{' '}
                                        {curso.clases && curso.clases.length} Clases
                                </div>
                                    <div>
                                        <i className="far fa-clock"></i>{' '}
                                        {calcularTotalHoras(curso.clases)}
                                    </div>
                                </div>
                            </div>
                            <p className="descripcion-curso">
                                {curso.descExtendida}
                            </p>
                            <h3 className="subtitulo-descripcion-curso">¿Cuándo inicia?</h3>
                            <p className="descripcion-curso">
                                {obtenerTextoFecha(curso)}
                            </p>
                            <h3 className="subtitulo-descripcion-curso">¿En qué horarios?</h3>
                            <p className="descripcion-curso">
                                {obtenerTextoHorarios(curso)}
                            </p>
                            <h3 className="subtitulo-descripcion-curso">¿Qué aprenderás?</h3>
                            <p className="descripcion-curso">
                                {curso.objetivo}
                            </p>
                            <h3 className="subtitulo-descripcion-curso">Requisitos</h3>
                            <ul className="requisitos-curso">
                                {
                                    curso.requisitos.map((requisito, indice) => (
                                        <li key={indice}>{requisito}</li>
                                    ))
                                }
                            </ul>
                            <div className="contenedor-curso-profesor">
                                <div className="contenedor-img">
                                    <Avatar img={curso.profesor.img} />
                                </div>
                                <div className="contenedor-descripcion">
                                    <h4>
                                        <Link to={`/teacher-detail/?id=${curso.profesor.id}`}>
                                            {curso.profesor.nombres + ' ' + curso.profesor.apellidos}
                                        </Link>
                                    </h4>
                                    <p className="descripcion-curso clamp clamp-2">
                                        {curso.profesor.sobreMi}
                                    </p>
                                </div>
                            </div>
                            <h3 className="subtitulo-descripcion-curso">Lista de clases</h3>
                            {
                                curso.clases && curso.clases.length > 0
                                    ?
                                    <AcordeonEpisodio
                                        episodios={curso.clases}
                                        machucar={navegar} />
                                    :
                                    <p className="descripcion-curso">Aún no hay videos</p>
                            }
                        </Fade>
                    }
                    {
                        !cargando && !curso.id
                        &&
                        <p>No se pudo cargar el curso</p>
                    }
                </div>
                <Footer />
            </div>
        </div>
    )
}