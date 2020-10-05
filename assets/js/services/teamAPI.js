import { TEAM_API } from "../config";
import axios from "axios";
import jwtDecode from 'jwt-decode';

function findOne(id) {
    return axios
        .get(`${TEAM_API}/${id}`)
        .then(res => res.data)
}

function findAllTeams() {
    return axios
        .get(`${TEAM_API}`)
        .then(res => res.data["hydra:member"])
}

function getName() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { name } = jwtDecode(token);
        return name;
    }
}

export default {
    findOne,
    findAllTeams,
    getName
};