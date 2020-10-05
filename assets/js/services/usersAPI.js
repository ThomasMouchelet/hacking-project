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

function getStudentID() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { studentID } = jwtDecode(token);
        return studentID;
    }
}
function getTeamID() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { teamID } = jwtDecode(token);
        return teamID;
    }
}

function getType() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { studentID } = jwtDecode(token);
        const type = studentID ? "student" : "team"
        return type;
    }
}

function getStudentTeamID() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { studentTeamID } = jwtDecode(token);
        return studentTeamID;
    }
}

function getFirstName() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { firstName } = jwtDecode(token);
        return firstName;
    }
}

function getSecretKey() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { secretKey } = jwtDecode(token);
        return secretKey;
    }
}

function isAdmin() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { roles } = jwtDecode(token);
        return roles.includes("ROLE_ADMIN") ? true : false;
    }
}

export default {
    findActiveChallenge,
    getUserID,
    getType,
    getTeamID,
    getStudentID,
    getStudentTeamID,
    isAdmin,
    getFirstName,
    getSecretKey
};