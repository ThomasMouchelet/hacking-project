import React, { useState, useContext, useEffect } from "react";
import TeamAPI from "./../services/teamAPI";

const AdminPage = () => {
    const [listTeams, setListTeams] = useState(null)
    const [isLoading, setIsLoading] = useState("")

    useEffect(() => {
        fetchAllTeams()
    }, [])

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

    return (
        <div className="admin-page">
            <h1>AdminPage</h1>
            {isLoading && listTeams.map(value => {
                return (
                    <h2>{value.name}</h2>
                )
            })}
        </div>
    )
}

export default AdminPage;