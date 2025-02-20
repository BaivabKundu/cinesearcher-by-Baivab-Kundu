import classNames from "classnames";
import { FallbackImage } from "components/utils/FallbackImage";
import { useShowMovie } from "hooks/reactQuery/useMoviesApi";
import { Modal as NeetoModal, Typography, Spinner, Tag } from "neetoui";
import { isEmpty } from "ramda";
import { Trans } from "react-i18next";
import { useMediaQuery } from "react-responsive";

const Modal = ({ isOpen, onClose, imdbID }) => {
  const { Header, Body } = NeetoModal;

  const { isLoading, data: movie = {} } = useShowMovie(imdbID);
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

  const movieDetails = [
    { label: "Director", value: Director },
    { label: "Actors", value: Actors },
    { label: "Box Office", value: BoxOffice },
    { label: "Year", value: Year },
    { label: "Runtime", value: Runtime },
    { label: "Language", value: Language },
    { label: "Rated", value: Rated },
  ];

  const isDesktop = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 767 });
  const isMobile = useMediaQuery({ maxWidth: 639 });

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
        <Typography style="h2" weight="bold">
          {Title}
        </Typography>
        {!isEmpty(genres) &&
          genres.map(genre => (
            <Tag className="my-3 mr-2" key={genre} type="solid">
              {genre}
            </Tag>
          ))}
      </Header>
      <Body>
        {isLoading ? (
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
