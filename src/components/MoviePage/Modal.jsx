import classNames from "classnames";
import { FallbackImage } from "components/utils/FallbackImage";
import movieDetailsConfig from "components/utils/movieDetailsConfig";
import { useShowMovie } from "hooks/reactQuery/useMoviesApi";
import useCamelCase from "hooks/useCamelCase";
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

  const { favouriteMovies, addFavouriteMovie, removeFavouriteMovie } =
    useFavouriteMoviesStore.pick();

  const { isLoading: isLoadingMovieDetails, data: movie = {} } =
    useShowMovie(imdbID);

  const camelCaseMovie = useCamelCase(movie);

  const {
    title,
    year,
    genre,
    plot,
    actors,
    director,
    boxOffice,
    runtime,
    language,
    rated,
  } = camelCaseMovie;

  const genres = genre ? genre.split(", ") : [];

  const movieDetails = movieDetailsConfig({
    director,
    actors,
    boxOffice,
    year,
    runtime,
    language,
    rated,
  });

  const isDesktop = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 767 });
  const isMobile = useMediaQuery({ maxWidth: 639 });

  const isFavouriteMovie = existsBy({ imdbID }, favouriteMovies);

  const handleFavoriteClick = () => {
    if (isFavouriteMovie) {
      removeFavouriteMovie(imdbID);
    } else {
      addFavouriteMovie(movie);
    }
  };

  return (
    <NeetoModal
      {...{ isOpen, onClose }}
      size={classNames({
        large: isDesktop,
        medium: isTablet,
        small: isMobile,
      })}
    >
      <Header>
        <div className="flex items-center gap-3">
          <Typography style="h2" weight="bold">
            {title}
          </Typography>
          {!isLoadingMovieDetails && (
            <Button
              className="focus:outline-none"
              style="link"
              tooltipProps={{
                content: isFavouriteMovie
                  ? t("labels.removeFromFavourites")
                  : t("labels.addToFavourites"),
                position: t("labels.tooltipPosition"),
              }}
              onClick={handleFavoriteClick}
            >
              <RatingFilled
                size={24}
                className={classNames(
                  "transition-colors duration-200",
                  isFavouriteMovie
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
              <FallbackImage {...camelCaseMovie} />
            </div>
            <div
              className={classNames("space-y-4 p-4", {
                "w-full": isMobile,
                "ml-10 w-2/3": !isMobile,
              })}
            >
              <Typography component="i" style="body2" weight="light">
                {plot}
              </Typography>
              <div className="space-y-2">
                {movieDetails.map(({ label, value }) => (
                  <div className="flex items-center gap-2" key={label}>
                    <Typography style="body2">
                      <Trans
                        i18nKey="labels.movieDetails"
                        values={{ label, value }}
                        components={{
                          bold: <span className="font-bold" />,
                          span: <span />,
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
