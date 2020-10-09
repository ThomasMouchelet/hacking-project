import { STUDENT_API } from "../config";
import { TEAM_API } from "../config";
import axios from "axios";
import jwtDecode from 'jwt-decode';

function getStudentTeamID() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { studentTeamID } = jwtDecode(token);
        return studentTeamID;
    }
}
function getStudentSecretKey() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { secretKey } = jwtDecode(token);
        return secretKey;
    }
}

function getAll() {
    return axios
        .get(`${STUDENT_API}`)
        .then(res => res.data["hydra:member"])
}

export default {
    getStudentTeamID,
    getStudentSecretKey,
    getAll
};