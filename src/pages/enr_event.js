import React from 'react'
import FormCPPLopez from './enr_events/APRENDE-CPP-LOPEZ-1';
import FormIngles from './enr_events/APRENDE-INGLES-BENAVIDES-1';
import FormMongoDB from './enr_events/APRENDE-MONGODB-FATAMA-1';
import FormProteccion from './enr_events/APRENDE-PROTECCIONDEDATOS-PROFELEAL-1';
import Formpython from './enr_events/APRENDE-PYTHON-RODRIGO-1';
import FormReact2022 from './enr_events/APRENDE-REACT-RAZIEL-2022';

const Inscripcion = ({ match }) => {

    switch (match.params.id) {
        case 'APRENDE-CPP-LOPEZ-1':
            return <FormCPPLopez />;
        case 'APRENDE-INGLES-BENAVIDES-1':
            return <FormIngles />;
        case 'APRENDE-MONGODB-FATAMA-1':
            return <FormMongoDB />;
        case 'APRENDE-PROTECCIONDEDATOS-PROFELEAL-1':
            return <FormProteccion />;
        case 'APRENDE-PYTHON-RODRIGO-1':
            return <Formpython />;
        case 'APRENDE-REACT-RAZIEL-2022':
            return <FormReact2022 />;
        default:
            return <div>Código de inscripción inválido</div>;
    }
}

export default Inscripcion;