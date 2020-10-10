import React, { useState, useContext, useEffect } from "react";
import challengesAPI from "../../services/challengesAPI";
import AuthAPI from "../../services/authAPI";

const ShowChallenges = ({ reload }) => {
    const [challengesList, setChallengesList] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        AuthAPI.setup();
        AuthAPI.isAuthenticated();
        fetAllChallenges()
    }, [reload])

    const fetAllChallenges = async () => {
        try {
            const challenges = await challengesAPI.findAllChallenges()
            setChallengesList(challenges)
            setIsLoading(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="challengesDetails">
            {isLoading && Object.values(challengesList).map((challenge, key) => {
                return (
                    <div className="challengeDetails" key={key}>
                        <input type="text" value={challenge.name} />
                        <input type="text" value={challenge.orderChallenge} />
                        <input type="text" value={challenge.answer} />
                        <textarea cols="30" rows="10">
                            {challenge.description}
                        </textarea>
                    </div>
                )
            })}
        </div>
    )
}

export default ShowChallenges;