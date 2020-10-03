import { USER_API } from "../config";
import axios from "axios";
import jwtDecode from 'jwt-decode';

function findActiveChallenge() {
    const id = getUserID()
    return axios
        .get(`${USER_API}/${id}/challenge`)
        .then(res => res.data)
}

function getUserID() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { id } = jwtDecode(token);
        return id;
    }
}

function getUserTeam() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { team } = jwtDecode(token);
        return team;
    }
}

export default {
    findActiveChallenge,
    getUserID,
    getUserTeam,
};