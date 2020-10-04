import React, { useState, useContext, useEffect } from "react";
import TeamAPI from "./../../services/teamAPI";
import Moment from 'react-moment';

const AdminPage = () => {
    const [listTeams, setListTeams] = useState(null)
    const [isLoading, setIsLoading] = useState("")
    const [reload, setReload] = useState(false)

    useEffect(() => {
        fetchAllTeams()
    }, [reload])

    const fetchAllTeams = async () => {
        try {
            const teams = await TeamAPI.findAllTeams();
            console.log(teams);
            setListTeams([...teams])
            setIsLoading(true);
        } catch (error) {
            console.log(error)
        }
    }

    const handleReload = () => {
        setReload(true);
        setTimeout(() => {
            setReload(false);
        }, 200);
    }

    return (
        <div className="admin-page">
            <h1>AdminPage</h1>
            <button onClick={handleReload}>RELOAD</button>
            {isLoading && listTeams.map(team => {
                return (
                    <div className="teams">
                        <h2>{team.name} <span> - SK : {team.secretKey}</span> </h2>

                        <div className="valid-team-challenges">

                        </div>

                        <div className="students">
                            {Object.values(team.students).map(student => {
                                return (
                                    <div className="student">
                                        <span>{student.firstName}</span>
                                        <span> {student.lastName}</span>
                                        <span> - SK : {student.secretKey}</span>

                                        <div className="valid-student-challenges">
                                            {student.validChallenges.map(validChallenge => {
                                                return (
                                                    <div className="valid-student-challenge">
                                                        <span>{validChallenge.challenge.orderChallenge}</span>
                                                        <span> - {validChallenge.challenge.name}</span>
                                                        <span> -
                                                            <Moment format="DD/MM/YYYY - hh:mm:ss">{validChallenge.timeToComplete}</Moment>
                                                        </span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                )
            })}
        </div>
    )
}

export default AdminPage;