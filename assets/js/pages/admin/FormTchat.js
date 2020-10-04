import React, { useState, useContext, useEffect } from "react";
import firebase from "../../firebase";

const FormTchat = () => {
    const [credentials, setCredentials] = useState({
        message: ""
    })

    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const db = firebase.firestore();
        const dateTime = String(Date.now());
        db.collection("tchat").doc(dateTime).set({
            message: credentials.message
        });

        setCredentials({ message: "" })
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <input
                    type="text" placeholder="message"
                    onChange={handleChange}
                    value={credentials.message}
                    name="message"
                />
                <button type="submit">Envoyer</button>
            </form>

        </div>
    )
}

export default FormTchat;