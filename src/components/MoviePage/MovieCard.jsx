import React, { useState } from "react";

import { Button, Typography } from "neetoui";
import { useTranslation, Trans } from "react-i18next";
import useMoviesStore from "stores/useMoviesStore";

import MovieModal from "./MovieModal";

const MovieCard = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setMovies, setSelectedMovie } = useMoviesStore();

  const { Title, Year, Poster, Type, imdbID } = movie;
  const { t } = useTranslation();

  return (
    <div className="my-3 overflow-hidden rounded-lg border border-gray-200  bg-white shadow-md transition-all duration-200 hover:shadow-lg">
      <div className="h-80 w-full overflow-hidden px-12">
        <img
          alt={Title}
          className="h-full w-full object-cover"
          src={
            Poster !== "N/A"
              ? Poster
              : "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      </div>
      <div className="px-8 py-6 text-left">
        <Typography
          className="mb-2 text-3xl font-bold text-gray-800"
          variant="body1"
        >
          {Title}
        </Typography>
        <Typography
          className="text-sm font-semibold text-gray-400"
          variant="body2"
        >
          {Type === "movie"
            ? t("labelText.movieLabel")
            : t("labelText.seriesLabel")}{" "}
          •{" "}
          <Trans
            components={{ span: <span /> }}
            i18nKey="displayMessages.yearOfRelease"
            values={{ Year }}
          />
        </Typography>
        <Button
          className="mt-4 bg-gray-100 p-3 font-bold text-blue-600"
          style="link"
          onClick={() => {
            setIsModalOpen(true);
            setMovies(movie);
            setSelectedMovie(movie);
          }}
        >
          {t("labelText.detailsButton")}
        </Button>
      </div>
      {isModalOpen && (
        <MovieModal
          imdbID={imdbID}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MovieCard;
