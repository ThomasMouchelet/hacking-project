import React, { useState, useContext } from "react";
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
    const history = useHistory();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await AuthAPI.authenticate(credentials);
            setIsAuthenticated(true);
            history.replace("challenge");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text" placeholder="username"
                onChange={handleChange}
                value={credentials.username}
                name="username"
            />
            <input
                type="password"
                placeholder="password"
                onChange={handleChange}
                name="password"
            />
            <button type="submit" className="btn btn-success">
                Je me connecte
          </button>
        </form>
    )
}

export default LoginPage;