import axios from "axios";

export default axios.create({
    baseURL: "https://full-stack-backend-ncii.onrender.com/api/auth/",
    withCredentials: true,
});
