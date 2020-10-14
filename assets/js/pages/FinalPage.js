import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import authAPI from "../services/authAPI";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <p>Vous avez trouvez une des variables du mot de passe : <em>cox</em></p>
            <p>Il vous manque 3 autres varibles liées à votre cible : </p>
            <ul>
                <li>Le jour de naissance </li>
                <li>Le mois de naissance </li>
                <li>L'année de naissance </li>
            </ul>
            <p>Une fois ces différentes informations rassemblées, vous devrez trouver la bonne combinaison.</p>
            <br />
            <button onClick={handleLogout}>Admin connection</button>
        </div>
    )
}

export default FinalPage;