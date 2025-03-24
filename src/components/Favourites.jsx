// import PageLoader from "components/commons/PageLoader";
import { t } from "i18next";
import { Typography } from "neetoui";
import { isEmpty } from "ramda";
import { Trans } from "react-i18next";
import useFavouriteMoviesStore from "stores/useFavouriteMoviesStore";
import withTitle from "utils/withTitle";

const Favourites = () => {
  const favouriteMovies = useFavouriteMoviesStore.pickFrom();

  return (
    <div className="mt-20 p-6">
      <div className="flex flex-col items-center space-y-4">
        {favouriteMovies.map(({ imdbID, Title, imdbRating }) => (
          <div
            className="flex w-2/3 items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-shadow duration-300 hover:shadow-md"
            key={imdbID}
          >
            <div>
              <Typography className="text-gray-900" variant="h3">
                <Trans
                  i18nKey="favourites.movieTitle"
                  values={{ title: Title }}
                  components={{
                    span: <span className="font-bold text-gray-700" />,
                  }}
                />
              </Typography>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-500">
                <Trans
                  i18nKey="favourites.movieRating"
                  values={{ rating: imdbRating }}
                  components={{
                    span1: <span className="font-bold text-gray-600" />,
                    span2: <span className="font-medium text-gray-500" />,
                  }}
                />
              </span>
            </div>
          </div>
        ))}
        {isEmpty(favouriteMovies) && (
          <Typography className="mt-96 text-center text-gray-500">
            <Trans i18nKey="favourites.noFavorites" />
          </Typography>
        )}
      </div>
    </div>
  );
};

export default withTitle(Favourites, t("title.favourites"));
