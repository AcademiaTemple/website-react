import { extraerLink } from './funcionesTexto';

export const esNombreInvalido = (name, notRequired) => {
    if (!name && !notRequired) {
        return 'El nombre está vacío';
    }
    else if (!name && notRequired) {
        return null;
    }
    else if (!(/^(?!\s*$).{1,50}/.test(name))) {
        return 'Tu nombre debe tener de 1 a 50 caracteres';
    }
    else if (!(/^[a-zA-Z\sáéíóúñÑ]*$/.test(name))) {
        return 'Tu nombre no puede tener caracteres especiales';
    }
}

export const esEdadInvalida = (age, notRequired) => {
    if (!age && !notRequired) {
        return 'La edad está vacía';
    }
    else if (!age && notRequired) {
        return null;
    }
    else if (age < 10 || age > 99) {
        return 'Introduce una edad válida';
    }
}

export const esTelefonoInvalido = (phone, notRequired) => {
    if (!phone && !notRequired) {
        return 'El teléfono está vacío';
    }
    else if (!phone && notRequired) {
        return null;
    }
    else if (!(/(^\s*$)|(^[+]?[0-9 ]{7,20}$)/).test(phone)) {
        return 'Introduce un teléfono válido';
    }
}

export const esCorreoInvalido = (email, notRequired) => {
    if (!email && !notRequired) {
        return 'El correo está vacío';
    }
    else if (!email && notRequired) {
        return null;
    }
    else if (!(/^(?!\s*$).{6,100}/.test(email))) {
        return 'Tu correo debe tener de 6 a 100 caracteres';
    }
    else if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email)) {
        return 'Introduce un correo válido';
    }
}

export const esLinkInvalido = (link, notRequired) => {
    if (!link && !notRequired) {
        return 'El link está vacío';
    }
    else if (!link && notRequired) {
        return null;
    }
    else if (!(/^(?!\s*$).{1,500}/.test(link))) {
        return 'Tu link debe tener de 1 a 500 caracteres';
    } else if (!extraerLink(link.trim())) {
        return 'Parece que ese link no es válido. Revísalo bien';
    }
}

export const esTituloInvalido = (title, notRequired) => {
    if (!title && !notRequired) {
        return 'El título está vacío';
    }
    else if (!title && notRequired) {
        return null;
    }
    else if (!(/^(?!\s*$).{1,100}/.test(title))) {
        return 'Tu título debe tener de 1 a 100 caracteres';
    }
}

export const esAutorInvalido = (author, notRequired) => {
    if (!author && !notRequired) {
        return 'El autor está vacío';
    }
    else if (!author && notRequired) {
        return null;
    }
    else if (!(/^(?!\s*$).{1,100}/.test(author))) {
        return 'Tu pseudónimo debe tener de 1 a 100 caracteres';
    }
}

export const esIntencionInvalida = (intention, notRequired) => {
    if (!intention && !notRequired) {
        return 'La intención está vacía';
    }
    else if (!intention && notRequired) {
        return null;
    }
    else if (!(/^(?!\s*$).{1,1000}/.test(intention))) {
        return 'Lo que quieres transmitir debe tener de 1 a 1000 caracteres';
    }
}

export const isSobreInvalido = (about, notRequired) => {
    if (!about && !notRequired) {
        return 'El resumen de tu historía está vacío';
    }
    else if (!about && notRequired) {
        return null;
    }
    else if (!(/^(?!\s*$).{1,1000}/.test(about))) {
        return 'El resumen de tu historia debe contener de 1 a 1000 caracteres';
    }
}

export const esProfesionInvalida = (profession, notRequired) => {
    if (!profession && !notRequired) {
        return 'La profesión está vacía';
    }
    else if (!profession && notRequired) {
        return null;
    }
    else if (!(/^(?!\s*$).{1,50}/.test(profession))) {
        return 'Tu profesión debe tener de 1 a 50 caracteres';
    }
    else if (!(/^[a-zA-Z\sáéíóúñÑ]*$/.test(profession))) {
        return 'Tu profesión no puede tener caracteres especiales';
    }
}