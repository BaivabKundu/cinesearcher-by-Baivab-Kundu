import React, { useState, useRef, useEffect } from "react";

import PageLoader from "components/commons/PageLoader";
import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useKeyboardNavigation from "hooks/useKeyboardNavigation";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Search } from "neetoicons";
import { Input, Pagination } from "neetoui";
import { isEmpty, mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import useHomeQueryParamsStore from "stores/useHomeQueryParamsStore";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "./constants";
import Filter from "./Filter";
import MovieList from "./List";

const MoviePage = () => {
  const { t } = useTranslation();

  const history = useHistory();

  const queryParams = useQueryParams();
  const { page, searchTerm = "", type, year } = queryParams;

  const [searchQuery, setSearchQuery] = useState(searchTerm);

  const handleUpdateQueryParams = useFuncDebounce(searchValue => {
    if (!searchValue) {
      history.push(routes.movies);

      return;
    }

    const params = {
      page: DEFAULT_PAGE_NUMBER,
      searchTerm: searchValue,
      type,
      year,
    };

    history.push(buildUrl(routes.movies, filterNonNull(params)));
  });

  const moviesParams = {
    searchTerm,
    page: Number(page) || DEFAULT_PAGE_NUMBER,
    year,
    type,
  };

  const {
    data: { Search: movies = [], totalResults } = {},
    isLoading: isLoadingMovieList,
  } = useFetchMovies(isEmpty(searchTerm) ? null : moviesParams);

  const handlePageNavigation = page =>
    history.push(buildUrl(routes.movies, mergeLeft({ page }, queryParams)));

  const searchInputRef = useRef(null);

  const setHomeQueryParams = useHomeQueryParamsStore.pickFrom();

  const handleInputOnChange = ({ target: { value } }) => {
    setSearchQuery(value);
    handleUpdateQueryParams(value);
  };

  useEffect(() => {
    setHomeQueryParams(queryParams);
  }, [queryParams]);

  useKeyboardNavigation("/", searchInputRef);

  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="mx-auto mb-8 flex items-center gap-2">
        <Input
          className="rounded-lg"
          name="search"
          placeholder={t("inputPlaceholders.searchInput")}
          prefix={<Search />}
          ref={searchInputRef}
          type="search"
          value={searchQuery}
          onChange={handleInputOnChange}
        />
        <Filter searchTerm={searchTerm} />
      </div>
      {isLoadingMovieList ? (
        <PageLoader />
      ) : (
        <>
          {!isEmpty(searchTerm) && (
            <>
              <MovieList movies={movies} />
              <div className="my-5 flex justify-center">
                <Pagination
                  count={totalResults}
                  navigate={handlePageNavigation}
                  pageNo={Number(page) || DEFAULT_PAGE_NUMBER}
                  pageSize={DEFAULT_PAGE_SIZE}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MoviePage;
