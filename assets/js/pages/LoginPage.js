import React, { useState, useContext } from "react";
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import usersAPI from "../services/usersAPI";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const history = useHistory();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const { setIsAuthenticated } = useContext(AuthContext);
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await AuthAPI.authenticate(credentials);
            setIsAuthenticated(true);

            if (usersAPI.isAdmin()) {
                toast("🦄 Bravo jeune hacker", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                history.replace("admin");
            } else {
                toast("🦄 Que la force de la licorne soit avec toi !", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                history.replace("challenge");
            }
        } catch (error) {
            console.log(error);
            setError(
                "Identifiant ou mot de passe incorrect"
            );

            toast.error("Identifiant ou mot de passe incorrect");
        }
    };

    return (
        <div className="window login-page">
            <form onSubmit={handleSubmit} className="terminal">
                <input
                    type="text" placeholder="username"
                    onChange={handleChange}
                    value={credentials.username}
                    name="username"
                    placeholder="t.mouchelet"
                />
                <input
                    type="password"
                    placeholder="password"
                    onChange={handleChange}
                    name="password"
                />
                <button type="submit" className="btn btn-success">
                    connect
                </button>
            </form>
            {/* {error && <p className="error">{error}</p>} */}
        </div>
    )
}

export default LoginPage;