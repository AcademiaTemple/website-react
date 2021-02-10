export const obtenerOracion = (texto, limite) => {
    limite = !limite ? texto.length : limite;
    if (texto && texto.length > 0) {
      return texto.substring(0, 1).toUpperCase() + texto.substring(1, limite);
    } else {
      return '';
    }
  }