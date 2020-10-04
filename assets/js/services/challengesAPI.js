import { CHALLENGE_API } from "../config";
import axios from "axios";

function findOne(id) {
    return axios
        .get(`${CHALLENGE_API}/${id}`)
        .then(res => res.data)
}

function findAllChallenges() {
    return axios
        .get(`${CHALLENGE_API}`)
        .then(res => res.data["hydra:member"])
}

export default {
    findOne,
    findAllChallenges
};