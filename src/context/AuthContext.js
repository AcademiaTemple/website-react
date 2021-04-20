import React, { createContext, useState, useEffect } from 'react';
import firebase from '../firebase';
import { almacenarUsuarioStorage } from '../helpers/almUsuario';
const auth = firebase.auth();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [logueado, estLogueado] = useState(false);
    const [cargando, estCargando] = useState(true);

    useEffect(() => {
        return auth.onAuthStateChanged(function (user) {
            if (user) {
                estLogueado(user)
            } else {
                almacenarUsuarioStorage(null);
                estLogueado(null);
            }
            estCargando(false);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ logueado, cargando }}>
            {children}
        </AuthContext.Provider>
    )
}
