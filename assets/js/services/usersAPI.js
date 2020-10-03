import { USER_API } from "../config";
import axios from "axios";
import jwtDecode from 'jwt-decode';

function findActiveChallenge() {
    return axios
        .get(`${USER_API}/11/challenge`)
        .then(res => res.data)
}

function getUserID() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { id } = jwtDecode(token);
        return id;
    }
}

export default {
    findActiveChallenge,
    getUserID
};