import React, { useState } from "react";

import useCamelCase from "hooks/useCamelCase";
import { Button, Typography } from "neetoui";
import { useTranslation, Trans } from "react-i18next";
import useMoviesStore from "stores/useMoviesStore";

import Modal from "./Modal";

import { FallbackImage } from "../utils/FallbackImage";

const Card = ({ ...movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addMovieToHistory, setLastSelectedMovie } = useMoviesStore();

  const camelCasedMovie = useCamelCase(movie);

  const { title, year, type } = camelCasedMovie;

  const { t } = useTranslation();

  return (
    <div className="my-3 overflow-hidden rounded-lg border border-gray-200  bg-white shadow-md transition-all duration-200 hover:shadow-lg">
      <div className="mt-4 h-80 w-full overflow-hidden px-12">
        <FallbackImage movie={camelCasedMovie} />
      </div>
      <div className="px-8 py-6 text-left">
        <Typography
          className="mb-2 text-3xl font-bold text-gray-800"
          variant="body1"
        >
          {title}
        </Typography>
        <Typography
          className="text-sm font-semibold text-gray-400"
          variant="body2"
        >
          <Trans
            i18nKey="messages.display.movieInfo"
            components={{
              span1: <span />,
              span2: <span />,
            }}
            values={{
              type: type === "movie" ? t("labels.movie") : t("labels.series"),
              year,
            }}
          />
        </Typography>
        <Button
          className="mt-4 bg-gray-100 p-3 font-bold text-blue-600"
          style="link"
          onClick={() => {
            setIsModalOpen(true);
            addMovieToHistory(movie);
            setLastSelectedMovie({ ...movie });
          }}
        >
          {t("labels.detailsButton")}
        </Button>
      </div>
      {isModalOpen && (
        <Modal
          {...movie}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Card;
