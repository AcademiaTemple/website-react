import React from 'react'
import FormCPPLopez from './enr_events/APRENDE-CPP-LOPEZ-1';
import FormIngles from './enr_events/APRENDE-INGLES-BENAVIDES-1';

const Inscripcion = ({ match }) => {

    switch (match.params.id) {
        case 'APRENDE-CPP-LOPEZ-1':
            return <FormCPPLopez />;
        case 'APRENDE-INGLES-BENAVIDES-1':
            return <FormIngles />;
        default:
            return <div>Código de inscripción inválido</div>;
    }
}

export default Inscripcion;