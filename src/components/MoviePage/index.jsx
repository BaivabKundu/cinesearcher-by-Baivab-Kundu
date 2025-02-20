import React, { useState, useRef, useEffect } from "react";

import PageLoader from "components/commons/PageLoader";
import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Search } from "neetoicons";
import { Input, Pagination } from "neetoui";
import { isEmpty, mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "./constants";
import MovieList from "./List";

const MoviePage = () => {
  const { t } = useTranslation();

  const history = useHistory();

  const queryParams = useQueryParams();
  const { page, searchTerm = "" } = queryParams;

  const [searchQuery, setSearchQuery] = useState(searchTerm);

  const handleUpdateQueryParams = useFuncDebounce(searchValue => {
    if (!searchValue) {
      history.replace(routes.movies.index);

      return;
    }

    const params = {
      page: DEFAULT_PAGE_NUMBER,
      searchTerm: searchValue,
    };

    history.replace(buildUrl(routes.movies.index, filterNonNull(params)));
  });

  const moviesParams = {
    searchTerm,
    page: Number(page) || DEFAULT_PAGE_NUMBER,
  };

  const {
    data: { Search: movies = [], totalResults } = {},
    isLoading: isLoadingMovieList,
  } = useFetchMovies(moviesParams);

  const handlePageNavigation = page =>
    history.push(
      buildUrl(routes.movies.index, mergeLeft({ page }, queryParams))
    );

  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === "/" && e.target.tagName !== "INPUT") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  if (isLoadingMovieList) return <PageLoader />;

  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="mx-auto mb-8 ">
        <Input
          className="rounded-lg border border-[#ddd]"
          placeholder={`${t("inputPlaceholders.searchInput")}`}
          prefix={<Search />}
          ref={searchInputRef}
          type="search"
          value={searchQuery}
          onChange={({ target: { value } }) => {
            setSearchQuery(value);
            handleUpdateQueryParams(value);
          }}
        />
      </div>
      {isEmpty(searchTerm) ? (
        <div className="my-96 flex h-full justify-center text-center font-bold text-gray-500">
          {t("displayMessages.emptySearch")}
        </div>
      ) : (
        <>
          <MovieList movies={movies} />
          <div className="flex justify-center">
            <Pagination
              count={totalResults}
              navigate={handlePageNavigation}
              pageNo={Number(page) || DEFAULT_PAGE_NUMBER}
              pageSize={DEFAULT_PAGE_SIZE}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MoviePage;
