import axios from "axios";
import config from "../settings";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const Axios = axios.create({
  baseURL: `http://${config.SERVER_IP}:${config.SERVER_PORT}/`,
});

export default Axios;
