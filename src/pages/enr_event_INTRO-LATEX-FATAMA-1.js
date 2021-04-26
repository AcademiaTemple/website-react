import React, { useState, useEffect } from 'react'
import Footer from '../components/footer/footer';
import Navbar from '../components/navbar';
import DropdownImage from '../components/dropdown-image';
import ClipLoader from "react-spinners/ClipLoader";
import Steps from '../components/forms/forms-steps';
import StepManager from '../components/forms/step-manager/step-manager';
import Fade from 'react-reveal/Fade';
import HelmetMetaData from "../components/helmet";
import Avatar from "../components/avatar";
import ImgFondo from '../img/intro-latex-fatama-1.png';
import { aNombre, extraerLink } from '../helpers/funcionesTexto';
import { esNombreInvalido, esEdadInvalida, esTelefonoInvalido, esCorreoInvalido, esLinkInvalido } from '../helpers/validadores';
import { guardarInscripcion } from '../api';
import { useStepObserver } from '../hooks/useStepObserver';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft, faAngleRight, faCheck, faCheckCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { contactTypes, inscriptionTypes } from '../data/data';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Link, useHistory } from 'react-router-dom';

const steps = ['Inicio', 'Contacto', 'Listo'];
const chkPoints = [{ id: 'SI', name: 'Sí', abrev: 'Sí' }];

const overrideSpinnerInline = css`
  display: inline-block;
  vertical-align: middle;
`;

