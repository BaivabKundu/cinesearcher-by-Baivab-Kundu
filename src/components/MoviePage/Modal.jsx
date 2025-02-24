import classNames from "classnames";
import { FallbackImage } from "components/utils/FallbackImage";
import MovieDetailsConfig from "components/utils/MovieDetailsConfig";
import { useShowMovie } from "hooks/reactQuery/useMoviesApi";
import { existsBy } from "neetocist";
import { RatingFilled } from "neetoicons";
import { Button, Modal as NeetoModal, Spinner, Tag, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { Trans, useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import useFavouriteMoviesStore from "stores/useFavouriteMoviesStore";

const Modal = ({ isOpen, onClose, imdbID }) => {
  const { Header, Body } = NeetoModal;

  const { t } = useTranslation();

  const favouriteMovies = useFavouriteMoviesStore.pickFrom();
  const addFavouriteMovie = useFavouriteMoviesStore.pickFrom();
  const removeFavouriteMovie = useFavouriteMoviesStore.pickFrom();

  const { isLoading: isLoadingMovieDetails, data: movie = {} } =
    useShowMovie(imdbID);

  const {
    Title,
    Year,
    Genre,
    Poster,
    Plot,
    Actors,
    Director,
    BoxOffice,
    Runtime,
    Language,
    Rated,
  } = movie;

  const genres = Genre ? Genre.split(", ") : [];

  const movieDetails = MovieDetailsConfig({
    Director,
    Actors,
    BoxOffice,
    Year,
    Runtime,
    Language,
    Rated,
  });

  const isDesktop = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 767 });
  const isMobile = useMediaQuery({ maxWidth: 639 });

  const isFavouritedMovie = existsBy({ imdbID }, favouriteMovies);

  const handleFavoriteClick = () => {
    if (isFavouritedMovie) {
      removeFavouriteMovie(imdbID);
    } else {
      addFavouriteMovie(movie);
    }
  };

  return (
    <NeetoModal
      isOpen={isOpen}
      size={classNames({
        large: isDesktop,
        medium: isTablet,
        small: isMobile,
      })}
      onClose={onClose}
    >
      <Header>
        <div className="flex items-center gap-3">
          <Typography style="h2" weight="bold">
            {Title}
          </Typography>
          {!isLoadingMovieDetails && (
            <Button
              className="focus:outline-none"
              style="link"
              tooltipProps={{
                content: isFavouritedMovie
                  ? t("labelText.removeFromFavourites")
                  : t("labelText.addToFavourites"),
                position: t("labelText.tooltipPosition"),
              }}
              onClick={handleFavoriteClick}
            >
              <RatingFilled
                size={24}
                className={classNames(
                  "transition-colors duration-200",
                  isFavouritedMovie
                    ? "text-yellow-400"
                    : "text-gray-400 hover:text-yellow-400"
                )}
              />
            </Button>
          )}
        </div>
        {!isEmpty(genres) &&
          genres.map(genre => (
            <Tag className="my-3 mr-2" key={genre} type="solid">
              {genre}
            </Tag>
          ))}
      </Header>
      <Body>
        {isLoadingMovieDetails ? (
          <div className="flex h-64 items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div
            className={classNames("flex h-full", {
              "flex-col": isMobile,
              "flex-row": !isMobile,
            })}
          >
            <div
              className={classNames("p-1", {
                "h-64 w-full": isMobile,
                "w-1/3": !isMobile,
              })}
            >
              <FallbackImage poster={Poster} title={Title} />
            </div>
            <div
              className={classNames("space-y-4 p-4", {
                "w-full": isMobile,
                "ml-10 w-2/3": !isMobile,
              })}
            >
              <Typography component="i" style="body2" weight="light">
                {Plot}
              </Typography>
              <div className="space-y-2">
                {movieDetails.map(({ label, value }) => (
                  <div className="flex items-center gap-2" key={label}>
                    <Typography style="body2">
                      <Trans
                        i18nKey="labelText.movieDetails"
                        values={{ label, value }}
                        components={{
                          span1: <span className="font-bold" />,
                          span2: <span />,
                        }}
                      />
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Body>
    </NeetoModal>
  );
};

export default Modal;
