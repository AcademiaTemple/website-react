import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from "../components/footer";
import GridLoader from "react-spinners/GridLoader";
import queryString from 'query-string';
import Avatar from "../components/avatar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FacebookShareButton } from "react-share";
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { obtenerFechaTexto } from '../helpers/funcionesTexto';
import { obtCertificado } from '../api';
import { css } from "@emotion/core";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { Link, useHistory } from 'react-router-dom';

const override = css`
  display: block;
  margin: 50px auto;
  background-color: 'green';
`;

const Previsualizacion = ({ location }) => {

    const [id, setId] = useState('');
    const [isTest, setIsTest] = useState(false);
    const [origin, setOrigin] = useState('OTHER');
    const [course, setCourse] = useState('');
    const [name, setName] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [issuedAt, setIssuedAt] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [resultUrl, setResultUrl] = useState('');
    const [success, setSuccess] = useState(false);
    const [numPages, setNumPages] = useState(0);

    const history = useHistory();

    useEffect(() => {

        const { test, origin, fbclid, templated } = queryString.parse(location.search);

        const idCert = history.location.pathname.toString().replace(/\//g, '').replace(/view-cert/g, '');

        if (test) {
            setIsTest(true);
        }
        if (templated) {
            setOrigin('MAIL');
        }

        if (origin == 'qr') {
            setOrigin('QR');
        }

        if (fbclid) {
            setOrigin('FB');
        }

        if (idCert) {
            obtCertificado(idCert).then(({ data, error }) => {
                if (!error) {
                    const { urlCert, curso, profesores, creadoEn, otorgadoA } = data;
                    setId(idCert);
                    setResultUrl(urlCert);
                    setCourse(curso);
                    setTeachers(profesores);
                    setIssuedAt(creadoEn);
                    setName(otorgadoA);
                    setIsLoading(false);
                } else {
                    alert('No se encontró el archivo. Intente más tarde');
                    setIsLoading(false);
                    setSuccess(false);
                }
            });
        } else {
            alert('Id inválido');
            setIsLoading(false);
            setSuccess(false);
        }

    }, [location]);

    const onDocumentLoadSuccess = ({ numPages = 0 }) => {
        setIsLoading(false);
        setSuccess(true);
        setNumPages(numPages);
    }

    const onDocumentError = () => {
        setIsLoading(false);
        setSuccess(false);
    }

    const url = process.env.REACT_APP_WEBSITE + '/' + window.location.pathname;

    return (
        <div>
            <Navbar />
            <div className="cuerpo-pagina">
                <GridLoader css={override} loading={isLoading} size={20} />
                {
                    resultUrl && !isLoading &&
                    <>
                        <section className='contenedor contenedor-visor-pdf position-relative'>
                            <div>
                                <h2 className="titulo-seccion">{course.nombre}</h2>
                                <Document
                                    file={resultUrl}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    onLoadError={onDocumentError}
                                    externalLinkTarget={'_blank'}>
                                    {
                                        Array.from(
                                            new Array(numPages),
                                            (el, index) => (
                                                <Page
                                                    key={`page_${index + 1}`}
                                                    pageNumber={index + 1}
                                                />
                                            ),
                                        )
                                    }
                                </Document>
                            </div>
                        </section>
                        <section className='contenedor contenedor-60 contenedor-datos-certificado'>
                            <h3 className="subtitulo-descripcion-curso mt-4">Otorgado a:</h3>
                            <p className="descripcion-curso">
                                {name}
                            </p>
                            <h3 className="subtitulo-descripcion-curso">Condición lograda:</h3>
                            <p className="descripcion-curso">
                                Completar el taller en vivo "Introducción a Spring Boot y Despliegue Continuo"
                    </p>
                            <h3 className="subtitulo-descripcion-curso">Profesores:</h3>
                            {
                                teachers.map(profesor => (
                                    <div className="contenedor-curso-profesor">
                                        <div className="contenedor-img">
                                            <Avatar img={profesor.imgUrl} />
                                        </div>
                                        <div className="contenedor-descripcion">
                                            <h4>
                                                <Link to={`/teacher-detail/?id=${profesor.id}`}>
                                                    {profesor.nombres}
                                                </Link>
                                            </h4>
                                            <p className="descripcion-curso clamp clamp-2">
                                                {profesor.sobreMi}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                            <h3 className="subtitulo-descripcion-curso">Curso:</h3>
                            <p className="descripcion-curso">
                                <a href="_blank" href={course.url}>{course.nombre}</a>
                            </p>
                            <h3 className="subtitulo-descripcion-curso">Emitido el:</h3>
                            <p className="descripcion-curso">
                                {obtenerFechaTexto(issuedAt.seconds * 1000)}
                            </p>
                        </section>
                    </>
                }
            </div>
            <Footer />
            <div className='bottom-prev-navbar'>
                <nav className='contenedor'>
                    <button className='button-purple position-relative p-0'>
                        <FacebookShareButton
                            url={url.toString()}
                            quote={'¡Hice un curso y obtuve un certificado en la Academia Temple!'}
                            className='py-08'
                            hashtag='#academiatemple'
                            style={{ width: '100%', height: '100%' }}>
                            <FontAwesomeIcon color={'white'} icon={faFacebook} className='icon' />
                            {' '}
                        Comparte
                    </FacebookShareButton>
                    </button>
                    <button className='button-purple' onClick={() => window.open(resultUrl)}>
                        <FontAwesomeIcon color={'white'} icon={faDownload} className='icon' />
                    </button>
                </nav>
            </div>
        </div>
    );
}

export default Previsualizacion;