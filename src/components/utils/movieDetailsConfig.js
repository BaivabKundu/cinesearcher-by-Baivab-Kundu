import { t } from "i18next";

const movieDetailsConfig = ({
  director,
  actors,
  boxOffice,
  year,
  runtime,
  language,
  rated,
}) => {
  const movieDetails = [
    {
      label: t("labels.director"),
      value: director,
    },
    {
      label: t("labels.actors"),
      value: actors,
    },
    {
      label: t("labels.boxOffice"),
      value: boxOffice,
    },
    {
      label: t("labels.year"),
      value: year,
    },
    {
      label: t("labels.runtime"),
      value: runtime,
    },
    {
      label: t("labels.language"),
      value: language,
    },
    {
      label: t("labels.rated"),
      value: rated,
    },
  ];

  return movieDetails;
};

export default movieDetailsConfig;
