import React, { useState, useContext, useEffect } from "react";
import teamAPI from "../services/teamAPI";
import userAPI from "../services/usersAPI";
import tudentAPI from "../services/studentAPI";
import studentAPI from "../services/studentAPI";
import AuthContext from "../contexts/AuthContext";
import authAPI from "../services/authAPI";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTeamPage = () => {
    const [studentTeam, setStudentTeam] = useState(null)
    const [userSecretKeyValue, setUserSecretKeyValue] = useState({
        code1: "",
        code2: "",
        code3: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [winMode, setWinMode] = useState(false)
    const { setIsAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        authAPI.setup();
        const studentTeamID = userAPI.getStudentTeamID()
        fetStudentTeam(studentTeamID)
        if (isLoading) {
            let totalUserSecretKeyValue = ""
            Object.keys(userSecretKeyValue).map((index, key) => {
                totalUserSecretKeyValue += userSecretKeyValue[index]
            })
            if (totalUserSecretKeyValue === studentTeam.secretKey) {
                setWinMode(true);
            }
        }
    }, [userSecretKeyValue])

    const fetStudentTeam = async (id) => {
        try {
            const result = await teamAPI.findOne(id);
            setStudentTeam(result);
            setIsLoading(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget;
        setUserSecretKeyValue({ ...userSecretKeyValue, [name]: value });

        if (isLoading) {
            const secretTeamCode = {
                code1: studentTeam.secretKey.slice(0, 3),
                code2: studentTeam.secretKey.slice(3, 6),
                code3: studentTeam.secretKey.slice(6, 9)
            }

            Object.keys(secretTeamCode).map((index, key) => {
                if ((index == currentTarget.name) && (secretTeamCode[index] == currentTarget.value)) {
                    currentTarget.className = "valid"
                }
                if ((index == currentTarget.name) && (secretTeamCode[index] != currentTarget.value)) {
                    currentTarget.className = ""
                }
            })
        }
    };


    const handleLogout = () => {

        toast.dark(studentTeam.name, {
            position: "top-right",
            autoClose: 9000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        toast.dark("123", {
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

    const winModView = (
        <div className="winMod">
            <button onClick={handleLogout}>Team connection</button>
            <p>Password : <em>123</em></p>
        </div>
    )

    return (
        <div className="create-team">
            <h1>Create Team</h1>
            <div>
                Bienvenue à vous, votre petit nom d’équipe sera <em>{isLoading && studentTeam.name}</em>
                <br />
                Avant de commencer… il va falloir trouver qui seront vos collaborateurs.
                <br />
                Chacun des membres de votre équipe a simplement à entrer le code qui lui a été confié précédemment dans le champs qui lui est réservé.
                <br />
                Pour rappel votre code secret est le suivant : <em>{studentAPI.getStudentSecretKey()}</em>
                <br />
                L'identifiant de connexion de votre team : <em>{isLoading && studentTeam.name}</em>
                <br />
                Bon courage !
                <br />
            </div>

            <form>
                <input type="text" onChange={handleChange} name="code1" placeholder="code 1" />
                <input type="text" onChange={handleChange} name="code2" placeholder="code 2" />
                <input type="text" onChange={handleChange} name="code3" placeholder="code 3" />
            </form>
            {winMode && winModView}
        </div>
    )
}

export default CreateTeamPage;