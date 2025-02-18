import React, { useState } from "react";

import PageLoader from "components/commons/PageLoader";
import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import MovieList from "./MovieList";

import EmptyPage from "../commons/EmptyPage";

const MoviePage = () => {
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchTerm = useDebounce(searchQuery);
  const { data: { Search: movies = [] } = {}, isLoading } =
    useFetchMovies(debouncedSearchTerm);

  if (isLoading) return <PageLoader />;

  return (
    <div className="p-8">
      <div className="mx-auto mb-8 ">
        <Input
          className="rounded-lg border border-[#ddd]"
          placeholder={t("inputPlaceholders.searchInput")}
          prefix={<Search />}
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      {isEmpty(searchQuery) ? <EmptyPage /> : <MovieList movies={movies} />}
    </div>
  );
};

export default MoviePage;
