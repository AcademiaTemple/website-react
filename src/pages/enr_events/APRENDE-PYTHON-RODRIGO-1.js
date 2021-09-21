import React, { useState, useEffect } from 'react'
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar';
import DropdownImage from '../../components/dropdown-image';
import ClipLoader from "react-spinners/ClipLoader";
import Steps from '../../components/forms/forms-steps';
import StepManager from '../../components/forms/step-manager/step-manager';
import Fade from 'react-reveal/Fade';
import HelmetMetaData from "../../components/helmet";
import Avatar from "../../components/avatar";
import { aNombre } from '../../helpers/funcionesTexto';
import { esNombreInvalido, esEdadInvalida, esTelefonoInvalido, esCorreoInvalido, esProfesionInvalida } from '../../helpers/validadores';
import { guardarInscripcion } from '../../api';
import { useStepObserver } from '../../hooks/useStepObserver';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft, faAngleRight, faCheck, faCheckCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { contactTypes, fromTypes, knowLevelTypes } from '../../data/data';
import { faDiscord, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Link, useHistory } from 'react-router-dom';

// EDITAR

// Título principal del curso
const mainTitle = 'Introducción a Python';

// Nombre del profesor
const hostName = 'Rodrigo Suárez';

// Imagen de fondo
const backgroundImg = 'https://firebasestorage.googleapis.com/v0/b/academia-temple.appspot.com/o/formularios%2Fpastel-de-fua.jpg?alt=media&token=d0c9b41f-06ab-42d3-ba1d-f9c05c1b9ea3';

// Id del profesor
const teacherId = 'dXu1MzttIxa0tsTaEQV2';

// Img del profesor
const teacherImg = 'https://firebasestorage.googleapis.com/v0/b/academia-temple.appspot.com/o/profesores%2FdXu1MzttIxa0tsTaEQV2?alt=media&token=91f04c7d-fc1b-4581-a843-2f4b4b6597b3';

// Descripción corta del profesor
const teacherDescription = 'Bienvenidos a todos, Mi nombre es Rodrigo Suárez. Soy bachiller en Ciencias con mención en Ingeniería Informática por la PUCP con ganas de aprender constantemente y enseñar :). ';

// Grupos a los que se unirán: WSP, TELEGRAM, DISCORD
const joinGroups = [
    {
        type: 'WSP',
        link: 'https://chat.whatsapp.com/HORNWY3qmcdCkOldAmhkYI',
        icon: faWhatsapp
    },
    
];

// Descripción del curso
const MainDescription = () => (
    <>
        Si te gusta la tecnología y programación para crear cosas de tu imaginación, <b>hoy tienes esa oportunidad.</b><br /><br />
        Inscríbete y aprende <b>Python</b>.Los esperamos :). <br /><br /> 
        <b>Requisitos previos:  no hay requisitos y solo debes tener ganas de aprender. </b><br /><br />
        <b>Daremos certificado si asisten a la clase completa de manera puntual y entran al grupo de Whatsapp de solo python</b>.
    </>
);
//<b>Al final de esta clase,</b> te brindaremos un <b>certificado</b> si logras aprobar <b> el examen que el profesor propondrá al final de la clases</b>

// Número de sesiones
const numOfSessions = 1;

// Fecha(s) del evento
const dateTime = '30 de setiembre, de 7pm a 9pm (Hora Lima - Colombia)';

// Plataforma(s)
const platform = 'Google Meets y/o Discord';

