import { useRef, useEffect, useState } from "react";

import classNames from "classnames";
import { Delete as DeleteIcon } from "neetoicons";
import { Alert, Typography, Button } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation, Trans } from "react-i18next";
import useMoviesStore from "stores/useMoviesStore";

const ViewHistory = () => {
  const movies = useMoviesStore.pickFrom();
  const lastSelectedMovie = useMoviesStore.pickFrom();
  const removeMovieFromHistory = useMoviesStore.pickFrom();
  const clearAllMoviesFromHistory = useMoviesStore.pickFrom();

  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [shouldShowClearAlert, setShouldShowClearAlert] = useState(false);

  const historyRef = useRef(null);
  const itemRefs = useRef({});

  const { t } = useTranslation();

  useEffect(() => {
    if (lastSelectedMovie) {
      itemRefs.current[lastSelectedMovie.imdbID]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [lastSelectedMovie]);

  const handleDelete = movie => {
    setMovieToDelete(movie);
    setShouldShowDeleteAlert(true);
  };

  return (
    <div className="h-screen w-full overflow-scroll border-l-2 border-gray-200 p-4">
      <div className="mb-4 flex items-center justify-between">
        <Typography className="font-bold" variant="h2">
          {t("sectionHeadings.historySection")}
        </Typography>
        {!isEmpty(movies) && (
          <Button
            label={t("buttons.clearAll")}
            size="small"
            style="danger-text"
            onClick={() => setShouldShowClearAlert(true)}
          />
        )}
      </div>
      <div className="max-h-[70vh] space-y-2 overflow-y-auto" ref={historyRef}>
        {isEmpty(movies) ? (
          <div className="my-96 flex h-full justify-center text-center font-medium text-gray-500">
            {t("displayMessages.emptyHistory")}
          </div>
        ) : (
          movies.map(movie => (
            <div
              key={movie.imdbID}
              ref={element => (itemRefs.current[movie.imdbID] = element)}
              className={classNames(
                "flex items-center justify-between rounded-lg p-3 transition-colors",
                movie.imdbID === lastSelectedMovie?.imdbID
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-black"
              )}
            >
              <Trans
                components={{ span: <span /> }}
                i18nKey="historyMovieNames"
                values={{ Title: movie.Title }}
              />
              <DeleteIcon
                className="cursor-pointer"
                onClick={() => handleDelete(movie)}
              />
            </div>
          ))
        )}
      </div>
      <Alert
        isOpen={shouldShowDeleteAlert}
        submitButtonLabel={t("alerts.deleteMovie.confirmButton")}
        title={t("alerts.deleteMovie.title")}
        message={
          <Typography>
            <Trans
              components={{ strong: <strong /> }}
              i18nKey="alerts.deleteMovie.message"
              values={{ movieTitle: movieToDelete?.Title }}
            />
          </Typography>
        }
        onClose={() => setShouldShowDeleteAlert(false)}
        onSubmit={() => {
          removeMovieFromHistory(movieToDelete?.imdbID);
          setShouldShowDeleteAlert(false);
        }}
      />
      <Alert
        isOpen={shouldShowClearAlert}
        message={<Typography>{t("alerts.clearHistory.message")}</Typography>}
        submitButtonLabel={t("alerts.clearHistory.confirmButton")}
        title={t("alerts.clearHistory.title")}
        onClose={() => setShouldShowClearAlert(false)}
        onSubmit={() => {
          clearAllMoviesFromHistory();
          setShouldShowClearAlert(false);
        }}
      />
    </div>
  );
};

export default ViewHistory;
