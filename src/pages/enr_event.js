import React from 'react'
import FormCPPLopez from './enr_events/APRENDE-CPP-LOPEZ-1';
import FormIngles from './enr_events/APRENDE-INGLES-BENAVIDES-1';
import FormMongo from './enr_events/APRENDE-MONGO-FATAMA-1';

const Inscripcion = ({ match }) => {

    switch (match.params.id) {
        case 'APRENDE-CPP-LOPEZ-1':
            return <FormCPPLopez />;
        case 'APRENDE-INGLES-BENAVIDES-1':
            return <FormIngles />;
        case 'APRENDE-MONGO-FATAMA-1':
            return <FormMongo />;
        default:
            return <div>Código de inscripción inválido</div>;
    }
}

export default Inscripcion;