////// NO EDITAR - Lógica

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
    const [profession, setProfession] = useState('');
    const [fromType, setFromType] = useState(fromTypes[0]);
    const [knowLevelType, setKnowLevelType] = useState(knowLevelTypes[0]);
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

    const updFromType = (val) => {
        setFromType(val);
    }

    const updKnowLevelType = (val) => {
        setKnowLevelType(val);
    }

    const updEmail = (e) => {
        setEmail(e.target.value);
    }

    const updProfession = (e) => {
        setProfession(e.target.value);
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

        const idEvento = history.location.pathname.toString().replace(/\//g, '').replace(/enr-event/g, '');

        const data = {
            eventId: idEvento,
            eventName: mainTitle,
            name: aNombre(name.trim()),
            age: parseInt(age),
            profession: profession,
            phone: phone.trim(),
            email: email.trim(),
            fromType: fromType.type,
            knowLevelType: knowLevelType.type
        };

        guardarInscripcion(data).then(() => {
            window.scrollTo(0, 0);
            setLoading(false);
            setSuccess(true);
        });
    }

    const checkErrors = () => {

        let error = (esNombreInvalido(name) || esEdadInvalida(age) || esTelefonoInvalido(phone) || esCorreoInvalido(email) || esProfesionInvalida(profession));

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
            <HelmetMetaData title={mainTitle + ' - Academia Temple'} description="¿Quieres destacar? Aprende C++." />
            <Navbar />
            <main className="cuerpo-pagina">
                <div className="full-background" style={{ backgroundImage: `url('${backgroundImg}')` }} />
                <section className='contenedor contenedor-60 section position-relative z-2'>
                    <h2 className='titulo-seccion mb-4 text-left titulo-curso'>{mainTitle}</h2>
                    <p className='descripcion-curso color-dark-blue'>Con {hostName}</p>
                </section>
                <section className='contenedor contenedor-60 position-relative'>
                    <div className='floating-form'>
                        {
                            success
                                ?
                                <div className='form-container text-align-center'>
                                    <Fade bottom>
                                        <FontAwesomeIcon color={'#3DE58D'} icon={faCheckCircle} style={{ fontSize: '8rem' }} />
                                        <h3 className='titulo-seccion mt-2 mb-2'>Listo</h3>
                                    </Fade>
                                    <p className='descripcion-curso m0-auto'>¡No olvides unirte a los grupos del curso!</p>
                                    <FontAwesomeIcon icon={faAngleDown} size='2x' />

                                    {
                                        joinGroups.map((group, index) => (
                                            <div className={`form-buttons-container ${index == 0 ? 'mt-3' : ''} ${index == joinGroups.length - 1 ? '' : 'mb-3'}`}>
                                                <a href={group.link} className='boton btn-principal m0-auto'>
                                                    <FontAwesomeIcon icon={group.icon} size='1x' />
                                                    {' '}
                                                    <span>
                                                        Unirme
                                                    </span>
                                                </a>
                                            </div>
                                        ))
                                    }
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
                                                        <p className='descripcion-curso no-break'>
                                                            <MainDescription />
                                                            <div className="contenedor-curso-profesor mt-5">
                                                                <div className="contenedor-img">
                                                                    <Avatar img={teacherImg} />
                                                                </div>
                                                                <div className="contenedor-descripcion">
                                                                    <h4>
                                                                        <Link to={`/teacher-detail/?id=${teacherId}`}>
                                                                            {hostName}
                                                                        </Link>
                                                                    </h4>
                                                                    <p className="descripcion-curso clamp clamp-2 no-break">
                                                                        {teacherDescription}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <b>*Si te inscribes e incumples, serás retirado del grupo.</b><br /><br />
                                                        </p>
                                                    </div>

                                                    <div className='form-group'>
                                                        <ul>
                                                            <li><b>Número de sesiones:</b> {numOfSessions}</li>
                                                            <li><b>Horarios:</b> {dateTime}</li>
                                                            <li><b>Profesor:</b> {hostName}</li>
                                                            <li><b>Plataforma:</b> {platform}</li>
                                                        </ul>
                                                    </div>

                                                    <div className='form-group'>
                                                        <p className='descripcion-curso'>Presiona siguiente para continuar.</p>
                                                    </div>

                                                </div>
                                                <div className='step-2'>

                                                    <div className='form-group'>
                                                        <label htmlFor="txtNombres">¿Cuáles son tus nombres completos?</label>
                                                        <input minLength="1" maxLength="50" type="text" value={name} onChange={updName} id="txtNombres" placeholder="Ejemplo: Alex Chancón" />
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
                                                            <label htmlFor="txtProfesion">¿Cuál es tu profesión o cuál estudias?</label>
                                                            <input minLength="1" maxLength="50" type="text" value={profession} onChange={updProfession} id="txtProfesion" placeholder="Ingresa tu profesión" />
                                                        </div>

                                                        <div className='form-group'>
                                                            <label htmlFor="txtLink">¿Cómo te enteraste del curso?</label>
                                                            <DropdownImage
                                                                stretch
                                                                selectedItem={fromType}
                                                                list={fromTypes}
                                                                select={updFromType} />
                                                        </div>

                                                        <div className='form-group'>
                                                            <label htmlFor="txtLink">¿Cuánto conoces del tema a dictar?</label>
                                                            <DropdownImage
                                                                stretch
                                                                selectedItem={knowLevelType}
                                                                list={knowLevelTypes}
                                                                select={updKnowLevelType} />
                                                        </div>

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
        </div >
    );
}

export default Inscripcion;