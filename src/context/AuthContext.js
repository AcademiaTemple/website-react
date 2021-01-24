import React, { createContext, useState, useEffect } from 'react';
import firebase from '../firebase';
const auth = firebase.auth();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [logueado, estLogueado] = useState(false);

    useEffect(() => {
        return auth.onAuthStateChanged(function (user) {
            if (user) {
                estLogueado(true)
            } else {
                estLogueado(false);
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={{ logueado }}>
            {children}
        </AuthContext.Provider>
    )
}
