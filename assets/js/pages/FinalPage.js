import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import authAPI from "../services/authAPI"

const FinalPage = () => {
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleLogout = () => {
        toast.dark("mistert", {
            position: "top-right",
            autoClose: 9000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        toast.dark("azerty", {
            position: "top-right",
            autoClose: 9000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        authAPI.logout();
        setIsAuthenticated(false);
    }

    return (
        <div>
            <h1>Accès admin</h1>
            <br />
            <p>Login : <em>mistert</em></p>
            <p>Password : <em>azerty</em></p>
            <br />
            <button onClick={handleLogout}>Admin connection</button>
        </div>
    )
}

export default FinalPage;