import { VALID_CHALLENGE } from "../config";
import axios from "axios";
import usersAPI from "./usersAPI";

function createValidChallenge(challengeID) {

    const isTeam = usersAPI.getUserTeam() === undefined ? false : true

    let credentials = {
        challenge: `api/challenges/${challengeID}`,
        timeToComplete: new Date(),
    }

    if (isTeam) {
        credentials = {
            ...credentials,
            team: `api/teams/${usersAPI.getUserTeam()}`,
        }
    } else {
        credentials = {
            ...credentials,
            user: `api/users/${usersAPI.getUserID()}`,
        }
    }

    return axios.post(`${VALID_CHALLENGE}`, credentials)
        .then(resp => resp)
        .catch(erre => console.log(error));
}

export default {
    createValidChallenge,
};