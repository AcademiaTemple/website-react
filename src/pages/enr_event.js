import React from 'react'
import APRENDE_CPP_LOPEZ_1 from './enr_event_APRENDE-CPP-LOPEZ-1';

const Inscripcion = ({ match }) => {

    switch (match.params.id) {
        case 'APRENDE-CPP-LOPEZ-1':
            return <APRENDE_CPP_LOPEZ_1 />;
        default:
            return <div>Código de inscripción inválido</div>;
    }
}

export default Inscripcion;