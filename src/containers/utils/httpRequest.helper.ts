import axios from 'axios';
// import configKeys from './config.helper';

const axiosConfig = {
    baseURL: "https://checkroomie.herokuapp.com/api",
}
export default axios.create(axiosConfig)
