import moment from 'moment';
import "moment/locale/es";

export const obtenerOracion = (texto, limite) => {
  limite = !limite ? texto.length : limite;
  if (texto && texto.length > 0) {
    return texto.substring(0, 1).toUpperCase() + texto.substring(1, limite);
  } else {
    return '';
  }
}

export const aOracion = (text, limit) => {
  limit = !limit ? text.length : limit;
  if (text && text.length > 0) {
    return text.substring(0, 1).toUpperCase() + text.substring(1, limit);
  } else {
    return '';
  }
}

export const obtenerFechaTexto = (date) => {
  const momentObj = moment(date);
  return aOracion(momentObj.format('D [de] MMMM [del] YYYY'));
}
