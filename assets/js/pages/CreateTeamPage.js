import React, { useState, useContext, useEffect } from "react";
import teamAPI from "../services/teamAPI";
import userAPI from "../services/usersAPI";

const CreateTeamPage = () => {
    const [studentTeam, setStudentTeam] = useState(null)
    const [userSecretKeyValue, setUserSecretKeyValue] = useState({
        code1: "",
        code2: "",
        code3: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [winMode, setWinMode] = useState(false)

    useEffect(() => {
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


    const winModView = (
        <div>WIN</div>
    )

    return (

        <div>
            <h1>Create Team</h1>
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