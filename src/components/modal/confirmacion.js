import React from 'react'
import Modal from 'react-bootstrap/Modal'

const Confirmacion = (props) => {
    return (
        <Modal show={props.mostrar} onHide={props.cancelar} backdrop={'static'} keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Confirmación
                </Modal.Title>                
            </Modal.Header>
            <Modal.Body>
                {props.texto}
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-danger" onClick={props.confirmar}>Sí</button>
                <button type="button" className="btn btn-primary" onClick={props.cancelar}>No</button>
            </Modal.Footer>
        </Modal>
    );
}

export default Confirmacion;