import { useTranslation } from "react-i18next";

const MovieDetailsConfig = ({
  Director,
  Actors,
  BoxOffice,
  Year,
  Runtime,
  Language,
  Rated,
}) => {
  const { t } = useTranslation();

  const movieDetails = [
    {
      label: t("labelText.director"),
      value: Director,
    },
    {
      label: t("labelText.actors"),
      value: Actors,
    },
    {
      label: t("labelText.boxOffice"),
      value: BoxOffice,
    },
    {
      label: t("labelText.year"),
      value: Year,
    },
    {
      label: t("labelText.runtime"),
      value: Runtime,
    },
    {
      label: t("labelText.language"),
      value: Language,
    },
    {
      label: t("labelText.rated"),
      value: Rated,
    },
  ];

  return movieDetails;
};

export default MovieDetailsConfig;
