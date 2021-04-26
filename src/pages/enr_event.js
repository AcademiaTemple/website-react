import React from 'react'
import INTRO_LATEX_FATAMA_1 from './enr_event_INTRO-LATEX-FATAMA-1';

const Inscripcion = ({ match }) => {

    switch (match.params.id) {
        case 'INTRO-LATEX-FATAMA-1':
            return <INTRO_LATEX_FATAMA_1 />;
        default:
            return <div>Código de inscripción inválido</div>;
    }
}

export default Inscripcion;