import { QUERY_KEYS } from "constants/query";

import moviesApi from "apis/movies";
import { Toastr } from "neetoui";
import { useQuery } from "react-query";

const handleMovieError = response => {
  const { Response, Error } = response;
  if (Response === "False") {
    Toastr.error(Error, {
      autoClose: 2000,
    });
  }

  return response;
};

export const useFetchMovies = ({ page, searchTerm }) => {
  const queryConfig = {
    queryKey: [QUERY_KEYS.MOVIES, page, searchTerm],
    queryFn: async () => {
      console.log("fetching movies", page, searchTerm);
      const response = await moviesApi.fetch({ s: searchTerm, page });

      return handleMovieError(response);
    },
    keepPreviousData: true,
    enabled: Boolean({ page, searchTerm }),
  };

  return useQuery(queryConfig);
};

export const useShowMovie = imdbId => {
  const queryConfig = {
    queryKey: [QUERY_KEYS.MOVIES, imdbId],
    queryFn: () => moviesApi.show({ i: imdbId }),
    enabled: Boolean(imdbId),
  };

  return useQuery(queryConfig);
};
