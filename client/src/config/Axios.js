import axios from 'axios';

const Axios = axios.create({
    baseURL:"https://men-live-chat.herokuapp.com"
})

export default Axios;