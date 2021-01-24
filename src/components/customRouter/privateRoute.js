import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ Component, ...rest }) => {

    const { logueado } = useContext(AuthContext);

    return (
        <Route {...rest}
            render={props =>
                logueado
                    ?
                    <Component {...props} />
                    :
                    <Redirect to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }} />
            }
        />
    )
}
