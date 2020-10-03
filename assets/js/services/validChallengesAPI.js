import { VALID_CHALLENGE } from "../config";
import axios from "axios";

function createValidChallenge(credentials) {
    return axios.post(`${VALID_CHALLENGE}`, credentials)
        .then(resp => console.log(resp));
}

export default {
    createValidChallenge,
};