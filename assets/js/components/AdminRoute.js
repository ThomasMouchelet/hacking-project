import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import usersAPI from "../services/usersAPI";

const PrivateRoute = ({ path, component }) => {
    const { isAuthenticated } = useContext(AuthContext);

    return (isAuthenticated && usersAPI.isAdmin()) ? (
        <Route path={path} component={component} />
    ) : (
            <Redirect to="/" />
        );
};

export default PrivateRoute;