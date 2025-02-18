import React from "react";

import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const MovieCard = ({ movie }) => {
  const { Title, Year, Poster, Type } = movie;
  const { t } = useTranslation();

  return (
    <div className="m-5 overflow-hidden rounded-lg border border-gray-200  bg-white shadow-md transition-all duration-200 hover:shadow-lg">
      <div className="aspect-[2/3] w-full px-16">
        <img
          alt={Title}
          className="h-full w-full object-cover"
          src={
            Poster !== "N/A" ? Poster : "https://via.placeholder.com/300x450"
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
          {Type === "movie" ? "Movie" : "Series"} • {Year}
        </Typography>
        <Button className="mt-4 bg-gray-100 font-bold text-blue-600">
          {t("labelText.detailsButton")}
        </Button>
      </div>
    </div>
  );
};

export default MovieCard;
