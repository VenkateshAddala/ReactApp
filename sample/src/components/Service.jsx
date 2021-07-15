import axios from "axios";
const getAPI_URL = "http://localhost:8083/micro_control/getAll_micro";
const postAPI_URL = "http://localhost:8083/micro_control/insert_micro";
const putAPI_URL = "http://localhost:8083/micro_control/find_micro";
const updateAPI_URL = "http://localhost:8083/micro_control/update_micro";
const update_Toro = "http://localhost:8083/toro_control/update_toro";
const deleteAPI_URL = "http://localhost:8083/micro_control/delete_micro";
const delete_Toro = "http://localhost:8083/toro_control/delete_toro";
const getToro = "http://localhost:8083/toro_control/getAll_toro";
const getPass = "http://localhost:8083/micro_control/get_Password";
const post_Toro = "http://localhost:8083/toro_control/insert_toro";
const put_Toro = "http://localhost:8083/toro_control/find_toro";

class Service {

    getDetails() {
        return axios.get(getAPI_URL);
    }

    getPassword(pass) {
        return axios.post(getPass + '/' + pass);
    }

    getToro() {
        return axios.get(getToro);
    }
    postDetails(details) {
        return axios.post(postAPI_URL, details);
    }
    postToro(details) {
        return axios.post(post_Toro, details);
    }
    putDetails(id) {
        return axios.get(putAPI_URL + '/' + id);
    }
    putToro(id) {
        return axios.get(put_Toro + '/' + id);
    }
    updateDetails(details, id) {
        return axios.put(updateAPI_URL + '/' + id, details);
    }
    updateToro(details, id) {
        return axios.put(update_Toro + '/' + id, details);
    }
    deleteDetail(id) {
        return axios.delete(deleteAPI_URL + '/' + id);
    }
    deleteToro(id) {
        return axios.delete(delete_Toro + '/' + id);
    }
}

export default new Service()