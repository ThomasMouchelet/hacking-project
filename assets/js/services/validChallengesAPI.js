import { VALID_CHALLENGE } from "../config";
import axios from "axios";
import usersAPI from "./usersAPI";

function createValidChallenge(challengeID) {

    const type = usersAPI.getType();

    let credentials = {
        challenge: `api/challenges/${challengeID}`,
        timeToComplete: new Date(),
    }

    if (type === "student") {
        credentials = {
            ...credentials,
            student: `api/students/${usersAPI.getStudentID()}`,
        }
    }
    if (type === "team") {
        credentials = {
            ...credentials,
            team: `api/teams/${usersAPI.getTeamID()}`,
        }
    }

    return axios.post(`${VALID_CHALLENGE}`, credentials)
        .then(resp => resp)
}

export default {
    createValidChallenge,
};