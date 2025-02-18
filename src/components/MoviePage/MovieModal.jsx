import { useShowMovie } from "hooks/reactQuery/useMoviesApi";
import { Modal, Typography, Spinner, Tag } from "neetoui";
import { isEmpty } from "ramda";
import { Trans } from "react-i18next";

const MovieModal = ({ isOpen, onClose, imdbID }) => {
  const { Header, Body } = Modal;

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

  return (
    <Modal isOpen={isOpen} size="large" onClose={onClose}>
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
          <div className="flex h-full">
            <div className="w-1/3 p-1">
              <img
                alt={Title}
                className="neeto-ui-rounded-lg object-contain"
                src={Poster}
              />
            </div>
            <div className="ml-10 w-2/3 space-y-4 p-4">
              <Typography component="i" style="body2" weight="light">
                {Plot}
              </Typography>
              <div className="space-y-2">
                {movieDetails.map(({ label, value }) => (
                  <div className="flex items-center gap-2" key={label}>
                    <Typography style="body2" weight="bold">
                      <Trans i18nKey={`labelText.${label}`} />
                    </Typography>
                    <Typography style="body2">{value}</Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Body>
    </Modal>
  );
};

export default MovieModal;
