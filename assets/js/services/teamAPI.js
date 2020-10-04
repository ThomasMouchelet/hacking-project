import { TEAM_API } from "../config";
import axios from "axios";

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

export default {
    findOne,
    findAllTeams
};