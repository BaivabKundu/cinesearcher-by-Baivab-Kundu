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

export const useFetchMovies = params => {
  const queryConfig = {
    queryKey: [QUERY_KEYS.MOVIES, params],
    queryFn: async () => {
      const response = await moviesApi.fetch(params);

      return handleMovieError(response);
    },
    enabled: !!params,
  };

  return useQuery(queryConfig);
};

export const useShowMovie = imdbId => {
  const queryConfig = {
    queryKey: [QUERY_KEYS.MOVIES, imdbId],
    queryFn: () => moviesApi.show(imdbId),
    enabled: !!imdbId,
  };

  return useQuery(queryConfig);
};
