import React, { useState, useEffect } from 'react'
import TarjetaEdicion from './tarjeta_edicion_clase'
import GridLoader from "react-spinners/GridLoader"
import { css } from "@emotion/core"
import { guardarClaseAdmin, actClaseAdmin, eliminarClaseAdmin } from '../../api'
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal'

const override = css`
  display: block;
  margin: 50px auto;
  background-color: 'green';
`;

const Edicion = (props) => {

    const [clases, estClases] = useState([]);
    const [ordenCorrelativo, estOrdenCorrelativo] = useState(0);

    const obtenerOrdenCorrelativo = (clases) => {
        if (clases) {
            let max = 0;
            clases.map(clase => {
                if (clase.orden > max) {
                    max = clase.orden;
                }
            })
            return max + 1;
        }
        return 0;
    }

    useEffect(() => {
        estClases(props.clases);
        estOrdenCorrelativo(obtenerOrdenCorrelativo(props.clases));
    }, [props.clases]);

    const agregar = (clase) => {
        guardarClaseAdmin(clase)
            .then(() => {
                props.guardarCambios();
            });
    }

    const actualizar = (clase) => {
        actClaseAdmin(clase)
            .then(() => {
                props.guardarCambios();
            });
    }

    const eliminar = (id) => {
        eliminarClaseAdmin(id)
            .then(() => {
                props.guardarCambios();
            })
    }

    return (
        <Modal show={props.mostrar} onHide={props.cancelar} backdrop={'static'} keyboard={false} size={'xl'}>
            <Modal.Header closeButton>
                <Modal.Title>Editar clases</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    props.cargandoClases
                        ?
                        <GridLoader css={override} loading={props.cargandoClases} size={10} />
                        :
                        props.clases && props.clases.length > 0
                            ?
                            <>
                                <TarjetaEdicion
                                    idCurso={props.idCurso}
                                    agregar={agregar}
                                    correlativo={ordenCorrelativo}
                                    nueva />
                                {
                                    clases.map(clase => (
                                        <TarjetaEdicion
                                            idCurso={props.idCurso}
                                            actualizar={actualizar}
                                            eliminar={eliminar}
                                            clase={clase}
                                            key={clase.id} />
                                    ))
                                }
                            </>
                            :
                            <>
                                <TarjetaEdicion
                                    idCurso={props.idCurso}
                                    agregar={agregar}
                                    correlativo={1}
                                    nueva />
                                <p>No hay clases registradas</p>
                            </>
                }
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-danger" onClick={props.cancelar}>Cerrar</button>
            </Modal.Footer>
        </Modal>
    )
}

Edicion.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string,
        titulo: PropTypes.string,
        ulrImg: PropTypes.string,
        urlInscripcion: PropTypes.string,
        objetivo: PropTypes.string,
        descBreve: PropTypes.string,
        descExtendida: PropTypes.string,
        requisitos: PropTypes.arrayOf(PropTypes.string),
        dias: PropTypes.arrayOf(PropTypes.string),
        fInicioFin: PropTypes.arrayOf(PropTypes.string),
        hInicioFin: PropTypes.arrayOf(PropTypes.string),
        excepciones: PropTypes.arrayOf(PropTypes.string),
        cancelaciones: PropTypes.arrayOf(PropTypes.string),
        idProfesor: PropTypes.string,
        clases: PropTypes.arrayOf(PropTypes.object)
    })
}

Edicion.defaultProps = {
    data: {
        id: null,
        titulo: '',
        urlImg: '',
        urlInscripcion: '',
        objetivo: '',
        descBreve: '',
        descExtendida: '',
        requisitos: [],
        dias: [],
        fInicioFin: [],
        hInicioFin: [],
        excepciones: [],
        cancelaciones: [],
        idProfesor: '',
        clases: []
    }
}

export default Edicion;