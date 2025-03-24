import { useRef, useEffect, useState } from "react";

import classNames from "classnames";
import { Delete as DeleteIcon } from "neetoicons";
import { Alert, Typography, Button } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation, Trans } from "react-i18next";
import useMoviesStore from "stores/useMoviesStore";

const ViewHistory = () => {
  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [shouldShowClearAlert, setShouldShowClearAlert] = useState(false);

  const {
    movies,
    lastSelectedMovie,
    removeMovieFromHistory,
    clearAllMoviesFromHistory,
  } = useMoviesStore.pick();

  const historyRef = useRef(null);
  const itemRef = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (lastSelectedMovie && itemRef.current) {
      itemRef.current.scrollIntoView({
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
    <div className="w-full overflow-auto border-l-2 border-gray-200 p-4">
      <div className="mb-4 flex items-center justify-between">
        <Typography className="font-bold" variant="h2">
          {t("headings.historySection")}
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
            {t("messages.display.emptyHistory")}
          </div>
        ) : (
          movies.map(movie => (
            <div
              key={movie.imdbID}
              ref={movie.imdbID === lastSelectedMovie?.imdbID ? itemRef : null}
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
        submitButtonLabel={t("messages.alerts.deleteMovie.confirmButton")}
        title={t("messages.alerts.deleteMovie.title")}
        message={
          <Typography>
            <Trans
              components={{ strong: <strong /> }}
              i18nKey="messages.alerts.deleteMovie.message"
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
        submitButtonLabel={t("messages.alerts.clearHistory.confirmButton")}
        title={t("messages.alerts.clearHistory.title")}
        message={
          <Typography>{t("messages.alerts.clearHistory.message")}</Typography>
        }
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
