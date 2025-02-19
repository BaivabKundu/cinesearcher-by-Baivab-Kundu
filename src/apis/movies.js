import axios from "axios";

const fetch = params => axios.get("", { params });

const show = params => axios.get("", { params });

const moviesApi = { fetch, show };

export default moviesApi;
