import axios from "axios";

const fetch = ({ searchTerm, page }) =>
  axios.get("", { params: { s: searchTerm, page } });

const show = params => axios.get("", { params });

const moviesApi = { fetch, show };

export default moviesApi;
