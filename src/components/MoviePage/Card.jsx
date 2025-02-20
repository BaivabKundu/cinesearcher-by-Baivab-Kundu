import React, { useState } from "react";

import { Button, Typography } from "neetoui";
import { useTranslation, Trans } from "react-i18next";
import useMoviesStore from "stores/useMoviesStore";

import Modal from "./Modal";

import { FallbackImage } from "../utils/FallbackImage";

const Card = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setMovies, setSelectedMovie } = useMoviesStore();

  const { Title, Year, Poster, Type, imdbID } = movie;
  const { t } = useTranslation();

  return (
    <div className="my-3 overflow-hidden rounded-lg border border-gray-200  bg-white shadow-md transition-all duration-200 hover:shadow-lg">
      <div className="h-80 w-full overflow-hidden px-12">
        <FallbackImage poster={Poster} title={Title} />
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
        <Modal
          imdbID={imdbID}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Card;
