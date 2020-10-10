import React, { useState, useContext, useEffect } from "react";
import TeamAPI from "./../../services/teamAPI";
import FormTchat from "./FormTchat";
import ShowValidChallenges from "./ShowValidChallenges";
import ShowChallenges from "./ShowChallenges";
import firebase from "../../firebase";
import AuthAPI from "../../services/authAPI";

const AdminPage = () => {
    const [listTeams, setListTeams] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const db = firebase.firestore();
    const [video, setVideo] = useState({
        playing: false,
        controls: false
    })

    useEffect(() => {
        AuthAPI.setup();
        AuthAPI.isAuthenticated();
        fetchAllTeams()
        fetchVideo()
    }, [reload])

    const fetchAllTeams = async () => {
        try {
            const teams = await TeamAPI.findAllTeams();
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

    const fetchVideo = async () => {
        db.collection("video").onSnapshot((snapshot) => {
            snapshot.forEach(async (doc) => {
                const data = doc.data()
                setVideo(data)
            })
        })
    }

    const handleControlVideo = ({ currentTarget }) => {
        const index = currentTarget.id
        const action = currentTarget.dataset.action === "true"

        const newVideoControl = {
            ...video,
            [index]: action
        }

        setVideo(newVideoControl)

        db.collection("video").doc("mistert").set(newVideoControl);
    }

    return (
        <div className="admin-page">
            <div className="header-admin">
                <h1>AdminPage </h1>
                {video.playing ? (
                    <button onClick={handleControlVideo} id="playing" data-action="false">Pause video</button>
                ) : (
                        <button onClick={handleControlVideo} id="playing" data-action="true">Play video</button>
                    )}
                {video.controls ? (
                    <button onClick={handleControlVideo} id="controls" data-action="false">Controls OFF</button>
                ) : (
                        <button onClick={handleControlVideo} id="controls" data-action="true">Controls ON</button>
                    )}
                <button onClick={handleReload}>RELOAD DATA</button>
            </div>

            <FormTchat />

            <div className="row">
                <div className="challenges-admin">
                    <h2>Challenges</h2>
                    <ShowChallenges reload={reload} />
                </div>

                <div className="logs">
                    <h2>Logs</h2>
                    {isLoading && listTeams.map((team, key) => {
                        return (
                            <div className="team" key={key}>
                                <h3>{team.name} <span> - SK : {team.secretKey}</span> </h3>

                                <ShowValidChallenges validChallenges={team.validChallenges} />

                                <div className="students">
                                    {Object.values(team.students).map((student, key) => {
                                        return (
                                            <div className="student" key={key}>
                                                <span>{student.firstName}</span>
                                                <span> {student.lastName}</span>
                                                <span> - SK : {student.secretKey}</span>

                                                <ShowValidChallenges validChallenges={student.validChallenges} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default AdminPage;