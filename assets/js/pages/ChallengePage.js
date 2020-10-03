import React, { useState, useContext, useEffect } from "react";
import usersAPI from "../services/usersAPI";
import challengesAPI from "../services/challengesAPI";
import validChallengesAPI from "../services/validChallengesAPI";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { useHistory } from "react-router-dom";

const ChallengePage = () => {
    const history = useHistory();
    const [challenge, setChallenge] = useState({
        id: "",
        name: "",
        description: "",
    });
    const [answer, setAnswer] = useState("");
    const [userAnswer, setUserAnswer] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getActiveChallenge()
        if (isLoading) {
            if (userAnswer === answer) {
                setDisabled(false)
            } else {
                setDisabled(true)
            }
        }
    }, [userAnswer])

    const getActiveChallenge = async () => {
        try {
            const id = await usersAPI.findActiveChallenge()

            if (id === "complete") {
                const userType = usersAPI.getType();
                const redirectPage = userType === "student" ? "create_team" : "final_page"
                history.replace(redirectPage);
            } else {
                const challenge = await challengesAPI.findOne(id);

                setChallenge({
                    id: challenge.id,
                    name: challenge.name,
                    description: challenge.description,
                })
                setAnswer(challenge.answer);
                setIsLoading(true);
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await validChallengesAPI.createValidChallenge(challenge.id);
            setUserAnswer("")
            await getActiveChallenge();
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = ({ currentTarget }) => {
        setUserAnswer(currentTarget.value);
    };

    const handlePast = (e) => {
        setUserAnswer(e.clipboardData.getData('Text'));
    }

    return (
        <div>
            <h1>{isLoading && challenge.name}</h1>
            <p>{isLoading && ReactHtmlParser(challenge.description)}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="réponse"
                    name="answer"
                    onChange={handleChange}
                    onPaste={handlePast}
                    value={userAnswer}
                />
                <input type="submit" value="valider" disabled={disabled} />
            </form>
        </div>
    )
}

export default ChallengePage;