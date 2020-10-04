import React, { useState, useContext, useEffect } from "react";
import challengesAPI from "../../services/challengesAPI";

const ShowChallenges = ({ reload }) => {
    const [challengesList, setChallengesList] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        console.log("******")
        console.log("challenges")
        fetAllChallenges()
    }, [reload])

    const fetAllChallenges = async () => {
        try {
            const challenges = await challengesAPI.findAllChallenges()
            setChallengesList(challenges)
            setIsLoading(true)
            console.log(challenges)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="challengesDetails">
            {isLoading && Object.values(challengesList).map(challenge => {
                return (
                    <div className="challengeDetails">
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