const Inscripcion = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(false); // Determina si se está enviando el form
    const [success, setSuccess] = useState(true); // Determina si se envío el form sin errores
    const { canGoBackwards, isLast } = useStepObserver(activeIndex, steps.length);

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [messengerType, setMessengerType] = useState(contactTypes[0]);
    const [email, setEmail] = useState('');
    const [inscriptionType, setInscriptionType] = useState(inscriptionTypes[0]);
    const [link, setLink] = useState('');
    const [points, setPoints] = useState([]);

    const history = useHistory();

    const updName = (e) => {
        setName(e.target.value);
    }

    const updAge = (e) => {
        setAge(e.target.value);
    }

    const updPhone = (e) => {
        setPhone(e.target.value);
    }

    const updMessengerType = (val) => {
        setMessengerType(val);
    }

    const updInscriptionType = (val) => {
        setInscriptionType(val);
    }

    const updLink = (e) => {
        setLink(e.target.value);
    }

    const updEmail = (e) => {
        setEmail(e.target.value);
    }

    const selectPoint = (id) => {
        if (includesPoint(id)) {
            setPoints(points.filter(p => p != id));
        } else {
            setPoints([...points, id]);
        }
    }

    const previous = (e) => {
        e.preventDefault();
        navigateTo(activeIndex - 1);
    }

    const next = (e) => {
        e.preventDefault();
        navigateTo(activeIndex + 1);
    }

    const send = async (e) => {
        e.preventDefault();
        if (!checkErrors()) {
            setLoading(true);
            saveChanges();
        }
    }

    const saveChanges = () => {

        const idEvento = history.location.pathname.toString().replace(/\//g, '').replace(/ins_evento/g, '');

        const data = {
            eventId: idEvento,
            eventName: 'III taller de Latex',
            name: aNombre(name.trim()),
            link: extraerLink(link.trim()),
            role: inscriptionType.type,
            age: parseInt(age),
            phone: phone.trim(),
            email: email.trim()
        };

        guardarInscripcion(data).then(() => {
            window.scrollTo(0, 0);
            setLoading(false);
            setSuccess(true);
        });
    }

    const checkErrors = () => {

        let error = (esNombreInvalido(name) || esEdadInvalida(age) || esTelefonoInvalido(phone) || esCorreoInvalido(email) || esLinkInvalido(link, inscriptionType.type != 'AUT'));

        // Custom errors
        if (!includesPoint('SI')) {
            error = 'Debes confirmar tu asistencia';
        }

        if (error) {
            alert(error);
            return true;
        };

        return false;
    }

    const includesPoint = (pointId) => {
        return points.find(p => p == pointId);
    }

    const navigateTo = (index) => {
        setActiveIndex(index);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setSuccess(false);
    }, [activeIndex]);

    return (
        <div>
            <HelmetMetaData title="III taller de introducción a LaTeX - Academia Temple" description="¿Quieres obras buenas? Acompáñanos en esta lectura en vivo y descubre los mejores escritos junto a Laydy Czulewyez." />
            <Navbar />
            <main className="cuerpo-pagina">
                <div className="full-background" style={{ backgroundImage: `url(${ImgFondo})` }} />
                <section className='contenedor contenedor-60 section position-relative z-2'>
                    <h2 className='titulo-seccion mb-4 text-left titulo-curso'>III taller de introducción a LaTeX</h2>
                    <p className='descripcion-curso color-dark-blue'>Con Jorge Fatama</p>
                </section>
                <section className='contenedor contenedor-60 position-relative'>
                    <div className='floating-form'>
                        {
                            success
                                ?
                                <div className='form-container text-align-center'>
                                    <Fade bottom>
                                        <FontAwesomeIcon color={'#3DE58D'} icon={faCheckCircle} style={{ fontSize: '8rem' }} />
                                        <h3 className='mt-1 mb-1'>Listo</h3>
                                    </Fade>
                                    <p className='txt-responsive-form m0-auto'>¡No olvides unirte al grupo! Presiona el botón de abajo</p>
                                    <FontAwesomeIcon icon={faAngleDown} size='2x' />

                                    <div className='form-buttons-container mt-3'>
                                        <a href="https://chat.whatsapp.com/DxKbgbkfa3j097I9mbbpAc" className='button button-green m0-auto'>
                                            <FontAwesomeIcon icon={faWhatsapp} size='1x' />
                                            {' '}
                                            <span>
                                                Unirme
                                            </span>
                                        </a>
                                    </div>
                                </div>
                                :
                                <>
                                    <Steps
                                        activeIndex={activeIndex}
                                        navigateTo={navigateTo}
                                        steps={steps} />
                                    <div className='form-container'>
                                        <form>
                                            <StepManager currentIndex={activeIndex}>
                                                <div className='step-1'>

                                                    <div className='form-group mb-0'>
                                                        <h2 className='titulo-seccion'>¡Bienvenido(a) al curso!</h2>
                                                        <p className='descripcion-curso'>
                                                            Inscríbete y <b>aprende a crear documentos profesionales</b> con uno de los lenguajes más conocidos
                                                        para ese propósito: <b>LaTeX</b>.<br /><br />
                                                        Las <b>fórmulas</b> matemáticas, los estilos y las <b>limitaciones</b> de Word serán cosa del pasado cuando domines
                                                        esta gran herramienta.<br /><br />
                                                            <b>Al final de este curso,</b> te brindaremos un <b>certificado</b> de participación si es que <b>asistes a todas
                                                        las clases</b>.
                                                        <div className="contenedor-curso-profesor mt-5">
                                                                <div className="contenedor-img">
                                                                    <Avatar img={'https://firebasestorage.googleapis.com/v0/b/academia-temple.appspot.com/o/profesores%2FpLmrref9VE4ywTYQMkIy?alt=media&token=b658cd73-73f9-4fad-8411-3dff5ece5ac8'} />
                                                                </div>
                                                                <div className="contenedor-descripcion">
                                                                    <h4>
                                                                        <Link to={`/teacher-detail/?id=${'pLmrref9VE4ywTYQMkIy'}`}>
                                                                            Jorge Fatama
                                                                        </Link>
                                                                    </h4>
                                                                    <p className="descripcion-curso clamp clamp-2">
                                                                        Mi nombre es Jorge Fatama. Soy bachiller en Ciencias con mención en Ingeniería Informática por la PUCP, con interés en un enfoque académico en bases de datos no relacionales.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <b>*Si te inscribes e incumples, serás retirado del grupo.</b><br /><br />
                                                        </p>
                                                    </div>

                                                    <div className='form-group'>
                                                        <ul>
                                                            <li><b>Número de sesiones:</b> 6</li>
                                                            <li><b>Profesor:</b> Jorge Fatama</li>
                                                            <li><b>Plataforma:</b> Google Meets</li>
                                                            <li><b>Horarios:</b> Viernes 23 abril a las 4pm (Hora Lima - Colombia)</li>
                                                        </ul>
                                                    </div>

                                                    <div className='form-group'>
                                                        <p className='descripcion-curso'>Presiona siguiente para continuar.</p>
                                                    </div>

                                                </div>
                                                <div className='step-2'>

                                                    <div className='form-group'>
                                                        <label htmlFor="txtNombres">¿Cómo te llamas?</label>
                                                        <input minLength="1" maxLength="50" type="text" value={name} onChange={updName} id="txtNombres" placeholder="Ingresa tus nombres" />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor="txtEdad">¿Qué edad tienes?</label>
                                                        <input type="number" min={10} max={99} value={age} onChange={updAge} id="txtEdad" placeholder="Ingresa tu edad" />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor="txtNumero">¿Con qué número entrarás? (con código de país)</label>
                                                        <div className='cbo-text'>
                                                            <DropdownImage
                                                                selectedItem={messengerType}
                                                                list={[contactTypes[0]]}
                                                                select={updMessengerType} />
                                                            <input type="text" value={phone} onChange={updPhone} id="txtNumero" placeholder="Ej: +51 999 999 999" />
                                                        </div>
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor="txtCorreo">Bríndanos tu correo de contacto</label>
                                                        <input minLength="6" maxLength="100" type="email" value={email} onChange={updEmail} id="txtCorreo" placeholder="Ingresa tu correo" />
                                                    </div>

                                                </div>
                                                <div className='step-3'>

                                                    <div className='form-group'>
                                                        <div className='form-group'>
                                                            <label htmlFor="txtLink">He leído los horarios y confirmo mi asistencia.</label>
                                                            {
                                                                chkPoints.map(point => {
                                                                    const included = includesPoint(point.id);
                                                                    return (
                                                                        <div key={point.id} onClick={() => selectPoint(point.id)} className={`chkTag ${included ? 'active' : ''}`}>
                                                                            {
                                                                                included
                                                                                    ?
                                                                                    <FontAwesomeIcon color={'white'} icon={faCheck} style={{ fontSize: '1.6rem' }} />
                                                                                    :
                                                                                    <FontAwesomeIcon color={'#adadad'} icon={faDotCircle} style={{ fontSize: '1.6rem' }} />
                                                                            }
                                                                            {' '}
                                                                            {point.name}
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </StepManager>
                                            <div className='form-buttons-container'>
                                                {
                                                    canGoBackwards && !loading
                                                    &&
                                                    <button onClick={previous} className='boton btn-principal'>
                                                        <FontAwesomeIcon icon={faAngleLeft} size='xl' />
                                                        {' '}
                                                        <span className='d-none d-md-inline'>
                                                            Anterior
                                                    </span>
                                                    </button>
                                                }
                                                {
                                                    loading
                                                        ?
                                                        <span className='boton btn-principal justify-self-right'>
                                                            Enviando
                                                            {' '}
                                                            <ClipLoader color={'#fff'} loading={true} css={overrideSpinnerInline} size={22} />
                                                        </span>
                                                        :
                                                        isLast
                                                            ?
                                                            <button onClick={send} className='boton btn-principal justify-self-right'>
                                                                <span className='d-none d-md-inline'>
                                                                    Enviar
                                                    </span>
                                                                {' '}
                                                                <FontAwesomeIcon icon={faCheck} size='xl' />
                                                            </button>
                                                            :
                                                            <button onClick={next} className='boton btn-principal justify-self-right'>
                                                                <span className='d-none d-md-inline'>
                                                                    Siguiente
                                                    </span>
                                                                {' '}
                                                                <FontAwesomeIcon icon={faAngleRight} size='xl' />
                                                            </button>
                                                }
                                            </div>
                                        </form>
                                    </div>
                                </>
                        }
                    </div>

                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Inscripcion;