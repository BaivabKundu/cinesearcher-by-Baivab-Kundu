import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import Card from "./Card";

const List = ({ movies }) => {
  const { t } = useTranslation();

  return (
    <>
      {isEmpty(movies) ? (
        <div className="my-80 flex h-full justify-center text-center font-bold text-gray-500">
          {t("messages.display.emptySearch")}
        </div>
      ) : (
        <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map(movie => (
            <Card key={movie.imdbID} {...movie} />
          ))}
        </div>
      )}
    </>
  );
};

export default List;
