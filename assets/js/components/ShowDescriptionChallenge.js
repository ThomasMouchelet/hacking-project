import React, { useEffect, useState } from "react";
import usersAPI from "../services/usersAPI";

const ShowDescriptionChallenge = ({ description }) => {
    const [descriptionSTRING, setDescriptionSTRING] = useState("")

    useEffect(() => {
        const userType = usersAPI.getType();
        const namingGame = userType === "student" ? usersAPI.getFirstName() : teamAPI.getName()
        const secretKey = userType === "student" ? usersAPI.getSecretKey() : ""
        const newDescription = description.toString()
            .replace(/{namingGame}/g, namingGame)
            .replace(/{secretKey}/g, secretKey)
        setDescriptionSTRING(newDescription);
    }, [])

    return (
        <div className="description">
            <p dangerouslySetInnerHTML={{ __html: descriptionSTRING }}></p>
        </div>
    )

};

export default ShowDescriptionChallenge;