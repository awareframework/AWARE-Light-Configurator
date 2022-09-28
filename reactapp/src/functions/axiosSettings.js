import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const Axios = axios.create({
  baseURL: "http://localhost:8000/",
});

export default Axios;
