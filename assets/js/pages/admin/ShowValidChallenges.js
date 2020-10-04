import React, { useState, useContext, useEffect } from "react";
import Moment from 'react-moment';

const ShowValidChallenges = ({ validChallenges }) => {

    return (
        <div className="valid-challenges">
            {validChallenges.map((validChallenge, key) => {

                return (
                    <div className="valid-challenge" key={key}>
                        <span>{validChallenge.challenge.orderChallenge}</span>
                        <span> - {validChallenge.challenge.name}</span>
                        <span> -
                            <Moment format="DD/MM/YYYY - HH:mm:ss">{validChallenge.timeToComplete}</Moment>
                        </span>
                    </div>
                )
            })}
        </div>
    )
}

export default ShowValidChallenges;