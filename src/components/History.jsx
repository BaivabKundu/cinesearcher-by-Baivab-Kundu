import React, { useRef, useEffect } from "react";

import classNames from "classnames";
import { isEmpty } from "ramda";
import { useTranslation, Trans } from "react-i18next";
import useMoviesStore from "stores/useMoviesStore";

const ViewHistory = () => {
  const movies = useMoviesStore(state => state.movies);
  const selectedMovie = useMoviesStore(state => state.selectedMovie);

  const historyRef = useRef(null);
  const itemRefs = useRef({});

  const { t } = useTranslation();

  useEffect(() => {
    if (selectedMovie) {
      itemRefs.current[selectedMovie.Title]?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [selectedMovie]);

  return (
    <div className="h-screen w-full overflow-scroll border-l-2 border-gray-200 p-4">
      <h2 className="mb-4 text-center text-lg font-bold">
        {t("sectionHeadings.historySection")}
      </h2>
      <div className="max-h-[70vh] space-y-2 overflow-y-auto" ref={historyRef}>
        {isEmpty(movies) ? (
          <div className="my-96 flex h-full justify-center text-center font-medium text-gray-500">
            {t("displayMessages.emptyHistory")}
          </div>
        ) : (
          movies.map((movie, index) => (
            <div
              key={`${movie.Title}-${index}`}
              ref={el => (itemRefs.current[movie.Title] = el)}
              className={classNames(
                "rounded-lg p-3 text-center transition-colors",
                movie === selectedMovie
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-black"
              )}
            >
              <Trans
                components={{ span: <span /> }}
                i18nKey="historyMovieNames"
                values={{ Title: movie.Title }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewHistory;
