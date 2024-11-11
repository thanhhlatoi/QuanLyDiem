import axios from "axios";

axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)


axios.defaults.baseURL = 'http://172.20.10.7:8081/api/'

export default axios;