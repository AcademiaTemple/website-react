import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Logo from '../../../img/curso-generico.png';
import './card.css';

function Card(props) {

  const [cargandoImg, estCargandoImg] = useState(true);
  const [img, estImg] = useState(props.urlImg);

  return (
    <div className="card mb-5">
      <div className="contenedor-spinner-img">
        {
          cargandoImg
          &&
          <div className="contenedor-tarjeta-curso">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
        <img onError={() => estImg(Logo)} onLoad={() => estCargandoImg(false)} src={img} className="card-img-top rounded-img-course" alt="img-curso" />
      </div>
      <div className="card-body">
        <h5 className="card-title">{props.titulo}</h5>
        <p className="card-text txt-descripcion clamp clamp-2">{props.descBreve}</p>
        <Link className="boton btn-principal d-block" to={`/course/?id=${props.id}`}>
          Ingresar
        </Link>
      </div>
    </div>
  );
}
export default Card;