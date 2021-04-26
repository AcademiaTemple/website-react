import React from 'react'
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const Metadata = ({ url, quote = "", title = "Academia Temple - Donde expertos y aprendices se unen", image = "https://firebasestorage.googleapis.com/v0/b/academia-temple.appspot.com/o/miscelanea%2Flogo.png?alt=media&token=b5549d31-2351-439c-b188-504345db57ea", description = "Somos Academia Temple, la primera escuela de programación donde expertos y aprendices de todas partes del mundo crean y reciben clases hechas por ellos mismos.", hashtag = "#academiatemple" }) => {
    let location = useLocation();
    let currentUrl = url || process.env.REACT_APP_WEBSITE + location.pathname;

    return (
        <Helmet>
            <title>{title}</title>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="csrf_token" content="" />
            <meta property="type" content="website" />
            <meta property="url" content={currentUrl} />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="_token" content="" />
            <meta name="robots" content="noodp" />
            <meta property="title" content={title} />
            <meta property="quote" content={quote} />
            <meta name="description" content={description} />
            <meta property="image" content={image} />
            <meta property="og:locale" content="es_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:quote" content={quote} />
            <meta property="og:hashtag" content={hashtag} />
            <meta property="og:image" content={image} />
            <meta content="image/*" property="og:image:type" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content="Academia Temple" />
            <meta property="og:description" content={description} />
        </Helmet>
    );
}

export default Metadata;