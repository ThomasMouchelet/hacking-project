import React, { useState, useContext, useEffect } from "react";
import usersAPI from "../services/usersAPI";
import challengesAPI from "../services/challengesAPI";
import validChallengesAPI from "../services/validChallengesAPI"

const ChallengePage = () => {
    const [challenge, setChallenge] = useState({
        id: "",
        name: "",
        description: "",
    })
    const [answer, setAnswer] = useState("")
    const [userAnswer, setUserAnswer] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const getValidChallenge = async () => {
        try {
            const id = await usersAPI.findActiveChallenge()
            const challenge = await challengesAPI.findOne(id);
            console.log(challenge);
            setChallenge({
                id: challenge.id,
                name: challenge.name,
                description: challenge.description,
            })
            setAnswer(challenge.answer);
            setIsLoading(true);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!isLoading) {
            getValidChallenge()
        }
        if (isLoading) {
            if (userAnswer === answer) {
                setDisabled(false)
            } else {
                setDisabled(true)
            }
        }
    }, [userAnswer])

    const handleSubmit = (event) => {
        event.preventDefault();
        const credentials = {
            user: usersAPI.getUserID(),
            team: "",
            teamToComplete: new Date(),
            challenge: challenge.id
        }
        console.log(credentials)
        // validChallengesAPI.createValidChallenge()
    }

    const handleChange = ({ currentTarget }) => {
        setUserAnswer(currentTarget.value);
    };

    const handlePast = (e) => {
        setUserAnswer(e.clipboardData.getData('Text'));
    }

    return (
        <div>
            <h1>{challenge.name}</h1>
            <p>{challenge.description}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="réponse"
                    name="answer"
                    onChange={handleChange}
                    onPaste={handlePast}
                />
                <input type="submit" value="valider" disabled={disabled} />
            </form>
        </div>
    )
}

export default ChallengePage;