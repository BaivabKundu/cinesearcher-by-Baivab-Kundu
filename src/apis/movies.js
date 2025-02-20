import { BASE_URL } from "constants";

import axios from "axios";

const fetch = ({ searchTerm, page }) =>
  axios.get(BASE_URL, { params: { s: searchTerm, page } });

const show = imdbID => axios.get(BASE_URL, { params: { i: imdbID } });

const moviesApi = { fetch, show };

export default moviesApi;
